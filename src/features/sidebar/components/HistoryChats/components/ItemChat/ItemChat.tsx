import { MoreHorizontal, Trash2 } from "lucide-react";
import { FC } from "react";

import { IHistoryChatItem } from "@/features/sidebar/models/interfaces/historyChats.interface";
import { useChatContext } from "@/integrations/providers/ChatProvider/hooks/useChatContext.hook";
import { Button } from "@/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/DropdownMenu";

interface Props {
  chat: IHistoryChatItem;
}

const ItemChat: FC<Props> = ({ chat }) => {
  const { getChatMessagesById, deleteChat, isDeletingChat } = useChatContext();

  const handleClick = () => {
    getChatMessagesById(chat.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteChat(chat.id);
  };

  return (
    <div className="relative flex items-center w-full rounded-md hover:bg-accent hover:text-accent-foreground transition">
      <Button
        variant="ghost"
        className="w-full justify-start text-left rounded-md px-3 py-2 pr-10"
        onClick={handleClick}
      >
        <div className="text-sm font-medium truncate">{chat.title}</div>
      </Button>

      <div className="absolute right-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-accent-foreground/10"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Opciones de chat</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={handleDelete}
              disabled={isDeletingChat}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {isDeletingChat ? "Eliminando..." : "Eliminar"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ItemChat;
