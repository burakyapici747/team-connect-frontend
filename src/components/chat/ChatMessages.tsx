"use client";

import { useEffect, useRef } from "react";
import { format } from "date-fns";
import { Box, Typography, Avatar as MuiAvatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import DoneAllIcon from '@mui/icons-material/DoneAll';

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
  maxWidth: '70%',
  wordBreak: 'break-word',
  cursor: 'default',
  backgroundColor: isSelf ? theme.palette.primary.main : theme.palette.grey[100],
  color: isSelf ? theme.palette.primary.contrastText : theme.palette.text.primary,
  borderRadius: isLastInGroup
    ? isSelf
      ? '16px 4px 4px 16px'
      : '4px 16px 16px 4px'
    : '16px',
  position: 'relative',
  '&::after': isLastInGroup && !isSelf ? {
    content: '""',
    position: 'absolute',
    left: -8,
    bottom: 0,
    width: 20,
    height: 20,
    backgroundColor: theme.palette.grey[100],
    clipPath: 'polygon(0 0, 100% 100%, 100% 0)',
  } : isLastInGroup && isSelf ? {
    content: '""',
    position: 'absolute',
    right: -8,
    bottom: 0,
    width: 20,
    height: 20,
    backgroundColor: theme.palette.primary.main,
    clipPath: 'polygon(0 100%, 0 0, 100% 0)',
  } : undefined,
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [MOCK_MESSAGES]);

  return (
    <Box
      sx={{
        flex: 1,
        overflow: 'auto',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        bgcolor: 'background.default',
      }}
    >
      {MOCK_MESSAGES.map((message, index) => {
        const isLastInGroup =
          index === MOCK_MESSAGES.length - 1 ||
          MOCK_MESSAGES[index + 1].sender.id !== message.sender.id;

        return (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              flexDirection: message.isSelf ? 'row-reverse' : 'row',
              alignItems: 'flex-end',
              gap: 1.5,
            }}
          >
            {!message.isSelf && isLastInGroup && (
              <MuiAvatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.875rem',
                  bgcolor: 'primary.main',
                }}
              >
                {message.sender.name[0]}
              </MuiAvatar>
            )}
            {!message.isSelf && !isLastInGroup && <Box sx={{ width: 32 }} />}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, maxWidth: '70%', width: '100%', alignItems: message.isSelf ? 'flex-end' : 'flex-start' }}>
              <MessageBubble isSelf={message.isSelf} isLastInGroup={isLastInGroup}>
                {message.content}
              </MessageBubble>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  alignSelf: message.isSelf ? 'flex-end' : 'flex-start',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                  }}
                >
                  {format(message.timestamp, "HH:mm")}
                </Typography>
                {message.isSelf && message.status === "read" && (
                  <DoneAllIcon
                    sx={{
                      fontSize: 16,
                      color: 'primary.main',
                    }}
                  />
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