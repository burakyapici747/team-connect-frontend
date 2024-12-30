"use client";

import { useState, useCallback } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

type TabType = 'chat' | 'files' | 'photos';

interface ChatAreaProps {
  chatId: string;
}

const ChatArea = ({ chatId }: ChatAreaProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('chat');

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
            <ChatMessages chatId={chatId} />
            <ChatInput chatId={chatId} />
          </Box>
        );
      case 'files':
        return (
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 3,
            color: 'text.secondary' 
          }}>
            <Box sx={{ maxWidth: 'md', textAlign: 'center' }}>
              <Box sx={{ typography: 'h6', mb: 1 }}>Shared Files</Box>
              <Box sx={{ typography: 'body2' }}>All files shared in this conversation will appear here.</Box>
            </Box>
          </Box>
        );
      case 'photos':
        return (
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 3,
            color: 'text.secondary' 
          }}>
            <Box sx={{ maxWidth: 'md', textAlign: 'center' }}>
              <Box sx={{ typography: 'h6', mb: 1 }}>Shared Photos</Box>
              <Box sx={{ typography: 'body2' }}>All photos and images shared in this conversation will appear here.</Box>
            </Box>
          </Box>
        );
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      minWidth: 0,
      overflow: 'hidden',
      bgcolor: 'background.paper'
    }}>
      <ChatHeader 
        chatId={chatId} 
        onTabChange={handleTabChange} 
        activeTab={activeTab} 
      />
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default ChatArea; 