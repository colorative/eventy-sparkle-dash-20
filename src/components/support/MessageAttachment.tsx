
import React from "react";
import { FileText, Image, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Attachment {
  id: string;
  type: "image" | "video" | "document";
  name: string;
  url: string;
}

interface MessageAttachmentProps {
  attachment: Attachment;
}

export const MessageAttachment: React.FC<MessageAttachmentProps> = ({ attachment }) => {
  switch (attachment.type) {
    case "image":
      return (
        <div className="rounded-md overflow-hidden border border-slate-200 max-w-[200px] w-full">
          <div className="h-[120px] overflow-hidden">
            <img src={attachment.url} alt={attachment.name} className="object-cover w-full h-full" />
          </div>
          <div className="bg-slate-50 p-1.5 text-xs flex items-center">
            <Image className="h-3 w-3 mr-1.5 text-blue-500" />
            <span className="truncate max-w-[150px]">{attachment.name}</span>
          </div>
        </div>
      );
    case "video":
      return (
        <div className="rounded-md overflow-hidden border border-slate-200 max-w-[200px] w-full">
          <div className="bg-slate-100 h-[120px] w-full flex items-center justify-center relative">
            <Button variant="secondary" size="sm" className="rounded-full p-1.5 absolute">
              <Play className="h-3 w-3" />
            </Button>
          </div>
          <div className="bg-slate-50 p-1.5 text-xs flex items-center">
            <Play className="h-3 w-3 mr-1.5 text-blue-500" />
            <span className="truncate max-w-[150px]">{attachment.name}</span>
          </div>
        </div>
      );
    case "document":
      return (
        <div className="rounded-md overflow-hidden border border-slate-200 flex items-center max-w-[200px] w-full">
          <div className="bg-slate-100 p-2">
            <FileText className="h-6 w-6 text-blue-500" />
          </div>
          <div className="p-2 text-xs flex-1">
            <span className="truncate max-w-[150px] block">{attachment.name}</span>
          </div>
        </div>
      );
    default:
      return null;
  }
};
