import { useChatContext } from "@/integrations/providers/ChatProvider/hooks/useChatContext.hook";
import { Button } from "@/ui/Button";

const AddNewChatButton = () => {
  const { startNewChat, isStartingNewChat } = useChatContext();

  const handleNewChat = () => {
    startNewChat();
  };

  return (
    <div className="p-4">
      <Button
        className="w-full justify-start"
        size="sm"
        onClick={handleNewChat}
        disabled={isStartingNewChat}
      >
        {isStartingNewChat ? "Creando..." : "+ Nuevo Chat"}
      </Button>
    </div>
  );
};

export default AddNewChatButton;
