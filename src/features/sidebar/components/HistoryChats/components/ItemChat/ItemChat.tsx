import { FC } from "react";

import { IHistoryChatItem } from "@/features/sidebar/models/interfaces/historyChats.interface";
import { Button } from "@/ui/Button";

interface Props {
  chat: IHistoryChatItem;
}

const ItemChat: FC<Props> = ({ chat }) => {
  return (
    <Button
      key={chat.id}
      variant="ghost"
      className="w-full text-left rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground transition"
    >
      <div className="text-sm font-medium truncate">{chat.title}</div>
      <div className="text-[10px] text-muted-foreground">
        {new Date(chat.lastMessageAt).toLocaleString()}
      </div>
    </Button>
  );
};

export default ItemChat;
