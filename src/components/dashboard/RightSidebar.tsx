import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";
import { ConversationList } from "@/components/inbox/ConversationList";
import { FloatingChatWindow } from "@/components/inbox/FloatingChatWindow";
import { TaskListSidebar } from "./TaskListSidebar";

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

interface OpenChat {
  conversation: Conversation;
  isMinimized: boolean;
}

export const RightSidebar: React.FC = () => {
  const location = useLocation();
  const sidebarContext = useSidebar();
  
  // Sample tasks data - in real app this would come from props or context
  const sampleTasks = [
    {
      id: "task-5",
      label: "Sign Exhibitor Agreement",
      completed: false,
      dueDate: "Dec 15, 2024",
      type: "agreement" as const,
      assignedTo: [{ id: "1", name: "Sarah Connor" }]
    },
    {
      id: "task-6",
      label: "Upload Booth Graphics",
      completed: false,
      dueDate: "Dec 20, 2024",
      type: "upload" as const,
      assignedTo: [{ id: "1", name: "Sarah Connor" }, { id: "3", name: "Alex Kim" }]
    },
    {
      id: "task-10",
      label: "Submit Company Logo",
      completed: true,
      dueDate: "Dec 10, 2024",
      type: "upload" as const,
      assignedTo: [{ id: "1", name: "Sarah Connor" }]
    },
    {
      id: "task-12",
      label: "Prepare Marketing Materials",
      completed: false,
      dueDate: "Dec 25, 2024",
      type: "upload" as const,
      assignedTo: [{ id: "2", name: "John Doe" }]
    },
    {
      id: "task-1",
      label: "Complete Your Profile",
      completed: true,
      dueDate: "Dec 8, 2024",
      type: "redirect" as const,
      redirectUrl: "/profile"
    }
  ];

  const handleToggleTask = (taskId: string) => {
    console.log('Toggling task:', taskId);
  };
  
  const [conversations] = useState<Conversation[]>([
    {
      id: 1,
      contact: {
        name: "John Smith",
        company: "AI Innovations",
        role: "CEO"
      },
      messages: [
        { id: 1, sender: 'them', text: 'Hello, I wanted to discuss potential collaboration opportunities.', time: '10:23 AM' },
        { id: 2, sender: 'you', text: 'Hi John, I would be happy to discuss. What specific areas are you interested in?', time: '10:45 AM' },
        { id: 3, sender: 'them', text: 'We are developing new AI tools for event management and thought your platform might be a good fit.', time: '11:02 AM' },
        { id: 4, sender: 'you', text: 'That sounds promising. Would you like to schedule a meeting during the summit?', time: '11:15 AM' },
      ],
      unread: false,
      lastActive: '11:15 AM',
      type: 'active',
      isBlocked: false
    },
    {
      id: 2,
      contact: {
        name: "Maria Garcia",
        company: "TechCorp Global",
        role: "CTO"
      },
      messages: [
        { id: 1, sender: 'them', text: 'I saw your presentation yesterday. Very impressive work!', time: '9:30 AM' },
        { id: 2, sender: 'you', text: 'Thank you, Maria! I appreciate you taking the time to attend.', time: '9:45 AM' },
        { id: 3, sender: 'them', text: 'Would you be interested in being a guest speaker at our next quarterly meeting?', time: '10:15 AM' },
      ],
      unread: true,
      lastActive: '10:15 AM',
      type: 'active',
      isBlocked: false
    },
    {
      id: 3,
      contact: {
        name: "Robert Chen",
        company: "DataSync Solutions",
        role: "Lead Developer"
      },
      messages: [],
      unread: false,
      lastActive: '2 hours ago',
      type: 'invitation_sent',
      isBlocked: false
    },
    {
      id: 4,
      contact: {
        name: "Sarah Johnson",
        company: "InnovateTech",
        role: "Marketing Director"
      },
      messages: [],
      unread: true,
      lastActive: '1 hour ago',
      type: 'incoming_request',
      isBlocked: false
    },
  ]);

  const [openChats, setOpenChats] = useState<OpenChat[]>([]);

  const handleConversationClick = (conversation: Conversation) => {
    // Check if chat is already open
    const existingChat = openChats.find(chat => chat.conversation.id === conversation.id);
    
    if (existingChat) {
      // If minimized, restore it
      if (existingChat.isMinimized) {
        setOpenChats(openChats.map(chat => 
          chat.conversation.id === conversation.id 
            ? { ...chat, isMinimized: false }
            : chat
        ));
      }
      return;
    }

    // Only allow active conversations with messages to be opened
    if (conversation.type === 'active' && !conversation.isBlocked) {
      const newChat: OpenChat = {
        conversation,
        isMinimized: false
      };
      setOpenChats([...openChats, newChat]);
    }
  };

  const handleCloseChat = (conversationId: number) => {
    setOpenChats(openChats.filter(chat => chat.conversation.id !== conversationId));
  };

  const handleMinimizeChat = (conversationId: number) => {
    setOpenChats(openChats.map(chat => 
      chat.conversation.id === conversationId 
        ? { ...chat, isMinimized: !chat.isMinimized }
        : chat
    ));
  };

  // Hide the sidebar on specific pages
  const hideSidebarPages = ["/inbox", "/floorplan", "/gamification", "/calendar", "/leads"];
  
  // If we're on a page where we should hide the sidebar, return null
  if (hideSidebarPages.includes(location.pathname)) {
    return null;
  }

  // Hide sidebar on agenda page for screens under 1440px (2xl breakpoint)
  const sidebarClassName = location.pathname === "/agenda" 
    ? "hidden 2xl:flex min-w-80 items-stretch gap-2 text-sm font-medium tracking-[-0.08px] leading-none h-full w-[324px] p-2"
    : "flex min-w-80 items-stretch gap-2 text-sm font-medium tracking-[-0.08px] leading-none h-full w-[324px] p-2";

  return (
    <>
      <div className={sidebarClassName}>
        {location.pathname === "/" ? (
          <TaskListSidebar 
            tasks={sampleTasks}
            onToggleTask={handleToggleTask}
          />
        ) : (
          <div className="bg-white min-w-80 w-[308px] overflow-hidden rounded-lg h-full">
            <div className="w-full h-full flex flex-col">
              <div className="w-full flex-1">
                <div className="flex w-full flex-col items-stretch justify-center p-2 h-full">
                  <div className="w-full h-full flex flex-col">
                    <div className="p-3 border-b bg-muted/30">
                      <h3 className="font-medium text-sm">Inbox</h3>
                    </div>
                    <div className="flex-1 p-2 overflow-hidden">
                      <ConversationList 
                        conversations={conversations}
                        onConversationClick={handleConversationClick}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Chat Windows */}
      {openChats.map((chat, index) => (
        <FloatingChatWindow
          key={chat.conversation.id}
          conversation={chat.conversation}
          onClose={() => handleCloseChat(chat.conversation.id)}
          onMinimize={() => handleMinimizeChat(chat.conversation.id)}
          isMinimized={chat.isMinimized}
          position={index}
        />
      ))}
    </>
  );
};