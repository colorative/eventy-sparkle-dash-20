import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Calendar, UserPlus, Search, Blocks, UserCheck, UserX, Clock, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BoringAvatar from "boring-avatars";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const InboxContent: React.FC = () => {
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBlockModal, setShowBlockModal] = useState(false);
  
  const [conversations] = useState([
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
    {
      id: 5,
      contact: {
        name: "Alex Williams",
        company: "Future Systems",
        role: "Product Manager"
      },
      messages: [
        { id: 1, sender: 'them', text: 'I would like to feature your company in our next tech spotlight.', time: '2 days ago' },
        { id: 2, sender: 'you', text: 'That sounds great! What information would you need from us?', time: '2 days ago' },
      ],
      unread: false,
      lastActive: '2 days ago',
      type: 'active',
      isBlocked: true
    },
  ]);

  const [notifications] = useState([
    { id: 1, title: 'New meeting request', message: 'John Smith wants to schedule a meeting with you', time: '10 min ago', type: 'meeting', read: false },
    { id: 2, title: 'Presentation reminder', message: 'Your presentation "AI in Event Management" starts in 1 hour', time: '35 min ago', type: 'reminder', read: false },
    { id: 3, title: 'New connection', message: 'Maria Garcia has added you as a connection', time: '2 hours ago', type: 'connection', read: true },
    { id: 4, title: 'Booth visitor', message: 'You have 5 new visitors to your booth today', time: 'Yesterday', type: 'visitor', read: true },
    { id: 5, title: 'AI Summit update', message: 'The schedule for tomorrow has been updated', time: 'Yesterday', type: 'update', read: true },
  ]);

  const [activeConversation, setActiveConversation] = useState(conversations[0]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleBlockToggle = () => {
    setShowBlockModal(true);
  };

  const confirmBlockToggle = () => {
    console.log(`${activeConversation.isBlocked ? 'Unblocking' : 'Blocking'} ${activeConversation.contact.name}`);
    setShowBlockModal(false);
  };

  const handleAcceptRequest = () => {
    console.log(`Accepting connection request from ${activeConversation.contact.name}`);
  };

  const handleDenyRequest = () => {
    console.log(`Denying connection request from ${activeConversation.contact.name}`);
  };

  const renderEmptyState = () => {
    if (activeConversation.type === 'invitation_sent') {
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Invitation Sent
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your connection request has been sent to {activeConversation.contact.name}. 
              You'll be able to start messaging once they accept your invitation.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Sent {activeConversation.lastActive}
            </p>
          </div>
        </div>
      );
    }

    if (activeConversation.type === 'incoming_request') {
      return (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Connection Request
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {activeConversation.contact.name} wants to connect with you. 
              Accept their request to start messaging.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={handleAcceptRequest} className="gap-2">
                <UserCheck className="h-4 w-4" />
                Accept
              </Button>
              <Button variant="outline" onClick={handleDenyRequest} className="gap-2">
                <UserX className="h-4 w-4" />
                Decline
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
              Received {activeConversation.lastActive}
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  const getConversationPreview = (conversation: any) => {
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

  return (
    <>
      <div className="bg-white dark:bg-gray-900 flex min-w-60 flex-col overflow-auto items-stretch justify-start flex-1 shrink basis-[0%] p-6 max-md:max-w-full">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Inbox</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-220px)]">
          <div className="border rounded-lg overflow-hidden">
            <div className="p-3 border-b bg-gray-50 dark:bg-gray-800">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  className="pl-8 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-auto h-[calc(100%-97px)]">
              {conversations.map((convo) => (
                <div 
                  key={convo.id} 
                  className={`p-2.5 border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${activeConversation.id === convo.id ? 'bg-gray-50 dark:bg-gray-800' : ''} ${convo.isBlocked ? 'opacity-50' : ''}`}
                  onClick={() => setActiveConversation(convo)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm truncate">{convo.contact.name}</h4>
                          {convo.isBlocked && <Blocks className="h-3 w-3 text-red-500" />}
                          {convo.type === 'invitation_sent' && <Clock className="h-3 w-3 text-blue-500" />}
                          {convo.type === 'incoming_request' && <Mail className="h-3 w-3 text-green-500" />}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">{convo.lastActive}</span>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{convo.contact.company} • {convo.contact.role}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {getConversationPreview(convo)}
                      </p>
                    </div>
                    {convo.unread && convo.type !== 'invitation_sent' && (
                      <Badge className="bg-blue-500 h-2 w-2 rounded-full p-0 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 border rounded-lg flex flex-col">
            <div className="p-3 border-b bg-gray-50 dark:bg-gray-800 flex items-center gap-3">
              <div className="h-8 w-8">
                <BoringAvatar
                  size={32}
                  name={activeConversation.contact.name}
                  variant="marble"
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{activeConversation.contact.name}</h3>
                <p className="text-xs text-gray-500">{activeConversation.contact.company} • {activeConversation.contact.role}</p>
              </div>
              {activeConversation.type === 'active' && (
                <>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Calendar className="h-4 w-4" />
                    Schedule Meeting
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="gap-1"
                    onClick={handleBlockToggle}
                  >
                    <Blocks className="h-4 w-4" />
                    {activeConversation.isBlocked ? 'Unblock' : 'Block'}
                  </Button>
                </>
              )}
            </div>
            
            {activeConversation.type === 'active' && !activeConversation.isBlocked ? (
              <>
                <div className="p-4 flex-1 overflow-auto">
                  {activeConversation.messages.map(msg => (
                    <div key={msg.id} className={`mb-4 flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${msg.sender === 'you' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700'} rounded-lg px-3 py-2`}>
                        <p className="text-sm">{msg.text}</p>
                        <span className="text-xs opacity-70 block text-right mt-1">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 border-t mt-auto">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type a message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button size="icon" onClick={handleSendMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : activeConversation.isBlocked ? (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Blocks className="h-8 w-8 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    User Blocked
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    You have blocked {activeConversation.contact.name}. 
                    Unblock them to resume messaging.
                  </p>
                  <Button onClick={handleBlockToggle} variant="outline">
                    Unblock User
                  </Button>
                </div>
              </div>
            ) : (
              renderEmptyState()
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={showBlockModal} onOpenChange={setShowBlockModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {activeConversation.isBlocked ? 'Unblock User' : 'Block User'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {activeConversation.isBlocked 
                ? `Are you sure you want to unblock ${activeConversation.contact.name}? They will be able to send you messages again.`
                : `Are you sure you want to block ${activeConversation.contact.name}? They won't be able to send you messages, and you won't receive any notifications from them.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBlockToggle}>
              {activeConversation.isBlocked ? 'Unblock' : 'Block'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
