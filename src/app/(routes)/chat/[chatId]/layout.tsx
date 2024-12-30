interface ChatLayoutProps {
  children: React.ReactNode;
  params: {
    chatId: string;
  };
}

export default function ChatLayout({ children, params }: ChatLayoutProps) {
  return children;
} 