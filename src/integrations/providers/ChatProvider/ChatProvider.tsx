"use client";

import { ReactNode } from "react";

import { useChat } from "@/features/chat/hooks/useChat";

import { ChatContext } from "./hooks/useChatContext.hook";

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const chatState = useChat();

  return (
    <ChatContext.Provider value={chatState}>{children}</ChatContext.Provider>
  );
}
