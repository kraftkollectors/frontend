export type ChatMessageProps = {
  id: string;
  message: string;
  datetime: string;
  status: string;
  me: boolean;
};

export function ChatMessage({
  id,
  message,
  datetime,
  status,
  me = false
}: ChatMessageProps) {
  return (
    <div className={`flex px-2 py-0.5 ${me ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-90 max-w-[280px] rounded-lg p-2 flex flex-col gap-1 ${me
          ? "bg-primary-lightActive2"
          : "bg-light"}`}
      >
        <p className="text-label text-black-300">
          {message}
        </p>
        <div className="flex gap-1 justify-end">
          <span className="text-small text-black-100">
            {datetime}
          </span>
          <span className="text-small text-black-100">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
