"use client";

import { Menu } from "lucide-react";

import { Button } from "@/ui/Button";

interface MobileSidebarToggleProps {
  onToggle: () => void;
}

const MobileSidebarToggle = ({ onToggle }: MobileSidebarToggleProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggle}
      className="fixed top-4 left-4 z-50 md:hidden bg-background/80 backdrop-blur-sm border shadow-md hover:bg-background/90"
    >
      <Menu className="h-5 w-5" />
      <span className="sr-only">Open sidebar</span>
    </Button>
  );
};

export default MobileSidebarToggle;
