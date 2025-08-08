import {
  ChatMessage,
  StoredConversation,
  StoredMessage,
} from "@/features/chat/models/interfaces/chat.interface";
import {
  addMessageToConversation,
  createConversation,
  createMessage,
  findConversationById,
  getAllConversations,
  getCurrentChatId,
  getCurrentConversation,
  saveAllConversations,
  saveConversation,
  setCurrentChatId,
} from "@/integrations/providers/MSWProvider/handlers/mocks/database/chat.db";

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
    .sort(
      (a: StoredConversation, b: StoredConversation) =>
        b.updatedAt - a.updatedAt
    )
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
    const filteredConversations = conversations.filter(
      (c: StoredConversation) => c.id !== chatId
    );

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

const keywordResponses: Record<string, string> = {
  misión:
    "La misión de Alicorp es Transformamos mercados a través de nuestras marcas líderes, generando experiencias extraordinarias en nuestros consumidores. Buscamos innovar constantemente para generar valor y bienestar en la sociedad.",
  visión:
    "La visión de Alicorp es Ser líderes en los mercados donde competimos, reconocidos por innovación, excelencia en gestión y contribución al desarrollo sostenible.",
  organigrama:
    "El organigrama de Alicorp es **Gerente General:** Álvaro Correa Malachowski\n\n**Vicepresidentes:**\n• Finanzas y Transformación: Luis Banchero Picasso\n• Marketing CMP & CoE Marketing de CM: Álvaro Rojas Miró Quesada\n• Bolivia y Negocios Internacionales: Javier Rota Baguer\n• Alicorp Soluciones (B2B) y Materias Primas: Luis Estrada Rondón\n• Supply Chain: Vinicius Guimarães Barbosa\n• Asuntos Corporativos: Magdalena Morales Valentín\n• Recursos Humanos & Chief of Staff: Paola Ruchman Lazo\n• Comercial CMP & CoE Comercial de CM: Aldo Hidalgo Mouchard\n\n**Vitapro:**\n• Gerente General: Fabricio Vargas Elías",
};

const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const generateBotResponse = (userMessage: string): string => {
  const normalizedMessage = normalizeText(userMessage);

  for (const [keyword, response] of Object.entries(keywordResponses)) {
    const normalizedKeyword = normalizeText(keyword);
    if (normalizedMessage.includes(normalizedKeyword)) {
      return response;
    }
  }

  const defaultResponses = [
    "Gracias por tu consulta. ¿Podrías especificar más sobre qué información de Alicorp necesitas?",
    "Estoy aquí para ayudarte con información sobre Alicorp. ¿Te puedo ayudar con nuestra misión, visión u organigrama?",
    "¿En qué puedo asistirte hoy? Puedo compartir información sobre la estructura organizacional, misión y visión de Alicorp.",
    "Cuéntame más sobre lo que necesitas saber de Alicorp y te ayudo con la información correspondiente.",
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
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
