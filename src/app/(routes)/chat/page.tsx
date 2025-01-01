import { Box, Typography } from "@mui/material";
import { BsChatDots } from "react-icons/bs";

const ChatPage = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <BsChatDots
          style={{
            width: 64,
            height: 64,
            color: "rgba(0, 0, 0, 0.2)",
            marginBottom: 16,
          }}
        />
        <Typography variant="h5" sx={{ mb: 1, color: "text.primary", fontWeight: 600 }}>
          Select a Chat
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Choose a conversation from the list or start a new one
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatPage; 