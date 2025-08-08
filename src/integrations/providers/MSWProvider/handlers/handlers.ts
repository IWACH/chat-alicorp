import { http, HttpResponse } from "msw";

import {
  clearCurrentConversation,
  deleteConversation,
  getCurrentMessages,
  getHistoryChats,
  loadChatById,
  processMessage,
  startNewConversation,
} from "./mocks/controller/chat.controller";

export const handlers = [
  http.get("/api/history-chats", async () => {
    try {
      const historyChats = getHistoryChats();
      return HttpResponse.json(historyChats);
    } catch (error) {
      console.error("Error getting history chats:", error);
      return HttpResponse.json({
        error: "Error del servidor",
        data: [],
      });
    }
  }),

  http.get("/api/chat/messages", async () => {
    try {
      const currentMessages = getCurrentMessages();
      return HttpResponse.json({
        success: true,
        messages: currentMessages,
      });
    } catch (error) {
      console.error("Error getting messages:", error);
      return HttpResponse.json({
        error: "Error del servidor",
        messages: [],
      });
    }
  }),

  http.delete("/api/chat/messages", async () => {
    try {
      const clearedMessages = clearCurrentConversation();
      return HttpResponse.json({
        success: true,
        messages: clearedMessages,
      });
    } catch (error) {
      console.error("Error clearing messages:", error);
      return HttpResponse.json({
        error: "Error del servidor",
        messages: getCurrentMessages(),
      });
    }
  }),

  http.get("/api/chat/:chatId", async ({ params }) => {
    try {
      const { chatId } = params;
      const chatMessages = loadChatById(chatId as string);
      return HttpResponse.json({
        success: true,
        messages: chatMessages,
      });
    } catch (error) {
      console.error("Error loading chat:", error);
      return HttpResponse.json({
        error: "Chat no encontrado",
        messages: [],
      });
    }
  }),

  http.post("/api/chat/new", async () => {
    try {
      const newChatMessages = startNewConversation();
      return HttpResponse.json({
        success: true,
        messages: newChatMessages,
      });
    } catch (error) {
      console.error("Error starting new chat:", error);
      return HttpResponse.json({
        error: "Error al crear nueva conversación",
        messages: [],
      });
    }
  }),

  http.delete("/api/chat/:chatId", async ({ params }) => {
    try {
      const { chatId } = params;
      const deleted = deleteConversation(chatId as string);

      if (deleted) {
        return HttpResponse.json({
          success: true,
          message: "Conversación eliminada correctamente",
        });
      } else {
        return HttpResponse.json({
          success: false,
          error: "No se pudo eliminar la conversación",
        });
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
      return HttpResponse.json({
        success: false,
        error: "Error del servidor al eliminar la conversación",
      });
    }
  }),

  http.post("/api/chat/send", async ({ request }) => {
    try {
      const body = (await request.json()) as { message?: string };
      const userMessage = body?.message ?? "";

      if (!userMessage.trim()) {
        return HttpResponse.json({
          error: "Mensaje vacío",
          messages: getCurrentMessages(),
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const samples = [
        "Gracias por tu mensaje, déjame verificar esa información.",
        "Interesante pregunta. Te comento: ...",
        "Claro, aquí tienes un resumen inicial.",
        "Perfecto, empecemos por lo básico.",
        "Entendido. Puedo ayudarte con eso.",
      ];
      const botReply = samples[Math.floor(Math.random() * samples.length)];

      const allMessages = await processMessage(userMessage, botReply);

      return HttpResponse.json({
        success: true,
        messages: allMessages,
      });
    } catch (error) {
      console.error("Error en handler de chat:", error);
      return HttpResponse.json({
        error: "Error del servidor",
        messages: getCurrentMessages(),
      });
    }
  }),
];
