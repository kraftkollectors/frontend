import { IoWarningOutline } from "react-icons/io5";

export type ChatInfoMessageProps = {
  type?: "warning" | "danger" | "success" | "default";
  message: string;
  className?: string;
};

export function ChatInfoMessage({
  type = "default",
  message,
}: ChatInfoMessageProps) {
  let className: string;
  switch (type) {
    case "warning":
      className = "text-[#A87B3B] bg-[#FAF1E5]";
      break;
    case "danger":
      className = "text-red-800 bg-red-50";
      break;
    case "success":
      className = "text-green-800 bg-green-50";
      break;
    default:
      className = "text-black-800 border border-black-100";
      break;
  }

  return (
    <div className="sticky left-0 top-0 z-[2] flex items-center justify-center bg-black-50 px-4 py-1">
      <div
        className={`rounded-md px-2 py-1 text-label ${className} flex flex-wrap items-center gap-1 font-semibold`}
      >
        {type === "warning" && <IoWarningOutline />}
        {message}
      </div>
    </div>
  );
}
