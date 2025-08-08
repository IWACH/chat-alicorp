import { http, HttpResponse } from "msw";

import { mockHistoryChats } from "./mocks/historyChats.mock";

export const handlers = [
  http.get("/api/history-chats", async () => {
    return HttpResponse.json(mockHistoryChats);
  }),
];
