/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useFilePicker } from "use-file-picker";
import { MdOutlineUpload } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FileContent } from "use-file-picker/types";
import { Validator } from "use-file-picker/validators";
import { FaPlay } from "react-icons/fa6";
import { debugLog } from "@/functions/helpers";
import { JsonFile } from "@/functions/file";

export type AppFilePickerProps = {
  name?: string;
  title: string;
  subtitle?: string;
  accept?: string;
  onSelect: (files: FileContent<string>[]) => void;
  validators?: Validator[];
  value?: string[];
};

export type AppCustomFile = {
  type: 'url';
  data: string;
} | {
  type: 'file';
  data: JsonFile;
}

type PickedFile = {
  type: 'file',
  data: FileContent<string>;
}

function getFileName(file:AppCustomFile) {
  // debugLog(file.data);
  return file.type == 'url' ? file.data : (file.data.name);
}

function getFileExtension(file:AppCustomFile) {
  return getFileName(file).split('.').pop() || '';
}

export default function AppFilePicker({
  name = "files",
  title,
  subtitle,
  accept,
  onSelect,
  validators,
  value,
}: AppFilePickerProps) {
  const [prevFiles, setPrevFiles] = useState((value ?? []).map((url) => ({ type: 'url' as const, data: url })));
  const [selectedFiles, setSelectedFiles] = useState<PickedFile[]>([]);
  const { openFilePicker, filesContent, loading } = useFilePicker({
    readAs: "DataURL",
    accept,
    validators,
    onFilesSelected({ filesContent: data }) {
      setSelectedFiles((data as FileContent<string>[]).map((file) => ({ type: 'file', data: file })));
    },
  });

  useEffect(() => {
    // if(selectedFiles.length ){
    // onSelect(selectedFiles.map((file) => ({ type: 'file', data: file })));
    // }
  }, [selectedFiles]);

  if (loading) {
    return <div>loading ...</div>;
  }
  return (
    <div className="">
      <input type="hidden" defaultValue={JSON.stringify([...prevFiles, ...selectedFiles])} hidden name={name} />
      <div
        onClick={() => openFilePicker()}
        className="flex items-center flex-col border border-dotted border-gray-400 rounded h-24 w-full justify-center"
      >
        <h1 className="flex items-center text-label text-primary">
          <MdOutlineUpload />
          {title}
        </h1>
        <p className="text-small text-[#929292]">{subtitle}</p>
      </div>
      {(selectedFiles || prevFiles.length > 0) && (
        <div className="flex gap-2 pt-2 overflow-x-auto">
          {selectedFiles.map((file, index) => (
            <MediaCard
              isVideo={["mp4", "m4a"].includes(
                getFileExtension((file as unknown as AppCustomFile)).toLowerCase()
              )}
              key={file.data.name}
              data={file.data.content}
              onDelete={() => {
                filesContent.splice(index, 1);
                const newFiles:PickedFile[] = filesContent.map(f => ({ type: 'file' as const, data: f }))
                setSelectedFiles(newFiles);
              }}
            />
          ))}
          {prevFiles.map((file, index) => (
            <MediaCard
              isVideo={["mp4", "m4a"].includes(
                getFileExtension(file).toLowerCase()
              )}
              key={file.data}
              data={file.data}
              onDelete={() => {
                setPrevFiles(prevFiles.filter(f => f.data !== file.data));
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
    <div className="relative w-32 min-w-32 h-24 min-h-24 rounded-md overflow-hidden">
      {isVideo ? (
        <video src={data} className=" size-full object-cover"></video>
      ) : (
        <img
          src={data}
          alt="selected image"
          className=" size-full object-cover"
        />
      )}
      <button
        type="button"
        onClick={onDelete}
        className="absolute top-2 right-2 text-white bg-black-700 text-title shadow-md rounded-full"
      >
        <IoCloseCircle />
      </button>
      {isVideo && (
        <FaPlay className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black-100 rounded-full border border-white size-6 text-white p-1 " />
      )}
    </div>
  );
}
