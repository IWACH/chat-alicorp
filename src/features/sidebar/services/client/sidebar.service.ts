import { fetcher } from "@/core/services/utils/fetcher.util";
import {
  IHistoryChatItem,
  IHistoryChatsResponse,
} from "@/features/sidebar/models/interfaces/historyChats.interface";

export const getHistoryChats = async (): Promise<IHistoryChatItem[]> => {
  const { data } = await fetcher<IHistoryChatsResponse>({
    url: "/api/history-chats",
  });
  return data?.data ?? [];
};
