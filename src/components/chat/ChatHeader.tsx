"use client";

import { Box, IconButton, Typography, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import ScreenShareRoundedIcon from '@mui/icons-material/ScreenShareRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Avatar from "../common/Avatar";
import { useState } from "react";

const ActionIcon = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  padding: theme.spacing(1),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 4,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 2,
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.2s ease',
    borderRadius: theme.shape.borderRadius,
  },
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    '&::after': {
      width: '60%',
    },
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.4rem',
  },
}));

export type TabType = 'chat' | 'files' | 'photos';

interface ChatHeaderProps {
  chatId: string;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const ChatHeader = ({ chatId, activeTab, onTabChange }: ChatHeaderProps) => {
  const handleTabChange = (_: React.SyntheticEvent, newValue: TabType) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          height: 56,
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            name="John Doe"
            size="md"
            isOnline={true}
          />
          <Box>
            <Typography variant="subtitle1">John Doe</Typography>
            <Typography variant="caption" color="text.secondary">
              Last seen today at 12:45 PM
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <ActionIcon>
            <VideocamRoundedIcon />
          </ActionIcon>
          <ActionIcon>
            <CallRoundedIcon />
          </ActionIcon>
          <ActionIcon>
            <ScreenShareRoundedIcon />
          </ActionIcon>
          <ActionIcon>
            <MoreVertRoundedIcon />
          </ActionIcon>
        </Box>
      </Box>
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        sx={{
          minHeight: 40,
          px: 2,
          '& .MuiTab-root': {
            minHeight: 40,
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.9375rem',
            color: 'text.secondary',
            '&.Mui-selected': {
              color: 'primary.main',
            },
          },
        }}
      >
        <Tab label="Chat" value="chat" />
        <Tab label="Files" value="files" />
        <Tab label="Photos" value="photos" />
      </Tabs>
    </Box>
  );
};

export default ChatHeader; 