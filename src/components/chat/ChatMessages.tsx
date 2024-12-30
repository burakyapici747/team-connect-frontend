"use client";

import { useEffect, useRef } from "react";
import { format } from "date-fns";
import { Box, Typography, Avatar as MuiAvatar } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: {
    id: string;
    name: string;
  };
  isSelf: boolean;
  status?: "sent" | "delivered" | "read";
}

interface ChatMessagesProps {
  chatId: string;
}

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isSelf" && prop !== "isLastInGroup"
})<{ isSelf: boolean; isLastInGroup: boolean }>(({ theme, isSelf, isLastInGroup }) => ({
  padding: theme.spacing(1.5, 2),
  boxShadow: theme.shadows[1],
  cursor: 'default',
  backgroundColor: isSelf ? theme.palette.primary.main : theme.palette.background.paper,
  color: isSelf ? theme.palette.primary.contrastText : theme.palette.text.primary,
  borderRadius: isLastInGroup
    ? isSelf
      ? '16px 16px 4px 16px'
      : '16px 16px 16px 4px'
    : '16px',
}));

const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    content: "Hey, how are you?",
    timestamp: new Date(2024, 0, 1, 10, 30),
    sender: {
      id: "1",
      name: "John Doe",
    },
    isSelf: false,
  },
  {
    id: "2",
    content: "I'm good, thanks! Just finished the project presentation. How about you?",
    timestamp: new Date(2024, 0, 1, 10, 31),
    sender: {
      id: "2",
      name: "You",
    },
    isSelf: true,
    status: "read",
  },
  {
    id: "3",
    content: "That's great! I'd love to see it. Can you share it with me?",
    timestamp: new Date(2024, 0, 1, 10, 32),
    sender: {
      id: "1",
      name: "John Doe",
    },
    isSelf: false,
  },
];

const ChatMessages = ({ chatId }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [MOCK_MESSAGES]);

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'auto',
      p: 3,
      bgcolor: 'grey.50',
      '& > * + *': { mt: 2 }
    }}>
      {MOCK_MESSAGES.map((message, index) => {
        const showAvatar = index === 0 || MOCK_MESSAGES[index - 1].sender.id !== message.sender.id;
        const showName = showAvatar;
        const isLastInGroup = 
          index === MOCK_MESSAGES.length - 1 || 
          MOCK_MESSAGES[index + 1].sender.id !== message.sender.id;
        
        return (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 1,
              flexDirection: message.isSelf ? 'row-reverse' : 'row'
            }}
          >
            {!message.isSelf && showAvatar ? (
              <MuiAvatar sx={{ width: 32, height: 32 }}>{message.sender.name[0]}</MuiAvatar>
            ) : (
              <Box sx={{ width: 32 }} />
            )}
            <Box sx={{ 
              maxWidth: '70%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.isSelf ? 'flex-end' : 'flex-start'
            }}>
              {showName && !message.isSelf && (
                <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5, mb: 0.5 }}>
                  {message.sender.name}
                </Typography>
              )}
              <MessageBubble isSelf={message.isSelf} isLastInGroup={isLastInGroup}>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {message.content}
                </Typography>
              </MessageBubble>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                mt: 0.5,
                px: 0.5,
                flexDirection: message.isSelf ? 'row-reverse' : 'row'
              }}>
                <Typography variant="caption" color="text.secondary">
                  {format(message.timestamp, "HH:mm")}
                </Typography>
                {message.isSelf && message.status === "read" && (
                  <Typography variant="caption" color="primary">✓✓</Typography>
                )}
              </Box>
            </Box>
          </Box>
        );
      })}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatMessages; 