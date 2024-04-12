import { IoWarningOutline } from "react-icons/io5";

export type ChatInfoMessageProps = {
  type?: "warning" | "danger" | "success" | "default";
  message: string;
};

export function ChatInfoMessage({
  type = "default",
  message
}: ChatInfoMessageProps) {
  let className: string;
  switch (type) {
    case "warning":
      className = "text-yellow-800 bg-yellow-50";
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
    <div className="flex justify-center items-center px-4 py-1">
      <div
        className={`text-label py-1 rounded-md px-2 ${className} flex flex-wrap items-center gap-1`}
      >
        {type === "warning" && <IoWarningOutline />}
        {message}
      </div>
    </div>
  );
}
