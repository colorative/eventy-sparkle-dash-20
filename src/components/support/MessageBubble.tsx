
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { MessageAttachment, Attachment } from "./MessageAttachment";
import BoringAvatar from "boring-avatars";

export interface Message {
  id: string;
  sender: "you" | "host";
  content: string;
  timestamp: string;
  attachments?: Attachment[];
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isYou = message.sender === "you";
  
  return (
    <div 
      className={`mb-4 flex ${isYou ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex ${isYou ? "flex-row-reverse" : "flex-row"} gap-2 max-w-[80%]`}>
        <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
          {isYou ? (
            <BoringAvatar
              size={32}
              name="You"
              variant="marble"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          ) : (
            <BoringAvatar
              size={32}
              name="Host"
              variant="marble"
              colors={["#0078D4", "#50E6FF", "#2D7D9A", "#123B50", "#7AACCC"]}
            />
          )}
        </Avatar>
        
        <div className="flex flex-col">
          {message.content && (
            <div className={`px-3 py-2 rounded-lg text-sm mb-1 ${
              isYou 
                ? "bg-blue-500 text-white rounded-tr-none" 
                : "bg-slate-100 rounded-tl-none"
            }`}>
              {message.content}
            </div>
          )}
          
          {message.attachments && message.attachments.length > 0 && (
            <div className={`flex flex-col gap-2 ${
              isYou ? "items-end" : "items-start"
            }`}>
              {message.attachments.map((attachment) => (
                <div key={attachment.id} className="block">
                  <MessageAttachment attachment={attachment} />
                </div>
              ))}
            </div>
          )}
          
          <div className={`mt-1 text-[10px] text-gray-500 ${
            isYou ? "text-right" : "text-left"
          }`}>
            {isYou ? "You" : "Host"} • {message.timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};
