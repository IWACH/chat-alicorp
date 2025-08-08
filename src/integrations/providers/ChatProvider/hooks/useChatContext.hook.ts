"use client";

import { createContext, useContext } from "react";

import { useChat } from "@/features/chat/hooks/useChat";

type ChatContextType = ReturnType<typeof useChat>;

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext debe ser usado dentro de un ChatProvider");
  }
  return context;
}
