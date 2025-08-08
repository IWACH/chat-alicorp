import { FC } from "react";

import { cn } from "@/core/utils/cn.util";
import { ChatMessage } from "@/features/chat/models";

interface Props {
  message: ChatMessage;
}

const ItemMessageInChat: FC<Props> = ({ message }) => {
  return (
    <div
      key={message.id}
      className={cn(
        "max-w-[80%] rounded-lg px-4 py-3 text-sm shadow",
        message.role === "user"
          ? "ml-auto bg-primary text-primary-foreground"
          : "mr-auto bg-muted text-foreground"
      )}
    >
      {message.content}
    </div>
  );
};

export default ItemMessageInChat;
