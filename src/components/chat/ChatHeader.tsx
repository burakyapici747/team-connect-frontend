"use client";

import { Box, IconButton, Typography, Avatar as MuiAvatar, Tabs, Tab } from "@mui/material";
import { 
  MoreVert as MoreVertIcon,
  Phone as PhoneIcon,
  Videocam as VideocamIcon,
  ScreenShare as ScreenShareIcon,
  Group as GroupIcon 
} from "@mui/icons-material";

type TabType = 'chat' | 'files' | 'photos';

interface ChatHeaderProps {
  chatId: string;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const ChatHeader = ({ chatId, activeTab, onTabChange }: ChatHeaderProps) => {
  const chatInfo = {
    name: "John Doe",
    status: "Online",
    lastSeen: "Last seen today at 12:45 PM",
    isOnline: true,
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabType) => {
    onTabChange(newValue);
  };

  return (
    <Box sx={{ 
      bgcolor: 'background.paper',
      borderBottom: 1,
      borderColor: 'divider'
    }}>
      <Box sx={{ 
        height: 64, 
        px: 3, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <MuiAvatar 
            sx={{ 
              width: 40, 
              height: 40,
              position: 'relative',
              '&::after': chatInfo.isOnline ? {
                content: '""',
                position: 'absolute',
                width: 12,
                height: 12,
                bgcolor: 'success.main',
                borderRadius: '50%',
                border: 2,
                borderColor: 'background.paper',
                bottom: 0,
                right: 0,
              } : {}
            }}
          >
            {chatInfo.name[0]}
          </MuiAvatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              {chatInfo.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {chatInfo.lastSeen}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton>
            <GroupIcon />
          </IconButton>
          <IconButton>
            <VideocamIcon />
          </IconButton>
          <IconButton>
            <PhoneIcon />
          </IconButton>
          <IconButton>
            <ScreenShareIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      <Tabs 
        value={activeTab} 
        onChange={handleTabChange}
        sx={{
          px: 3,
          minHeight: 42,
          borderTop: 1,
          borderColor: 'divider',
          '& .MuiTab-root': {
            minHeight: 42,
            textTransform: 'none',
            fontWeight: 500
          }
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