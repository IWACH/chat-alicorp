import { InputChat } from "../InputChat";
import { WelcomeNewChat } from "../WelcomeNewChat";

function ChatArea() {
  return (
    <div className="flex h-full flex-1 flex-col md:ml-0">
      <WelcomeNewChat />
      <InputChat />
    </div>
  );
}

export default ChatArea;
