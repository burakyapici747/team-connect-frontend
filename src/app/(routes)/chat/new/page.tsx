"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import Avatar from "@/components/common/Avatar";

interface User {
  id: string;
  name: string;
  email: string;
  isOnline: boolean;
}

const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    isOnline: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    isOnline: false,
  },
];

const NewChatPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredUsers = MOCK_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startChat = (userId: string) => {
    // In a real app, you would create a new chat here
    router.push(`/chat/${userId}`);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full px-4">
        <div className="w-full space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Start a new conversation
          </h1>
          
          <div className="relative">
            <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter name, email or phone number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 text-gray-900 rounded-lg
                border border-gray-200 focus:border-primary-300 focus:ring-2 focus:ring-primary-100 
                transition-all text-sm"
            />
          </div>

          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => startChat(user.id)}
                className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <Avatar 
                  name={user.name}
                  size="md"
                  showStatus
                  isOnline={user.isOnline}
                />
                <div className="flex-1 text-left">
                  <h3 className="text-sm font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChatPage; 