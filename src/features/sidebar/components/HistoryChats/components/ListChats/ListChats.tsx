import { FC } from "react";

import { IHistoryChatItem } from "@/features/sidebar/models/interfaces/historyChats.interface";

import { ItemChat } from "../ItemChat";

interface Props {
  chats: IHistoryChatItem[];
}

const ListChats: FC<Props> = ({ chats }) => {
  return (
    <>
      {chats.map((chat) => (
        <ItemChat key={chat.id} chat={chat} />
      ))}
    </>
  );
};

export default ListChats;
