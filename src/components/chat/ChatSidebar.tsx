"use client";

import { useState, useRef } from "react";
import { BiSearch, BiFilter } from "react-icons/bi";
import { BsCameraVideo, BsPencilSquare, BsX } from "react-icons/bs";
import ChatList from "./ChatList/index";
import { useRouter } from "next/navigation";
import { 
  IconButton, 
  Menu, 
  MenuItem,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Divider
} from '@mui/material';

interface FilterMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const FilterMenu = ({ anchorEl, onClose }: FilterMenuProps) => {
  return (
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
        sx: { width: 280, mt: 1 }
      }}
    >
      <Box sx={{ p: 2, pb: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2">Filter by name</Typography>
          <IconButton size="small" onClick={onClose}>
            <BsX />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          size="small"
          placeholder="Enter name to filter"
          autoFocus
        />
      </Box>
    </Menu>
  );
};

interface MeetingMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const MeetingMenu = ({ anchorEl, onClose }: MeetingMenuProps) => {
  return (
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
        sx: { width: 320, mt: 1 }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2">Start a meeting now</Typography>
          <IconButton size="small" onClick={onClose}>
            <BsX />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Meeting name"
            autoFocus
          />
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            sx={{ textTransform: 'none' }}
          >
            Get a link to share
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ textTransform: 'none' }}
          >
            Start meeting
          </Button>
        </Box>
      </Box>
    </Menu>
  );
};

const ChatSidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [meetingAnchorEl, setMeetingAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const startNewChat = () => {
    router.push("/chat/new");
  };

  const handleChatSelect = (chatId: string) => {
    router.replace(`/chat/${chatId}`);
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        width: 340, 
        borderRadius: 0,
        borderRight: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ 
        height: 56, 
        px: 2,
        borderBottom: 1,
        borderColor: 'divider',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 0.5
      }}>
        <IconButton
          onClick={(e) => setFilterAnchorEl(e.currentTarget)}
          size="small"
        >
          <BiFilter />
        </IconButton>
        <IconButton
          onClick={(e) => setMeetingAnchorEl(e.currentTarget)}
          size="small"
        >
          <BsCameraVideo />
        </IconButton>
        <IconButton
          onClick={startNewChat}
          size="small"
        >
          <BsPencilSquare />
        </IconButton>

        <FilterMenu 
          anchorEl={filterAnchorEl}
          onClose={() => setFilterAnchorEl(null)}
        />
        <MeetingMenu 
          anchorEl={meetingAnchorEl}
          onClose={() => setMeetingAnchorEl(null)}
        />
      </Box>
      
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <ChatList 
          searchQuery={searchQuery} 
          onChatSelect={handleChatSelect}
        />
      </Box>
    </Paper>
  );
};

export default ChatSidebar; 