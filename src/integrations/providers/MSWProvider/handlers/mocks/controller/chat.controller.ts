import {
  getCurrentConversation,
  getAllConversations,
  setCurrentChatId,
  findConversationById,
  createConversation,
  saveConversation,
  createMessage,
  addMessageToConversation,
  getCurrentChatId,
  saveAllConversations,
} from "@/integrations/providers/MSWProvider/handlers/mocks/database/chat.db";
import { ChatMessage, StoredMessage, StoredConversation } from "@/features/chat/models";

export const mapStoredMessageToUI = (
  storedMessage: StoredMessage,
  index: number
): ChatMessage => {
  return {
    id: `msg-${index}`,
    role: storedMessage.sender,
    content: storedMessage.content,
  };
};

export const getCurrentMessages = (): ChatMessage[] => {
  const currentConversation = getCurrentConversation();
  if (!currentConversation) return [];

  return currentConversation.messages.map((msg: StoredMessage, index: number) =>
    mapStoredMessageToUI(msg, index)
  );
};

export const getHistoryChats = () => {
  const conversations = getAllConversations();

  const historyData = conversations
    .sort((a: StoredConversation, b: StoredConversation) => b.updatedAt - a.updatedAt)
    .map((conversation: StoredConversation) => ({
      id: conversation.id,
      title: conversation.title,
      lastMessageAt: new Date(conversation.updatedAt).toISOString(),
    }));

  return {
    data: historyData,
  };
};

export const loadChatById = (chatId: string): ChatMessage[] => {
  setCurrentChatId(chatId);

  const conversation = findConversationById(chatId);
  if (!conversation) {
    throw new Error(`Chat con ID ${chatId} no encontrado`);
  }

  return conversation.messages.map((msg: StoredMessage, index: number) =>
    mapStoredMessageToUI(msg, index)
  );
};

export const startNewConversation = (): ChatMessage[] => {
  setCurrentChatId("");

  return [];
};

export const deleteConversation = (chatId: string): boolean => {
  try {
    const conversations = getAllConversations();
    const filteredConversations = conversations.filter((c: StoredConversation) => c.id !== chatId);

    const currentChatId = getCurrentChatId();
    if (currentChatId === chatId) {
      setCurrentChatId("");
    }

    saveAllConversations(filteredConversations);
    return true;
  } catch (error) {
    console.error("Error deleting conversation:", error);
    return false;
  }
};

export const processMessage = async (
  userMessage: string,
  botReply: string
): Promise<ChatMessage[]> => {
  let currentConversation = getCurrentConversation();

  if (!currentConversation) {
    currentConversation = createConversation(userMessage);
    saveConversation(currentConversation);
    setCurrentChatId(currentConversation.id);
  }

  const userStoredMessage = createMessage(userMessage, "user");
  currentConversation = addMessageToConversation(
    currentConversation.id,
    userStoredMessage
  );

  const assistantStoredMessage = createMessage(botReply, "assistant");
  currentConversation = addMessageToConversation(
    currentConversation.id,
    assistantStoredMessage
  );

  return currentConversation.messages.map((msg: StoredMessage, index: number) =>
    mapStoredMessageToUI(msg, index)
  );
};

export const clearCurrentConversation = (): ChatMessage[] => {
  const currentConversation = getCurrentConversation();
  if (!currentConversation) return [];

  const clearedConversation = {
    ...currentConversation,
    messages: [],
    updatedAt: Date.now(),
  };

  saveConversation(clearedConversation);
  return [];
};
