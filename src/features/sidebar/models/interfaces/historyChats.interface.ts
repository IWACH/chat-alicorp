import { IApiResponse } from "@/core/services/models/interfaces/apiResponse.interface";

export interface IHistoryChatItem {
  id: string;
  title: string;
  lastMessageAt: string;
}

export type IHistoryChatsResponse = IApiResponse<IHistoryChatItem[]>;

