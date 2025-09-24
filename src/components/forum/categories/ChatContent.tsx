
import React, { useState, useEffect, useRef } from "react";
import { ForumCategory, ChatMessage } from "@/types/forum";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import Avatar3d from "boring-avatars";

interface ChatContentProps {
  category: ForumCategory;
}

// Mock initial chat messages
const initialMessages: ChatMessage[] = [
  {
    id: 1,
    authorName: "Sarah Johnson",
    content: "Hey everyone! Welcome to the group chat 👋",
    timestamp: "2024-06-20T10:30:00Z",
    isCurrentUser: false
  },
  {
    id: 2,
    authorName: "Mike Chen",
    content: "Great to be here! Looking forward to connecting with everyone",
    timestamp: "2024-06-20T10:35:00Z",
    isCurrentUser: false
  },
  {
    id: 3,
    authorName: "Alex Rodriguez",
    content: "This is such a cool feature! Love the simplicity",
    timestamp: "2024-06-20T10:40:00Z",
    isCurrentUser: false
  }
];

export const ChatContent: React.FC<ChatContentProps> = ({ category }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserName] = useState("You"); // In a real app, this would come from auth
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: messages.length + 1,
      authorName: currentUserName,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isCurrentUser: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-[600px] bg-white border rounded-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg text-lg"
            style={{ backgroundColor: category.color }}
          >
            {category.icon}
          </div>
          <div>
            <h3 className="font-semibold">Group Chat</h3>
            <p className="text-sm text-muted-foreground">
              {messages.length} messages
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.isCurrentUser ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <Avatar3d
                size={32}
                name={message.authorName}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
              
              <div
                className={`flex flex-col max-w-[70%] ${
                  message.isCurrentUser ? "items-end" : "items-start"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-600">
                    {message.authorName}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                
                <div
                  className={`rounded-lg px-3 py-2 text-sm ${
                    message.isCurrentUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
