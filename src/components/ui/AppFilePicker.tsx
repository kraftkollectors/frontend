/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useFilePicker } from "use-file-picker";
import { MdOutlineUpload } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FileContent, UseFilePickerConfig } from "use-file-picker/types";
import {
  FileAmountLimitValidator,
  Validator,
} from "use-file-picker/validators";
import { FaPlay } from "react-icons/fa6";
import { debugLog } from "@/functions/helpers";
import { base64ToFile, chunkifyString, JsonFile } from "@/functions/file";
import { toast } from "react-toastify";
import AppToast from "../Toast";

export type AppFilePickerProps = {
  name?: string;
  title: string;
  subtitle?: string;
  accept?: string;
  onSelect: (files: File[]) => void;
  validators?: Validator<unknown, UseFilePickerConfig<any>>[];
  value?: string[];
  max?: number;
  notVerbose?: boolean;
};

export function getFileErrorMessage(
  msg:
    | "FileSizeError"
    | "FileReaderError"
    | "FileAmountLimitError"
    | "ImageDimensionError"
    | "FileTypeError",
) {
  switch (msg) {
    case "FileSizeError":
      return "File too large";
    case "FileReaderError":
      return "File could not be read";
    case "FileAmountLimitError":
      return "File amount limit reached";
    case "ImageDimensionError":
      return "File is not an image";
    case "FileTypeError":
      return "File type not allowed";
  }
}

export type AppCustomFile =
  | {
      type: "url";
      data: string;
    }
  | {
      type: "file";
      data: JsonFile;
    };

type PickedFile = {
  type: "file";
  data: FileContent<string>;
};

function getFileName(file: AppCustomFile) {
  // debugLog(file.data);
  return file.type == "url" ? file.data : file.data.name;
}

function getFileExtension(file: AppCustomFile) {
  return getFileName(file).split(".").pop() || "";
}

export default function AppFilePicker({
  name = "files",
  title,
  subtitle,
  accept,
  onSelect,
  validators,
  value,
  max = 1,
  notVerbose = false,
}: AppFilePickerProps) {
  const [prevFiles, setPrevFiles] = useState(
    (value ?? []).map((url) => ({ type: "url" as const, data: url })),
  );
  const [selectedFiles, setSelectedFiles] = useState<PickedFile[]>([]);
  const { openFilePicker, filesContent, loading } = useFilePicker({
    readAs: "DataURL",
    accept,
    validators: [
      new FileAmountLimitValidator({ min: 1, max: max - prevFiles.length }),
      ...(validators ? validators : []),
    ],
    onFilesSelected({ filesContent: data, fileErrors }) {
      try {
        setSelectedFiles(
          (data as FileContent<string>[]).map((file) => ({
            type: "file",
            data: file,
          })),
        );
      } catch (e) {}
    },
    onFilesRejected: ({ errors }) => {
      errors.map((error) => {
        toast(
          <AppToast.error
            message={`File error: ${getFileErrorMessage(error.name)}`}
          />,
        );
      });
    },
  });

  useEffect(() => {
    // if(selectedFiles.length ){
    // onSelect(selectedFiles.map((file) => ({ type: 'file', data: file })));
    // }
  }, [selectedFiles]);

  const allFiles = [...prevFiles, ...selectedFiles];
  useEffect(() => {
    if (onSelect) {
      const files = selectedFiles
        .filter((file) => file.type == "file")
        .map((file) => base64ToFile((file.data as any).content, (file.data as any).name));
      onSelect(files);
    }
  }, [selectedFiles]);

  if (loading) {
    return <div>loading ...</div>;
  }
  return (
    <div className="w-full max-w-[90vw] overflow-x-auto">
      <div>
        <input
          type="hidden"
          defaultValue={chunkifyString(JSON.stringify(allFiles)).length}
          hidden
          name={name}
        />
        {chunkifyString(
          JSON.stringify(
            notVerbose ? allFiles.filter((i) => i.type == "url") : allFiles,
          ),
        ).map((chunk, index) => (
          <input
            key={index}
            type="hidden"
            defaultValue={chunk}
            hidden
            name={name + index}
          />
        ))}
      </div>
      <div
        onClick={() => openFilePicker()}
        className="flex h-24 w-full max-w-[280px] flex-col items-center justify-center rounded border border-dotted border-gray-400 p-2 text-center"
      >
        <h1 className="flex items-center text-label text-primary">
          <MdOutlineUpload />
          {title}
        </h1>
        <p className="text-small text-[#929292]">{subtitle}</p>
      </div>
      {(selectedFiles || prevFiles.length > 0) && (
        <div className="flex gap-2 overflow-x-auto py-2">
          {selectedFiles.map((file, index) => (
            <MediaCard
              isVideo={["mp4", "m4a"].includes(
                getFileExtension(
                  file as unknown as AppCustomFile,
                ).toLowerCase(),
              )}
              key={file.data.name}
              data={file.data.content}
              onDelete={() => {
                filesContent.splice(index, 1);
                const newFiles: PickedFile[] = filesContent.map((f) => ({
                  type: "file" as const,
                  data: f,
                }));
                setSelectedFiles(newFiles);
              }}
            />
          ))}
          {prevFiles.map((file, index) => (
            <MediaCard
              isVideo={["mp4", "m4a"].includes(
                getFileExtension(file).toLowerCase(),
              )}
              key={file.data}
              data={file.data}
              onDelete={() => {
                setPrevFiles(prevFiles.filter((f) => f.data !== file.data));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

type MediaCardProps = {
  data: string;
  isVideo?: boolean;
  onDelete: () => void;
};
function MediaCard({ data, isVideo = false, onDelete }: MediaCardProps) {
  return (
    <div className="relative h-24 min-h-24 w-32 min-w-32 overflow-hidden rounded-md">
      {isVideo ? (
        <video src={data} className="size-full object-cover"></video>
      ) : (
        <img
          src={data}
          alt="selected image"
          className="size-full object-cover"
        />
      )}
      <button
        type="button"
        onClick={onDelete}
        className="absolute right-2 top-2 rounded-full bg-black-700 text-title text-white shadow-md"
      >
        <IoCloseCircle />
      </button>
      {isVideo && (
        <FaPlay className="absolute left-1/2 top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-black-100 p-1 text-white" />
      )}
    </div>
  );
}
