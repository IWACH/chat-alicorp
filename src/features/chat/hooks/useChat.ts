"use client";

import { useEffect, useState } from "react";

import {
  deleteConversationService,
  getChatMessagesByIdService,
  sendMessageService,
  startNewChatService,
} from "@/features/chat/services/client/chat.service";
import {
  getCurrentChatId,
  setCurrentChatId,
} from "@/integrations/providers/MSWProvider/handlers/mocks/database/chat.db";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  ChatMessage,
  ChatMessageRole,
} from "../models/interfaces/chat.interface";

export type { ChatMessage, ChatMessageRole };

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const queryClient = useQueryClient();

  // Al inicializar, limpiar el chat actual para empezar siempre con nuevo chat
  useEffect(() => {
    setCurrentChatId("");
  }, []);

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: sendMessageService,
    onMutate: async (newMessage: string) => {
      const userMessage: ChatMessage = {
        id: `temp-user-${Date.now()}`,
        role: "user",
        content: newMessage,
      };
      setMessages((prev) => [...prev, userMessage]);
    },
    onSuccess: (newMessages: ChatMessage[]) => {
      setMessages(newMessages);
      // Invalidar el caché del historial para actualizarlo
      queryClient.invalidateQueries({ queryKey: ["history-chats"] });
    },
    onError: () => {
      console.error("Error loading messages");
      setMessages([]);
    },
  });

  const getChatMessagesByIdMutation = useMutation({
    mutationFn: getChatMessagesByIdService,
    onSuccess: (chatMessages: ChatMessage[]) => {
      setMessages(chatMessages);
    },
    onError: (error) => {
      console.error("Error loading chat:", error);
      setMessages([]);
    },
  });

  const startNewChatMutation = useMutation({
    mutationFn: startNewChatService,
    onSuccess: (emptyMessages: ChatMessage[]) => {
      setMessages(emptyMessages);
    },
    onError: (error) => {
      console.error("Error starting new chat:", error);
    },
  });

  const getChatMessagesById = (chatId: string) => {
    getChatMessagesByIdMutation.mutate(chatId);
  };

  const deleteChatMutation = useMutation({
    mutationFn: deleteConversationService,
    onSuccess: (deleted: boolean, chatId: string) => {
      if (deleted) {
        console.log(`Conversación ${chatId} eliminada correctamente`);
        // Si se eliminó el chat actual, limpiar mensajes
        const currentId = getCurrentChatId();
        if (currentId === chatId || !currentId) {
          setMessages([]);
        }
        // Invalidar el caché del historial para actualizarlo
        queryClient.invalidateQueries({ queryKey: ["history-chats"] });
      }
    },
    onError: (error, chatId) => {
      console.error(`Error eliminando conversación ${chatId}:`, error);
    },
  });

  const startNewChat = () => {
    startNewChatMutation.mutate();
  };

  const deleteChat = (chatId: string) => {
    deleteChatMutation.mutate(chatId);
  };

  return {
    sendMessage: mutate,
    getChatMessagesById,
    startNewChat,
    deleteChat,
    data: messages,
    isPending:
      isPending ||
      getChatMessagesByIdMutation.isPending ||
      startNewChatMutation.isPending,
    isError,
    isSuccess,
    isGettingChatMessages: getChatMessagesByIdMutation.isPending,
    isStartingNewChat: startNewChatMutation.isPending,
    isDeletingChat: deleteChatMutation.isPending,
  };
}
