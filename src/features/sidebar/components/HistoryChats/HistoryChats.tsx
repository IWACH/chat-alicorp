import { EmptyChats } from "./components/EmptyChats";

const historyChatsData: [] = [];

const HistoryChats = () => {
  if (!historyChatsData.length) return <EmptyChats />;

  return <div>HistoryChats</div>;
};

export default HistoryChats;
