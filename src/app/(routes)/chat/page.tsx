import { BsChatDots } from "react-icons/bs";

const ChatPage = () => {
  return (
    <div className="h-full flex items-center justify-center bg-gray-700">
      <div className="text-center">
        <BsChatDots className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-200 mb-2">
          Welcome to Chat
        </h1>
        <p className="text-gray-400">
          Select a conversation or start a new one
        </p>
      </div>
    </div>
  );
};

export default ChatPage; 