import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BoringAvatar from "boring-avatars";
import { Clock, Mail } from "lucide-react";

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

interface Conversation {
  id: number;
  contact: Contact;
  messages: Message[];
  unread: boolean;
  lastActive: string;
  type: 'active' | 'invitation_sent' | 'incoming_request';
  isBlocked: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
  onConversationClick: (conversation: Conversation) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onConversationClick
}) => {
  const getConversationPreview = (conversation: Conversation) => {
    if (conversation.type === 'invitation_sent') {
      return "Invitation sent - waiting for acceptance";
    }
    if (conversation.type === 'incoming_request') {
      return "Wants to connect with you";
    }
    if (conversation.messages.length === 0) {
      return "No messages yet";
    }
    return conversation.messages[conversation.messages.length - 1].text;
  };

  // Sort conversations: unread first, then by most recent activity
  const sortedConversations = [...conversations]
    .filter(conv => !conv.isBlocked)
    .sort((a, b) => {
      if (a.unread && !b.unread) return -1;
      if (!a.unread && b.unread) return 1;
      return 0; // Keep original order for same priority
    });

  return (
    <div className="space-y-0">
      {sortedConversations.map((conversation, index) => (
        <div key={conversation.id}>
          <div 
            className="cursor-pointer hover:bg-muted/50 p-3"
            onClick={() => onConversationClick(conversation)}
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-sm truncate pr-2">{conversation.contact.name}</h4>
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-xs text-muted-foreground">{conversation.lastActive}</span>
                {conversation.unread && conversation.type !== 'invitation_sent' && (
                  <div className="bg-primary h-2 w-2 rounded-full" />
                )}
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {getConversationPreview(conversation)}
            </p>
          </div>
          {index < sortedConversations.length - 1 && (
            <div className="border-b border-border mx-3" />
          )}
        </div>
      ))}
      
      {sortedConversations.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          <p className="text-xs">No conversations yet</p>
        </div>
      )}
    </div>
  );
};