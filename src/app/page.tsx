import { ChatArea } from "@/features/chat/components/ChatArea";
import { SidebarWrapper } from "@/features/sidebar/components/SidebarWrapper";

export default function HomePage() {
  return (
    <div className="flex h-dvh w-full overflow-hidden">
      <SidebarWrapper />
      <ChatArea />
    </div>
  );
}
