"use client";

import { useState } from "react";

import { Overlay } from "@/ui/Overlay";

import { MobileSidebarToggle } from "../MobileSidebarToggle";
import { Sidebar } from "../Sidebar";

const SidebarWrapper = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {sidebarOpen && (
        <Overlay onClose={() => setSidebarOpen(false)} className="md:hidden" />
      )}
      {!sidebarOpen && <MobileSidebarToggle onToggle={handleToggleSidebar} />}
      <Sidebar isOpen={sidebarOpen} />
    </>
  );
};

export default SidebarWrapper;
