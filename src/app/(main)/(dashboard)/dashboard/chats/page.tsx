/* eslint-disable @next/next/no-img-element */
export default function page() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-10">
      <img
        src="/images/message-banner.svg"
        alt="no conversations"
        height={160}
        width={160}
      />
      <p className="font-bold text-black-400">
        Select a chat to view Conversation
      </p>
    </div>
  );
}
