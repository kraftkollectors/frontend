/* eslint-disable @next/next/no-img-element */
export default function page() {
  return (
    <div className="p-10 items-center justify-center flex gap-4">
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
