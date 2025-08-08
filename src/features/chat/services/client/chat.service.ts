import { EHttpMethod } from "@/core/services/models/enums/httpMethod.enum";
import { fetcher } from "@/core/services/utils/fetcher.util";
import { ChatMessage } from "@/features/chat/models/interfaces/chat.interface";

export const sendMessageService = async (
  message: string
): Promise<ChatMessage[]> => {
  const { data } = await fetcher<{ messages: ChatMessage[] }>({
    url: "/api/chat/send",
    options: {
      method: EHttpMethod.Post,
      body: { message },
    },
  });

  return data?.messages ?? [];
};

export const getCurrentChatMessagesService = async (): Promise<
  ChatMessage[]
> => {
  const { data } = await fetcher<{ messages: ChatMessage[] }>({
    url: "/api/chat/messages",
    options: {
      method: EHttpMethod.Get,
    },
  });

  return data?.messages ?? [];
};

export const clearCurrentChatMessagesService = async (): Promise<
  ChatMessage[]
> => {
  const { data } = await fetcher<{ messages: ChatMessage[] }>({
    url: "/api/chat/messages",
    options: {
      method: EHttpMethod.Delete,
    },
  });

  return data?.messages ?? [];
};

export const getChatMessagesByIdService = async (
  chatId: string
): Promise<ChatMessage[]> => {
  const { data } = await fetcher<{ messages: ChatMessage[] }>({
    url: `/api/chat/${chatId}`,
    options: {
      method: EHttpMethod.Get,
    },
  });

  return data?.messages ?? [];
};

export const startNewChatService = async (): Promise<ChatMessage[]> => {
  const { data } = await fetcher<{ messages: ChatMessage[] }>({
    url: "/api/chat/new",
    options: {
      method: EHttpMethod.Post,
    },
  });

  return data?.messages ?? [];
};

export const deleteConversationService = async (
  chatId: string
): Promise<boolean> => {
  const { data } = await fetcher<{ success: boolean }>({
    url: `/api/chat/${chatId}`,
    options: {
      method: EHttpMethod.Delete,
    },
  });

  return data?.success ?? false;
};
