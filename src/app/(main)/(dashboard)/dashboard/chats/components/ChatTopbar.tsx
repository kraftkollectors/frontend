import { FiPhone } from "react-icons/fi";

/* eslint-disable @next/next/no-img-element */
export type ChatTopbarProps = {
  img: string;
  lastSeen: string;
  name: string;
};

export function ChatTopbar({ name, img, lastSeen }: ChatTopbarProps) {
  return (
    <header className="py-2 px-4 flex items-center justify-between border-b border-black-50">
      <div className="flex gap-2">
        <img
          src={img}
          alt={name}
          title={`Conversation with ${name}`}
          className="rounded-full aspect-square size-12 flex-shrink-0"
        />
        <div className="w-full flex-shrink">
          <h1 className="font-semibold">
            {name}
          </h1>
          <p className="line-clamp-2 overflow-ellipsis text-black-300 text-label">
            {lastSeen}
          </p>
        </div>
      </div>
      <button className="btn-primary-border px-4">
        <FiPhone />
        <span>Show Contact</span>
      </button>
    </header>
  );
}
