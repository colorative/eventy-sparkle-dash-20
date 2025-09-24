
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { MessageBubble, Message } from "./MessageBubble";
import { Attachment } from "./MessageAttachment";

export const SupportChat: React.FC = () => {
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showPreviousChat, setShowPreviousChat] = useState(false);
  const [showOlderMessages, setShowOlderMessages] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  
  // Extended sample chat history with more messages
  const olderMessages: Message[] = [
    {
      id: "older1",
      sender: "you",
      content: "When does registration for the morning workshops open?",
      timestamp: "May 25, 2025 | 9:12 AM"
    },
    {
      id: "older2",
      sender: "host",
      content: "Registration for morning workshops opens at 8:00 AM each day. You can check in at the main registration desk in the East Hall.",
      timestamp: "May 25, 2025 | 9:18 AM"
    },
    {
      id: "older3",
      sender: "you",
      content: "Is there any way to register online before arriving?",
      timestamp: "May 25, 2025 | 9:20 AM"
    },
    {
      id: "older4",
      sender: "host",
      content: "Yes! You can pre-register for workshops through our mobile app. Just tap on 'Workshops' and select the ones you want to attend. You'll still need to check in at the desk to get your badge though.",
      timestamp: "May 25, 2025 | 9:24 AM"
    },
    {
      id: "older5",
      sender: "you",
      content: "Perfect, thank you. One more question - are there any restrictions on how many workshops I can sign up for?",
      timestamp: "May 25, 2025 | 9:26 AM"
    },
    {
      id: "older6",
      sender: "host",
      content: "There's no limit on the number of workshops, but make sure they don't overlap in time. Premium ticket holders get priority for limited-capacity sessions.",
      timestamp: "May 25, 2025 | 9:28 AM"
    },
  ];

  const previousChat: Message[] = [
    {
      id: "prev1",
      sender: "you",
      content: "How do I find the attendee list for the AI Summit?",
      timestamp: "May 28, 2025 | 2:14 PM"
    },
    {
      id: "prev2",
      sender: "host",
      content: "You can access the attendee list from the main dashboard. Click on 'Attendees' in the left sidebar menu.",
      timestamp: "May 28, 2025 | 2:18 PM"
    },
    {
      id: "prev3",
      sender: "you",
      content: "Perfect, thank you! Will there be a way to export this list?",
      timestamp: "May 28, 2025 | 2:20 PM"
    },
    {
      id: "prev4",
      sender: "host",
      content: "Yes, there's an export button at the top of the attendee list. You can choose between CSV and Excel formats.",
      timestamp: "May 28, 2025 | 2:23 PM"
    },
  ];

  const currentChat: Message[] = [
    {
      id: "1",
      sender: "you",
      content: "Hi, we're having trouble uploading our booth banner. Can you help?",
      timestamp: "June 3, 2025 | 10:22 AM"
    },
    {
      id: "2",
      sender: "host",
      content: "Hi! Sure, can you please share the file you're trying to upload?",
      timestamp: "June 3, 2025 | 10:30 AM"
    },
    {
      id: "3",
      sender: "you",
      content: "",
      timestamp: "June 3, 2025 | 10:31 AM",
      attachments: [
        {
          id: "a1",
          type: "image",
          name: "booth-banner.png",
          url: "/placeholder.svg"
        }
      ]
    },
    {
      id: "4",
      sender: "host",
      content: "Got it! It looks like the dimensions are off. Try this template:",
      timestamp: "June 3, 2025 | 10:34 AM",
      attachments: [
        {
          id: "a2",
          type: "document",
          name: "booth-template.pdf",
          url: "#"
        }
      ]
    },
    {
      id: "5",
      sender: "you",
      content: "Thanks! Also, here's a short clip of the issue we're seeing on the mobile version.",
      timestamp: "June 3, 2025 | 10:40 AM",
      attachments: [
        {
          id: "a3",
          type: "video",
          name: "issue-demo.mp4",
          url: "#"
        }
      ]
    },
    {
      id: "6",
      sender: "host",
      content: "Thanks for the clip. We'll get this sorted shortly!",
      timestamp: "June 3, 2025 | 10:45 AM",
    },
    {
      id: "7",
      sender: "you",
      content: "Great! When do you think this will be resolved?",
      timestamp: "June 3, 2025 | 11:02 AM",
    },
    {
      id: "8",
      sender: "host",
      content: "Our technical team is working on it now. We should have a solution for you within the next 2 hours.",
      timestamp: "June 3, 2025 | 11:05 AM",
    },
    {
      id: "9",
      sender: "host",
      content: "Update: The issue has been identified. It's related to the image resolution being too high for our mobile interface. We're implementing a fix now.",
      timestamp: "June 3, 2025 | 11:38 AM",
    }
  ];

  // Combine messages based on visibility settings
  const [messages, setMessages] = useState<Message[]>([
    ...(showOlderMessages ? olderMessages : []),
    ...(showPreviousChat ? previousChat : []),
    ...currentChat
  ]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Update messages when visibility settings change
    setMessages([
      ...(showOlderMessages ? olderMessages : []),
      ...(showPreviousChat ? previousChat : []),
      ...currentChat
    ]);
  }, [showOlderMessages, showPreviousChat]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "you",
        content: message,
        timestamp: new Date().toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      };
      
      setMessages([...messages, newMessage]);
      setMessage("");
      
      // Simulate host response
      setTimeout(() => {
        const hostResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: "host",
          content: "Thanks for your message. Our support team will get back to you soon.",
          timestamp: new Date().toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          })
        };
        
        setMessages(prev => [...prev, hostResponse]);
      }, 1500);
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    // Process uploaded files
    Array.from(files).forEach(file => {
      const fileType = file.type.split('/')[0];
      let attachmentType: "image" | "video" | "document" = "document";
      
      if (fileType === "image") attachmentType = "image";
      else if (fileType === "video") attachmentType = "video";
      
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "you",
        content: "",
        timestamp: new Date().toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        attachments: [
          {
            id: `file-${Date.now()}`,
            type: attachmentType,
            name: file.name,
            url: URL.createObjectURL(file)
          }
        ]
      };
      
      setMessages([...messages, newMessage]);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded.`,
      });
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const togglePreviousChat = () => {
    setShowPreviousChat(!showPreviousChat);
  };

  const toggleOlderMessages = () => {
    setIsLoading(true);
    
    // Simulate loading older messages
    setTimeout(() => {
      setShowOlderMessages(!showOlderMessages);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <ChatHeader 
        toggleOlderMessages={toggleOlderMessages}
        showOlderMessages={showOlderMessages}
        isLoading={isLoading}
      />
      
      <CardContent className="flex flex-col h-full p-0 overflow-hidden">
        {/* Chat messages in a scrollable area */}
        <ScrollArea className="flex-1 p-4 overflow-y-auto">
          {showPreviousChat && (
            <div className="mb-4 flex justify-center">
              <button 
                className="text-xs text-muted-foreground hover:underline"
                onClick={togglePreviousChat}
              >
                Hide Previous Chat
              </button>
            </div>
          )}
          
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          
          <div ref={messagesEndRef} />
        </ScrollArea>
        
        {/* Message input area - fixed at bottom */}
        <ChatInput
          message={message}
          setMessage={setMessage}
          handleSubmit={handleSubmit}
          handleAttachmentClick={handleAttachmentClick}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleDrop={handleDrop}
          isDragging={isDragging}
          fileInputRef={fileInputRef}
          isMobile={isMobile}
        />
      </CardContent>
    </Card>
  );
};
