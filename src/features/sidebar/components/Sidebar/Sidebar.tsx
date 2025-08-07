"use client";

import { FC } from "react";

import { AddNewChatButton } from "../AddNewChatButton";
import { HistoryChats } from "../HistoryChats";
import { SidebarHeader } from "../SidebarHeader";

interface Props {
  isOpen?: boolean;
}

const Sidebar: FC<Props> = ({ isOpen = true }) => {
  return (
    <>
      <div
        className={`
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          fixed left-0 top-0 z-50 h-full w-64 transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:transform-none
          flex flex-col bg-background/95 backdrop-blur-md border-r shadow-xl
        `}
      >
        <SidebarHeader />
        <AddNewChatButton />
        <HistoryChats />
      </div>
    </>
  );
};

export default Sidebar;
