"use client";

import { useEffect, useRef } from "react";

import { useChatContext } from "@/integrations/providers/ChatProvider/hooks/useChatContext.hook";

import { InputChat } from "../InputChat";
import { ItemMessageInChat } from "../ItemMessageInChat";
import { ThinkLoading } from "../ThinkLoading";
import { WelcomeNewChat } from "../WelcomeNewChat";

function ChatArea() {
  const { data: messages, isPending, sendMessage } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isPending]);

  return (
    <div className="flex h-full flex-1 flex-col md:ml-0">
      {messages?.length === 0 ? (
        <WelcomeNewChat />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages?.map((m) => (
            <ItemMessageInChat key={m.id} message={m} />
          ))}

          {isPending && <ThinkLoading />}

          <div ref={messagesEndRef} />
        </div>
      )}

      <InputChat onSend={sendMessage} disabled={isPending} />
    </div>
  );
}

export default ChatArea;
