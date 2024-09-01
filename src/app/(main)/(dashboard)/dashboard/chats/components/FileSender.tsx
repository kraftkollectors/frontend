/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useFilePicker } from "use-file-picker";
import { MdCancel, MdOutlineUpload } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { ReactNode, useEffect, useRef, useState } from "react";
import { FileContent, UseFilePickerConfig } from "use-file-picker/types";
import {
  FileAmountLimitValidator,
  Validator,
} from "use-file-picker/validators";
import { FaPlay } from "react-icons/fa6";
import { debugLog, formDataToObject } from "@/functions/helpers";
import {
  chunkifyString,
  createFileFromObject,
  JsonFile,
  loadFileFromFormData,
} from "@/functions/file";
import { toast } from "react-toastify";
import AppToast from "@/components/Toast";
import {
  AppCustomFile,
  AppFilePickerProps,
} from "@/components/ui/AppFilePicker";
import { GrFormAttachment } from "react-icons/gr";
import { ALLOWED_VIDEO_EXTENSIONS } from "@/utils/constants";
import { VscSend } from "react-icons/vsc";
import { FormButton } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/state";
import { uploadFiles } from "@/actions/misc/uploadFiles";

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

export type FileSenderProps = Omit<
  AppFilePickerProps,
  "title" | "subtitle" | "onSelect"
> & {
  onFileUploaded: (files: string[]) => void;
  children: ReactNode;
  showFile: boolean;
};

function _realFormData(f: FormData): FormData {
  const formData = new FormData();
  const d = formDataToObject<{ files: string }>(f);
  debugLog({ d });
  const fs = loadFileFromFormData(f, "files", d.files);
  debugLog({ fs });
  const files = JSON.parse(fs) as AppCustomFile[];
  debugLog({ files });
  files.forEach((i) => {
    if (i.type !== "file") return;
    const blob = createFileFromObject(i.data);
    formData.append("files", blob);
  });
  return formData;
}

export default function FileSender({
  name = "files",
  accept,
  validators,
  value,
  children,
  onFileUploaded: onInvoke,
  max = 1,
  showFile,
}: FileSenderProps) {
  const user = useUserStore((s) => s.user);
  const [prevFiles, setPrevFiles] = useState(
    (value ?? []).map((url) => ({ type: "url" as const, data: url })),
  );
  const [selectedFiles, setSelectedFiles] = useState<PickedFile[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [sendingFile, setSendingFile] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);
  const { openFilePicker, filesContent, loading, clear } = useFilePicker({
    readAs: "DataURL",
    accept,
    validators: [
      new FileAmountLimitValidator({ min: 1, max: max - prevFiles.length }),
      ...(validators ? validators : []),
    ],
    onFilesSelected({ filesContent: data }) {
      try {
        setSelectedFiles(
          (data as FileContent<string>[]).map((file) => ({
            type: "file",
            data: file,
          })),
        );
      } catch (e) {
        toast(<AppToast.error message="Something went wrong" />);
      }
    },
  });

  useEffect(() => {
    setSendingFile(!!selectedFiles.length);
  }, [selectedFiles]);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (f: FormData) => {
      const formData = _realFormData(f);
      if (!user) return;
      formData.append("userId", user._id);
      formData.append("userEmail", user.email);
      const res = await uploadFiles(formData);
      if (typeof res === "string") throw new Error();
      setUploadedFiles(res);
      onInvoke(res);
    },
    onError: (e) => {
      debugLog({ error: e });
    },
  });

  if (loading) {
    return (
      <div className="w-full p-4">
        <div className="info-box">loading...</div>{" "}
      </div>
    );
  }
  const allFiles = [...prevFiles, ...selectedFiles];
  return (
    <div className="z-[3] flex justify-between gap-2 p-4 md:gap-4">
      {showFile && (
        <div className="relative w-8">
          <button
            onClick={openFilePicker}
            className="icon-btn block p-2 text-title"
          >
            <GrFormAttachment />
          </button>
        </div>
      )}
      {sendingFile ? (
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (uploadedFiles.length !== 0) onInvoke(uploadedFiles);
            else mutate(new FormData(e.target as HTMLFormElement));
          }}
          className="w-[calc(100%-7rem)]"
        >
          <div>
            <input
              type="hidden"
              defaultValue={chunkifyString(JSON.stringify(allFiles)).length}
              hidden
              name={name}
            />
            {chunkifyString(JSON.stringify(allFiles)).map((chunk, index) => (
              <input
                key={index}
                type="hidden"
                defaultValue={chunk}
                hidden
                name={name + index}
              />
            ))}
          </div>

          {(selectedFiles || prevFiles.length > 0) && (
            <div className="flex w-full gap-2 overflow-x-auto pt-2">
              {selectedFiles.map((file, index) => (
                <MediaCard
                  isVideo={ALLOWED_VIDEO_EXTENSIONS.includes(
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
        </form>
      ) : (
        children
      )}
      {sendingFile && (
        <div className="relative flex w-8 flex-col gap-2">
          <FormButton
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
            loading={isPending}
            className="icon-btn block p-2 text-title"
          >
            <VscSend />
          </FormButton>
          <button
            onClick={() => {
              clear();
              setSelectedFiles([]);
            }}
            className="icon-btn delete-btn block p-2 text-title"
          >
            <MdCancel />
          </button>
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
    <div className="relative h-16 min-h-16 w-24 min-w-24 overflow-hidden rounded-md">
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
