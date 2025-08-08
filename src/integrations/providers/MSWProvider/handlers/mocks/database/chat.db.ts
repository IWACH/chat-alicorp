import { localStorageUtil } from "@/core/utils/localStorage.util";
import {
  StoredConversation,
  StoredMessage,
} from "@/features/chat/models/interfaces/chat.interface";

const CONVERSATIONS_KEY = "chat-conversations";
const CURRENT_CHAT_KEY = "current-chat-id";

const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const getAllConversations = (): StoredConversation[] => {
  return (
    localStorageUtil.getJSON<StoredConversation[]>(CONVERSATIONS_KEY, []) ?? []
  );
};

export const saveAllConversations = (
  conversations: StoredConversation[]
): void => {
  localStorageUtil.setJSON(CONVERSATIONS_KEY, conversations);
};

export const getCurrentChatId = (): string | null => {
  return localStorageUtil.get(CURRENT_CHAT_KEY);
};

export const setCurrentChatId = (chatId: string): void => {
  localStorageUtil.set(CURRENT_CHAT_KEY, chatId);
};

export const findConversationById = (id: string): StoredConversation | null => {
  const conversations = getAllConversations();
  return conversations.find((c) => c.id === id) ?? null;
};

export const getCurrentConversation = (): StoredConversation | null => {
  const currentId = getCurrentChatId();
  return currentId ? findConversationById(currentId) : null;
};

export const createConversation = (
  firstMessage: string
): StoredConversation => {
  const now = Date.now();
  const title =
    firstMessage.length > 60 ? `${firstMessage.slice(0, 57)}...` : firstMessage;

  return {
    id: `chat-${generateUUID()}`,
    title,
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
};

export const saveConversation = (conversation: StoredConversation): void => {
  const conversations = getAllConversations();
  const index = conversations.findIndex((c) => c.id === conversation.id);

  if (index !== -1) {
    conversations[index] = conversation;
  } else {
    conversations.push(conversation);
  }

  saveAllConversations(conversations);
};

export const addMessageToConversation = (
  conversationId: string,
  message: StoredMessage
): StoredConversation => {
  const conversation = findConversationById(conversationId);
  if (!conversation) {
    throw new Error(`Conversación ${conversationId} no encontrada`);
  }

  const updatedConversation: StoredConversation = {
    ...conversation,
    messages: [...conversation.messages, message],
    updatedAt: message.timestamp,
  };

  saveConversation(updatedConversation);
  return updatedConversation;
};

export const createMessage = (
  content: string,
  sender: "user" | "assistant"
): StoredMessage => {
  return {
    sender,
    content,
    timestamp: Date.now(),
  };
};
