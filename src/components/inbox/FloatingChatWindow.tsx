import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Minus, Send } from "lucide-react";
import BoringAvatar from "boring-avatars";

interface Message {
  id: number;
  sender: 'them' | 'you';
  text: string;
  time: string;
}

interface Contact {
  name: string;
  company: string;
  role: string;
}

interface FloatingChatWindowProps {
  conversation: {
    id: number;
    contact: Contact;
    messages: Message[];
  };
  onClose: () => void;
  onMinimize: () => void;
  isMinimized: boolean;
  position: number;
}

export const FloatingChatWindow: React.FC<FloatingChatWindowProps> = ({
  conversation,
  onClose,
  onMinimize,
  isMinimized,
  position
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const windowWidth = 320;
  const windowSpacing = 10;
  const rightOffset = 20;
  
  const leftPosition = `calc(100vw - ${rightOffset + (position + 1) * (windowWidth + windowSpacing)}px)`;

  if (isMinimized) {
    return (
      <div 
        className="fixed bottom-0 z-50 w-80 h-12"
        style={{ left: leftPosition }}
      >
        <Card className="h-full border-t rounded-t-lg rounded-b-none shadow-lg">
          <CardHeader className="p-2 cursor-pointer" onClick={onMinimize}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BoringAvatar
                  size={24}
                  name={conversation.contact.name}
                  variant="marble"
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />
                <span className="text-sm font-medium">{conversation.contact.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onClose(); }}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="fixed bottom-0 z-50 w-80 h-96"
      style={{ left: leftPosition }}
    >
      <Card className="h-full flex flex-col border rounded-t-lg rounded-b-none shadow-lg">
        <CardHeader className="p-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BoringAvatar
                size={32}
                name={conversation.contact.name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
              <div>
                <h4 className="font-medium text-sm">{conversation.contact.name}</h4>
                <p className="text-xs text-gray-500">{conversation.contact.company}</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={onMinimize}>
                <Minus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-3 overflow-auto">
          <div className="space-y-3">
            {conversation.messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${msg.sender === 'you' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'} rounded-lg px-3 py-2`}>
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-70 block text-right mt-1">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        <div className="p-3 border-t">
          <div className="flex gap-2">
            <Input 
              placeholder="Type a message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-sm"
            />
            <Button size="sm" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};