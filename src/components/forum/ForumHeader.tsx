import React from "react";
import { MessageSquare } from "lucide-react";
export const ForumHeader: React.FC = () => {
  return <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        
        <h1 className="text-3xl font-bold">Community Forum</h1>
      </div>
      <p className="text-muted-foreground text-lg">
        Connect with other attendees, share knowledge, and join the conversation.
      </p>
    </div>;
};