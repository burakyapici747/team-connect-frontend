"use client";

import { Box } from "@mui/material";
import ChatHeader, { TabType } from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useState } from "react";
import FileList from "./FileList";
import PhotoGrid from "./PhotoGrid";

interface ChatAreaProps {
  chatId: string;
}

const ChatArea = ({ chatId }: ChatAreaProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("chat");

  const renderTabContent = () => {
    switch (activeTab) {
      case "chat":
        return (
          <>
            <ChatMessages chatId={chatId} />
            <ChatInput chatId={chatId} />
          </>
        );
      case "files":
        return <FileList chatId={chatId} />;
      case "photos":
        return <PhotoGrid chatId={chatId} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <ChatHeader 
        chatId={chatId} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      {renderTabContent()}
    </Box>
  );
};

export default ChatArea; 