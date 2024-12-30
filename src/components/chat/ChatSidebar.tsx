"use client";

import { useState, useRef, useEffect } from "react";
import { BiSearch, BiFilter } from "react-icons/bi";
import { BsCameraVideo, BsPencilSquare, BsX } from "react-icons/bs";
import ChatList from "./ChatList/index";
import { useRouter } from "next/navigation";

interface FilterMenuProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const FilterMenu = ({ isOpen, onClose, buttonRef }: FilterMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute top-full right-0 mt-1 w-[280px] bg-white rounded-lg shadow-lg border border-gray-200 
        overflow-hidden transition-all duration-200 ease-out transform origin-top-right z-50"
    >
      <div className="p-3 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-900">Filter by name</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <BsX className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="p-3">
        <input
          type="text"
          placeholder="Enter name to filter"
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm
            focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300"
          autoFocus
        />
      </div>
    </div>
  );
};

interface MeetingMenuProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const MeetingMenu = ({ isOpen, onClose, buttonRef }: MeetingMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="absolute top-full right-0 mt-1 w-[320px] bg-white rounded-lg shadow-lg border border-gray-200 
        overflow-hidden transition-all duration-200 ease-out transform origin-top-right z-50"
    >
      <div className="p-3 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-900">Start a meeting now</h3>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <BsX className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      <div className="p-3 space-y-3">
        <input
          type="text"
          placeholder="Meeting name"
          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm
            focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300"
          autoFocus
        />
        <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium
          hover:bg-gray-100 transition-colors border border-gray-200">
          Get a link to share
        </button>
        <button className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium
          hover:bg-primary-600 transition-colors">
          Start meeting
        </button>
      </div>
    </div>
  );
};

const ChatSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isMeetingMenuOpen, setIsMeetingMenuOpen] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const meetingButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const startNewChat = () => {
    router.push("/chat/new");
  };

  const handleChatSelect = (chatId: string) => {
    router.replace(`/chat/${chatId}`);
  };

  return (
    <div className="w-[340px] bg-white border-r border-gray-200 flex flex-col">
      <div className="h-14 px-4 border-b border-gray-200 flex items-center justify-end">
        <div className="flex items-center gap-1 relative">
          <button
            ref={filterButtonRef}
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all
              focus:outline-none focus:ring-2 focus:ring-gray-100"
          >
            <BiFilter className="w-5 h-5" />
          </button>
          <button
            ref={meetingButtonRef}
            onClick={() => setIsMeetingMenuOpen(!isMeetingMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all
              focus:outline-none focus:ring-2 focus:ring-gray-100"
          >
            <BsCameraVideo className="w-5 h-5" />
          </button>
          <button
            onClick={startNewChat}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all
              focus:outline-none focus:ring-2 focus:ring-gray-100"
          >
            <BsPencilSquare className="w-5 h-5" />
          </button>

          {isFilterMenuOpen && (
            <FilterMenu 
              isOpen={isFilterMenuOpen} 
              onClose={() => setIsFilterMenuOpen(false)} 
              buttonRef={filterButtonRef}
            />
          )}
          {isMeetingMenuOpen && (
            <MeetingMenu 
              isOpen={isMeetingMenuOpen} 
              onClose={() => setIsMeetingMenuOpen(false)} 
              buttonRef={meetingButtonRef}
            />
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <ChatList 
          searchQuery={searchQuery} 
          onChatSelect={handleChatSelect}
        />
      </div>
    </div>
  );
};

export default ChatSidebar; 