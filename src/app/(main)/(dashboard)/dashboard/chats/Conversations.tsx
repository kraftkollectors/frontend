import { ConversationTile } from "./components";
import { ConversationTileProps } from "./components/ConversationTile";

export default function Conversations({
  conversations
}: {
  conversations: ConversationTileProps[];
}) {
  return (
    <div className="flex flex-col overflow-y-auto ">
      {conversations.map(conversation =>
        <ConversationTile key={conversation.id} {...conversation} />
      )}
    </div>
  );
}
