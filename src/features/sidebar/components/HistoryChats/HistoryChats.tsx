"use client";

import { useServiceHistoryChats } from "@/features/sidebar/hooks/useServiceHistoryChats";

import { EmptyChats } from "./components/EmptyChats";

const HistoryChats = () => {
  const { data: chats = [], isLoading, isError } = useServiceHistoryChats();

  if (isLoading) {
    return (
      <div className="flex-1 p-4">
        <p className="text-sm text-muted-foreground text-center">Cargando...</p>
      </div>
    );
  }

  if (isError || !chats.length) return <EmptyChats />;

  return (
    <div className="flex-1 overflow-auto p-2 space-y-1">
      {chats.map((chat) => (
        <button
          key={chat.id}
          className="w-full text-left rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground transition"
        >
          <div className="text-sm font-medium truncate">{chat.title}</div>
          <div className="text-[10px] text-muted-foreground">
            {new Date(chat.lastMessageAt).toLocaleString()}
          </div>
        </button>
      ))}
    </div>
  );
};

export default HistoryChats;
