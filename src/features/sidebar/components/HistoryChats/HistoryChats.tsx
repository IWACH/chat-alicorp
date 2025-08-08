"use client";

import { useEffect, useState } from "react";

import { EmptyChats } from "./components/EmptyChats";

interface HistoryChatItem {
  id: string;
  title: string;
  lastMessageAt: string;
}

const HistoryChats = () => {
  const [chats, setChats] = useState<HistoryChatItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/history-chats")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        setChats(data?.data ?? []);
      })
      .catch(() => {
        if (!isMounted) return;
        setChats([]);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 p-4">
        <p className="text-sm text-muted-foreground text-center">Cargando...</p>
      </div>
    );
  }

  if (!chats.length) return <EmptyChats />;

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
