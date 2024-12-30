import { ReactNode } from "react";
import ChatSidebar from "@/components/chat/ChatSidebar";

interface ChatLayoutProps {
  children: ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <div className="flex h-full">
      <ChatSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ChatLayout; 