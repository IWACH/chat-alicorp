"use client";

import { getHistoryChats } from "@/features/sidebar/services/client/sidebar.service";
import { useQuery } from "@tanstack/react-query";

export function useServiceHistoryChats() {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["history-chats"],
    queryFn: getHistoryChats,
  });

  return { data, isLoading, isError, isSuccess };
}
