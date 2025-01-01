"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Box, Button, Typography, Badge } from "@mui/material";
import Avatar from "@/components/common/Avatar";

interface ChatListProps {
  searchQuery: string;
}

const MOCK_CHATS = [
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
    lastMessage: "The meeting is at 2 PM. Please make sure to prepare the presentation slides.",
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

const ChatList = ({ searchQuery }: ChatListProps) => {
  const router = useRouter();
  
  const filteredChats = MOCK_CHATS.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {filteredChats.map((chat) => (
        <Button
          key={chat.id}
          onClick={() => router.push(`/chat/${chat.id}`)}
          fullWidth
          sx={{
            py: 1.5,
            px: 2,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1.5,
            justifyContent: 'flex-start',
            textAlign: 'left',
            borderBottom: 1,
            borderColor: 'divider',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <Avatar
            name={chat.name}
            size="md"
            showStatus={!chat.isGroup}
            isOnline={chat.isOnline}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'text.primary',
                  fontWeight: 500,
                  textTransform: 'none',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {chat.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', ml: 1 }}
              >
                {format(chat.timestamp, "HH:mm")}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                textTransform: 'none',
              }}
            >
              {chat.lastMessage}
            </Typography>
          </Box>
          {chat.unreadCount > 0 && (
            <Badge
              badgeContent={chat.unreadCount}
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  minWidth: 20,
                  height: 20,
                  padding: '0 6px',
                },
              }}
            />
          )}
        </Button>
      ))}
    </Box>
  );
};

export default ChatList; 