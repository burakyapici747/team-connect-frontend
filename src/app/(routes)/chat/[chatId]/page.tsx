"use client";

import { use } from "react";
import ChatArea from "@/components/chat/ChatArea";

interface ChatPageProps {
  params: Promise<{
    chatId: string;
  }>;
}

const ChatPage = ({ params }: ChatPageProps) => {
  const resolvedParams = use(params);

  return <ChatArea chatId={resolvedParams.chatId} />;
};

export default ChatPage; 