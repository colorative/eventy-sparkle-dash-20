
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Mail, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ActionButtonsProps {
  attendeeName: string;
  roles: string[];
  isBookmarked: boolean;
  toggleBookmark: () => void;
  sendMessage: () => void;
  scheduleMeeting: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  attendeeName,
  roles,
  isBookmarked,
  toggleBookmark,
  sendMessage,
  scheduleMeeting,
}) => {
  return (
    <>
      {/* Role badges */}
      <div className="flex justify-start mb-8 ml-8 mt-16">
        <div className="flex gap-2">
          {roles.map((role, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 px-3 py-1">
              {role}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex justify-start gap-4 mb-8 ml-8">
        <Button onClick={sendMessage} className="gap-2">
          <Mail className="h-4 w-4" />
          Send Message
        </Button>
        <Button 
          variant={isBookmarked ? "outline" : "default"} 
          onClick={toggleBookmark} 
          className="gap-2"
        >
          <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
        <Button onClick={scheduleMeeting} variant="secondary" className="gap-2">
          <Calendar className="h-4 w-4" />
          Let's Meet
        </Button>
      </div>
    </>
  );
};
