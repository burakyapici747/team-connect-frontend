"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Avatar from "@/components/common/Avatar";
import { Box, Button, Typography, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1.5, 1.5),
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  textTransform: 'none',
  justifyContent: 'flex-start',
  color: 'inherit',
  borderRadius: 0,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:focus': {
    backgroundColor: theme.palette.action.focus,
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    minWidth: 20,
    height: 20,
    padding: '0 6px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '0.75rem',
    fontWeight: 500,
    borderRadius: 10,
  },
}));

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
    <Box sx={{ py: 1 }}>
      {filteredChats.map((chat) => (
        <StyledButton
          key={chat.id}
          onClick={() => onChatSelect?.(chat.id)}
        >
          <Avatar 
            name={chat.name}
            size="md"
            showStatus={!chat.isGroup}
            isOnline={chat.isOnline}
          />
          <Box sx={{ 
            flex: 1, 
            minWidth: 0, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'flex-start' 
          }}>
            <Box sx={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 0.25 
            }}>
              <Typography 
                variant="subtitle2" 
                noWrap 
                sx={{ 
                  fontWeight: 600,
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                {chat.name}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  ml: 1,
                  color: 'text.secondary',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {format(chat.timestamp, "d MMM")}
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              noWrap 
              sx={{ 
                width: '100%',
                color: 'text.secondary'
              }}
            >
              {chat.lastMessage}
            </Typography>
          </Box>
          {chat.unreadCount > 0 && (
            <StyledBadge 
              badgeContent={chat.unreadCount} 
              sx={{ flexShrink: 0 }}
            />
          )}
        </StyledButton>
      ))}
    </Box>
  );
};

export default ChatList; 