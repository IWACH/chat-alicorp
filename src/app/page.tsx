import { ChatArea } from "@/features/chat/components/ChatArea";
import { SidebarWrapper } from "@/features/sidebar/components/SidebarWrapper";
import { ChatProvider } from "@/integrations/providers/ChatProvider";

export default function HomePage() {
  return (
    <ChatProvider>
      <div className="flex h-dvh w-full overflow-hidden">
        <SidebarWrapper />
        <ChatArea />
      </div>
    </ChatProvider>
  );
}
