import { ReactNode } from "react";
import { Box } from "@mui/material";
import ChatSidebar from "@/components/chat/ChatSidebar";

interface ChatLayoutProps {
  children: ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        bgcolor: "background.default",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <ChatSidebar />
      <Box
        component="section"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          bgcolor: "background.paper",
          borderLeft: 1,
          borderColor: "divider",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ChatLayout; 