
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CheckCheck, Clock } from "lucide-react";
import BoringAvatar from "boring-avatars";

export const NotificationsContent = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "connection",
      user: {
        name: "Emily Johnson",
        avatar: null,
        company: "TechCorp"
      },
      action: "accepted your connection request",
      time: "2 minutes ago",
      read: false
    },
    {
      id: 2,
      type: "meeting",
      user: {
        name: "Michael Chen",
        avatar: null,
        company: "Innovatech"
      },
      action: "scheduled a meeting with you",
      time: "1 hour ago",
      read: false,
      details: {
        time: "Tomorrow, 10:00 AM",
        location: "Meeting Room 3"
      }
    },
    {
      id: 3,
      type: "message",
      user: {
        name: "Sarah Williams",
        avatar: null,
        company: "Global Systems"
      },
      action: "sent you a message",
      time: "3 hours ago",
      read: true,
      details: {
        preview: "I'd like to discuss potential collaboration opportunities..."
      }
    },
    {
      id: 4,
      type: "system",
      title: "Schedule Update",
      action: "Your session 'AI in Manufacturing' has been rescheduled",
      time: "5 hours ago",
      read: true,
      details: {
        oldTime: "June 15, 2:00 PM",
        newTime: "June 15, 4:00 PM"
      }
    },
    {
      id: 5,
      type: "interested",
      user: {
        name: "Robert Davis",
        avatar: null,
        company: "DataVision"
      },
      action: "showed interest in your company",
      time: "Yesterday",
      read: true
    },
    {
      id: 6,
      type: "connection",
      user: {
        name: "Lisa Thompson",
        avatar: null,
        company: "FutureTech"
      },
      action: "sent you a connection request",
      time: "Yesterday",
      read: true
    },
    {
      id: 7,
      type: "system",
      title: "New Exhibitor",
      action: "A new exhibitor matching your interests has joined the event",
      time: "2 days ago",
      read: true,
      details: {
        exhibitor: "CloudSolutions Inc."
      }
    },
    {
      id: 8,
      type: "message",
      user: {
        name: "James Wilson",
        avatar: null,
        company: "TechInnovators"
      },
      action: "mentioned you in a comment",
      time: "3 days ago",
      read: true,
      details: {
        preview: "I think @YourName would be the perfect person to discuss this with."
      }
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const getFilteredNotifications = () => {
    switch (activeTab) {
      case "unread":
        return notifications.filter(notification => !notification.read);
      case "connections":
        return notifications.filter(notification => notification.type === "connection");
      case "meetings":
        return notifications.filter(notification => notification.type === "meeting");
      case "messages":
        return notifications.filter(notification => notification.type === "message");
      case "system":
        return notifications.filter(notification => notification.type === "system");
      default:
        return notifications;
    }
  };

  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="container p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead} className="gap-2">
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">
              All
              <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-gray-100 text-gray-700">
                {notifications.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value={activeTab} className="space-y-4 mt-2">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Bell className="h-6 w-6 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">No notifications</h3>
              <p className="text-gray-500 mt-1">
                {activeTab === "unread" 
                  ? "You're all caught up! No unread notifications." 
                  : `You don't have any ${activeTab} notifications yet.`}
              </p>
            </div>
          ) : (
            <>
              {filteredNotifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`border-l-4 ${notification.read ? 'border-l-transparent' : 'border-l-blue-500'}`}
                >
                  <CardContent className="p-4 flex gap-4">
                    {notification.type === "system" ? (
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Bell className="h-5 w-5 text-blue-600" />
                      </div>
                    ) : (
                      <BoringAvatar
                        size={40}
                        name={notification.user.name}
                        variant="beam"
                        colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                      />
                    )}
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          {notification.type === "system" ? (
                            <h3 className="font-medium">{notification.title}</h3>
                          ) : (
                            <h3 className="font-medium">
                              {notification.user.name} 
                              <span className="text-gray-500 font-normal ml-1">
                                {notification.user.company && `(${notification.user.company})`}
                              </span>
                            </h3>
                          )}
                          <p className="text-gray-600 mt-1">
                            {notification.action}
                          </p>
                          
                          {notification.details && (
                            <div className="mt-2 bg-gray-50 p-2 rounded text-sm">
                              {notification.type === "meeting" && (
                                <div className="flex items-center text-gray-700">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{notification.details.time}</span>
                                </div>
                              )}
                              {notification.type === "message" && (
                                <p className="text-gray-700 italic">"{notification.details.preview}"</p>
                              )}
                              {notification.type === "system" && notification.details.newTime && (
                                <div className="text-gray-700">
                                  <p className="line-through">{notification.details.oldTime}</p>
                                  <p className="font-medium">{notification.details.newTime}</p>
                                </div>
                              )}
                              {notification.type === "system" && notification.details.exhibitor && (
                                <p className="text-gray-700 font-medium">{notification.details.exhibitor}</p>
                              )}
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        {notification.type === "connection" && !notification.action.includes("accepted") && (
                          <>
                            <Button size="sm">Accept</Button>
                            <Button variant="outline" size="sm">Decline</Button>
                          </>
                        )}
                        {notification.type === "meeting" && (
                          <>
                            <Button size="sm">View Details</Button>
                            <Button variant="outline" size="sm">Reschedule</Button>
                          </>
                        )}
                        {notification.type === "message" && (
                          <Button size="sm">Reply</Button>
                        )}
                        {notification.type === "interested" && (
                          <Button size="sm">View Profile</Button>
                        )}
                        {notification.type === "system" && notification.details && notification.details.exhibitor && (
                          <Button size="sm">View Exhibitor</Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
