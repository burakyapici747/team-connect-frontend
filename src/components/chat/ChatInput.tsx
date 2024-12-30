"use client";

import { useState, KeyboardEvent } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { InsertEmoticon, AttachFile, Send, Mic } from "@mui/icons-material";

interface ChatInputProps {
  chatId: string;
}

const ChatInput = ({ chatId }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically call your API to send the message
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ 
      p: 2, 
      bgcolor: 'background.paper',
      borderTop: 1,
      borderColor: 'divider'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
        <IconButton color="inherit" sx={{ p: 1.25 }}>
          <InsertEmoticon />
        </IconButton>
        <IconButton color="inherit" sx={{ p: 1.25 }}>
          <AttachFile />
        </IconButton>
        <Box sx={{ flex: 1, position: 'relative' }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'grey.50',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
                '&.Mui-focused': {
                  bgcolor: 'background.paper',
                },
              }
            }}
          />
          <Box sx={{ position: 'absolute', right: 8, bottom: 8 }}>
            {!message.trim() ? (
              <IconButton color="inherit" size="small">
                <Mic />
              </IconButton>
            ) : (
              <IconButton 
                onClick={handleSendMessage}
                color="primary" 
                size="small"
              >
                <Send />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatInput; 