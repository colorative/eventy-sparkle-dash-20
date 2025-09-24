
import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, Loader } from "lucide-react";

interface ChatHeaderProps {
  toggleOlderMessages: () => void;
  showOlderMessages: boolean;
  isLoading: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  toggleOlderMessages, 
  showOlderMessages,
  isLoading
}) => {
  return (
    <CardHeader className="px-6 py-4 border-b">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-lg flex items-center gap-2">
            Event Support Chat
            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
          </CardTitle>
          <CardDescription className="flex items-center mt-1">
            <span>Available</span>
          </CardDescription>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleOlderMessages}
          className="text-xs flex items-center gap-1"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <ChevronUp className="h-3.5 w-3.5" />
          )}
          {showOlderMessages ? "Hide Older Messages" : "Load Older Messages"}
        </Button>
      </div>
    </CardHeader>
  );
};
