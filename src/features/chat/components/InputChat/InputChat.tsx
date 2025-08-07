"use client";

import { ArrowUp, Paperclip } from "lucide-react";
import { useState } from "react";

import { Button } from "@/ui/Button";

const InputChat = () => {
  const [inputValue, setInputValue] = useState("");

  const isDisabled = !inputValue.trim();

  return (
    <div className="p-4">
      <div className="relative flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-3 z-10 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
        >
          <Paperclip className="h-4 w-4" />
        </Button>

        <input
          type="text"
          placeholder="Pregunta lo que quieras"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full rounded-full bg-muted/50 pl-12 pr-20 py-3 text-base border-0 focus:outline-none focus:ring-0 placeholder:text-muted-foreground"
        />

        <Button
          variant="default"
          size="sm"
          disabled={isDisabled}
          className={`absolute right-2 z-10 h-8 w-8 p-0 rounded-full shadow-md border transition-all duration-200 ${
            isDisabled
              ? "bg-gray-400 text-white cursor-not-allowed border-gray-300 dark:bg-gray-500 dark:text-white dark:border-gray-400"
              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 border-primary/20 shadow-lg"
          }`}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default InputChat;
