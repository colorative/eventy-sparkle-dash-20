
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send } from "lucide-react";

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleAttachmentClick: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragLeave: () => void;
  handleDrop: (e: React.DragEvent) => void;
  isDragging: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  isMobile: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  message,
  setMessage,
  handleSubmit,
  handleAttachmentClick,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  isDragging,
  fileInputRef,
  isMobile
}) => {
  return (
    <div 
      className={`border-t border-slate-200 p-3 ${
        isDragging ? "bg-blue-50 border-blue-200 border-dashed" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            multiple
          />
          
          <Textarea
            className="w-full border border-slate-300 rounded-md pl-9 pr-4 py-2 min-h-[42px] max-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={isDragging ? "Drop files here to upload..." : "Type your message..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={isMobile ? 1 : 1}
          />
          
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-50 bg-opacity-90 pointer-events-none rounded-md z-10">
              <p className="text-blue-500 text-sm font-medium">Drop files here to upload</p>
            </div>
          )}
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute bottom-1 left-1 p-1.5 h-auto"
            onClick={handleAttachmentClick}
          >
            <Paperclip className="h-4 w-4 text-slate-500" />
          </Button>
        </div>
        
        <Button type="submit" className="rounded-full h-9 w-9 p-0 flex items-center justify-center">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

// This is needed because the file is used in the component but passed from parent
const handleFileUpload = (files: FileList) => {
  // This function is just a placeholder
  // The actual implementation is in the parent component
};
