"use client";

import { useServiceHistoryChats } from "@/features/sidebar/hooks/useServiceHistoryChats";

import { EmptyChats } from "./components/EmptyChats";
import { ListChats } from "./components/ListChats";
import { ListChatsLoading } from "./components/ListChatsLoading";

const HistoryChats = () => {
  const { data: chats = [], isLoading, isError } = useServiceHistoryChats();

  if (isLoading) {
    return <ListChatsLoading />;
  }

  if (isError || !chats.length) return <EmptyChats />;

  return (
    <div className="flex-1 overflow-auto p-2 space-y-1">
      <ListChats chats={chats} />
    </div>
  );
};

export default HistoryChats;
