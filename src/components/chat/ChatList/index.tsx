"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Avatar from "@/components/common/Avatar";

export interface ChatListProps {
  searchQuery: string;
  onChatSelect?: (chatId: string) => void;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline: boolean;
  isGroup?: boolean;
}

const MOCK_CHATS: Chat[] = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    timestamp: new Date(2024, 0, 1, 10, 30),
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    lastMessage: "The meeting is at 2 PM. Please make sure to prepare the presentation slides before the meeting starts.",
    timestamp: new Date(2024, 0, 1, 9, 15),
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: "3",
    name: "Marketing Team",
    lastMessage: "New campaign draft has been uploaded",
    timestamp: new Date(2024, 0, 1, 8, 45),
    unreadCount: 5,
    isOnline: true,
    isGroup: true,
  },
];

const ChatList = ({ searchQuery, onChatSelect }: ChatListProps) => {
  const filteredChats = MOCK_CHATS.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-2">
      {filteredChats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onChatSelect?.(chat.id)}
          className="w-full px-3 py-2.5 flex items-start gap-3 hover:bg-gray-50 
            group transition-all focus:bg-gray-100 focus:outline-none"
        >
          <Avatar 
            name={chat.name}
            size="md"
            showStatus={!chat.isGroup}
            isOnline={chat.isOnline}
          />
          <div className="flex-1 min-w-0 flex flex-col items-start">
            <div className="w-full flex justify-between items-center mb-0.5">
              <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-primary-600">
                {chat.name}
              </h3>
              <span className="text-xs text-gray-500 ml-2 tabular-nums">
                {format(chat.timestamp, "d MMM")}
              </span>
            </div>
            <p className="text-sm text-gray-600 truncate w-full">
              {chat.lastMessage}
            </p>
          </div>
          {chat.unreadCount > 0 && (
            <span className="flex-shrink-0 h-5 min-w-5 px-1.5 inline-flex items-center 
              justify-center bg-primary-500 text-white text-xs font-medium rounded-full">
              {chat.unreadCount}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default ChatList; 