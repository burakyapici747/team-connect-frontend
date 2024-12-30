"use client";

import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { Box, Typography, Avatar as MuiAvatar, IconButton, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ReplyIcon from '@mui/icons-material/Reply';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { BsEmojiSmile, BsEmojiLaughing, BsEmojiHeartEyes, BsHandThumbsUp } from 'react-icons/bs';
import { IoMdHeart } from 'react-icons/io';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

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
  maxWidth: '100%',
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
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': !isSelf && {
    backgroundColor: theme.palette.grey[200],
    '& + .message-actions': {
      opacity: 1,
      transform: 'translateY(0)',
      visibility: 'visible',
    }
  },
  '&::after': isLastInGroup && !isSelf ? {
    content: '""',
    position: 'absolute',
    left: -8,
    bottom: 0,
    width: 20,
    height: 20,
    backgroundColor: 'inherit',
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

const ActionIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  color: theme.palette.text.secondary,
  transition: theme.transitions.create(['transform', 'color'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    transform: 'scale(1.2) translateY(-2px)',
  },
  '& .MuiSvgIcon-root, & svg': {
    fontSize: '1.25rem',
  },
}));

const ReactionButton = styled(ActionIconButton)(({ theme }) => ({
  '&.thumbs-up': {
    color: '#1976d2',
    '&:hover': {
      color: '#1565c0',
    }
  },
  '&.heart': {
    color: '#e91e63',
    '&:hover': {
      color: '#d81b60',
    }
  },
  '&.laugh': {
    color: '#ff9800',
    '&:hover': {
      color: '#f57c00',
    }
  },
  '&.wow': {
    color: '#ff5722',
    '&:hover': {
      color: '#f4511e',
    }
  },
  '&:hover': {
    transform: 'scale(1.2) translateY(-2px)',
  },
}));

const MessageActions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -36,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.5),
  borderRadius: 20,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(0)',
  transition: theme.transitions.create(['opacity', 'transform', 'visibility'], {
    duration: theme.transitions.duration.shorter,
  }),
  zIndex: 1,
  '&:hover, &.active': {
    opacity: 1,
    visibility: 'visible',
  },
}));

interface MessageContextMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  isSelf: boolean;
}

const MessageContextMenu = ({ anchorEl, onClose, isSelf }: MessageContextMenuProps) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    PaperProps={{
      sx: {
        mt: 1,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        borderRadius: 2,
        minWidth: 180,
      }
    }}
  >
    <MenuItem onClick={onClose}>Forward</MenuItem>
    <MenuItem onClick={onClose}>Copy link</MenuItem>
    <MenuItem onClick={onClose}>Mark as unread</MenuItem>
    <MenuItem onClick={onClose}>Translate</MenuItem>
    <MenuItem onClick={onClose} sx={{ color: 'error.main' }}>Report a concern</MenuItem>
  </Menu>
);

const EmojiPicker = ({ onEmojiSelect, onClose }: { onEmojiSelect: (emoji: any) => void; onClose: () => void }) => (
  <Box sx={{ position: 'absolute', bottom: '100%', right: 0, mb: 1 }}>
    <Picker 
      data={data} 
      onEmojiSelect={onEmojiSelect}
      onClickOutside={onClose}
      theme="light"
      previewPosition="none"
      skinTonePosition="none"
    />
  </Box>
);

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
  const [contextMenu, setContextMenu] = useState<{
    messageId: string;
    anchorEl: HTMLElement | null;
  } | null>(null);
  const [emojiPicker, setEmojiPicker] = useState<{
    messageId: string;
    isOpen: boolean;
  } | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [MOCK_MESSAGES]);

  const handleContextMenu = (messageId: string, event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const actionsElement = event.currentTarget.closest('.message-actions');
    if (actionsElement) {
      actionsElement.classList.add('active');
    }
    setContextMenu({
      messageId,
      anchorEl: event.currentTarget,
    });
  };

  const handleCloseContextMenu = () => {
    const actionsElements = document.querySelectorAll('.message-actions');
    actionsElements.forEach(el => el.classList.remove('active'));
    setContextMenu(null);
  };

  const handleEmojiClick = (messageId: string) => {
    setEmojiPicker({
      messageId,
      isOpen: true,
    });
  };

  const handleEmojiSelect = (emoji: any) => {
    console.log('Selected emoji:', emoji.native);
    setEmojiPicker(null);
  };

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      {MOCK_MESSAGES.map((message, index) => {
        const isLastInGroup =
          index === MOCK_MESSAGES.length - 1 ||
          MOCK_MESSAGES[index + 1].sender.id !== message.sender.id;

        return (
          <Box
            key={message.id}
            className="message-wrapper"
            sx={{
              display: 'flex',
              flexDirection: message.isSelf ? 'row-reverse' : 'row',
              alignItems: 'flex-end',
              gap: 0.5,
              justifyContent: message.isSelf ? 'flex-end' : 'flex-start',
              width: '100%',
              pr: 0.5,
              pl: 0.5,
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
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 0.5,
              maxWidth: '100%',
              marginLeft: message.isSelf ? 'auto' : 'unset',
              marginRight: message.isSelf ? '0' : 'unset',
            }}>
              <Box sx={{ 
                position: 'relative',
                display: 'inline-flex',
              }}>
                <MessageBubble isSelf={message.isSelf} isLastInGroup={isLastInGroup}>
                  {message.content}
                </MessageBubble>
                {!message.isSelf && (
                  <MessageActions className="message-actions">
                    <ReactionButton size="small" className="thumbs-up">
                      <BsHandThumbsUp />
                    </ReactionButton>
                    <ReactionButton size="small" className="heart">
                      <IoMdHeart />
                    </ReactionButton>
                    <ReactionButton size="small" className="laugh">
                      <BsEmojiLaughing />
                    </ReactionButton>
                    <ReactionButton size="small" className="wow">
                      <BsEmojiHeartEyes />
                    </ReactionButton>
                    <ActionIconButton size="small">
                      <ReplyIcon />
                    </ActionIconButton>
                    <ActionIconButton 
                      size="small"
                      onClick={(e) => handleContextMenu(message.id, e)}
                    >
                      <MoreHorizIcon />
                    </ActionIconButton>
                  </MessageActions>
                )}
              </Box>
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
      <MessageContextMenu
        anchorEl={contextMenu?.anchorEl ?? null}
        onClose={handleCloseContextMenu}
        isSelf={MOCK_MESSAGES.find(m => m.id === contextMenu?.messageId)?.isSelf || false}
      />
    </Box>
  );
};

export default ChatMessages; 