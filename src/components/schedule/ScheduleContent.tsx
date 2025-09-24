
import React, { useState } from "react";
import { Calendar, Clock, Users, MapPin, Bookmark, Star, Edit, FileUp, X, ChevronDown, Plus, Paperclip } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const ScheduleContent: React.FC = () => {
  const [view, setView] = useState("list");
  const [isEditingSponsoredSessions, setIsEditingSponsoredSessions] = useState(false);
  
  const scheduleItems = [
    {
      id: 1,
      title: "Keynote: Future of Tech",
      type: "session",
      time: "9:00 AM - 10:30 AM",
      date: "Monday, June 10",
      location: "Main Hall A",
      speaker: "Sarah Johnson",
      company: "TechVision Inc.",
      conflict: false,
    },
    {
      id: 2,
      title: "Meeting with GlobalTech CEO",
      type: "meeting",
      time: "11:00 AM - 11:30 AM",
      date: "Monday, June 10",
      location: "Meeting Room 3",
      attendees: ["John Smith", "You"],
      conflict: false,
    },
    {
      id: 3,
      title: "Networking Lunch",
      type: "break",
      time: "12:00 PM - 1:30 PM",
      date: "Monday, June 10",
      location: "Dining Hall",
      conflict: false,
    },
    {
      id: 4,
      title: "Workshop: AI Implementation",
      type: "session",
      time: "2:00 PM - 4:00 PM",
      date: "Monday, June 10",
      location: "Workshop Room B",
      speaker: "Michael Chen",
      company: "AI Solutions",
      conflict: false,
    },
    {
      id: 5,
      title: "Meeting with InnovateTech",
      type: "meeting",
      time: "2:00 PM - 2:30 PM",
      date: "Monday, June 10",
      location: "Meeting Room 5",
      attendees: ["Lisa Wong", "You"],
      conflict: true,
    },
  ];
  
  // New sponsored sessions by Eventify with additional fields
  const sponsoredSessions = [
    {
      id: 101,
      title: "AI in Event Management",
      type: "sponsored",
      time: "11:00 AM - 12:00 PM",
      date: "Monday, June 10",
      location: "Innovation Theater",
      speaker: "Alex Morgan",
      company: "Eventify",
      conflict: false,
      attachments: ["presentation.pdf", "research-data.xlsx"],
    },
    {
      id: 102,
      title: "Future of Virtual Events",
      type: "sponsored",
      time: "3:30 PM - 4:30 PM",
      date: "Monday, June 10",
      location: "Tech Pavilion",
      speaker: "Jamie Williams",
      company: "Eventify",
      conflict: false,
      attachments: ["whitepaper.pdf"],
    },
    {
      id: 103,
      title: "Networking Strategies for Exhibitors",
      type: "sponsored",
      time: "10:00 AM - 11:00 AM",
      date: "Tuesday, June 11",
      location: "Business Lounge",
      speaker: "Taylor Reed",
      company: "Eventify",
      conflict: false,
      attachments: [],
    },
  ];

  const getTypeColor = (type) => {
    switch(type) {
      case "meeting": return "bg-blue-100 text-blue-800";
      case "session": return "bg-purple-100 text-purple-800";
      case "break": return "bg-green-100 text-green-800";
      case "sponsored": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddAttachment = (sessionId) => {
    // This would trigger file upload in a real app
    alert(`File upload dialog would open for session ${sessionId}`);
  };

  return (
    <div className="bg-white flex min-w-60 flex-col overflow-hidden items-stretch flex-1 shrink basis-[0%] p-6 max-md:max-w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Schedule</h1>
          <p className="text-gray-500">Manage your personalized event schedule</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="monday">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monday">Monday, June 10</SelectItem>
              <SelectItem value="tuesday">Tuesday, June 11</SelectItem>
              <SelectItem value="wednesday">Wednesday, June 12</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => setView("calendar")} className={view === "calendar" ? "bg-slate-100" : ""}>
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setView("list")} className={view === "list" ? "bg-slate-100" : ""}>
            <Clock className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Sponsored Sessions Section - Moved to top */}
      <Card className="mb-6 border-purple-200 bg-purple-50/30 dark:bg-purple-950/20 dark:border-purple-800">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-purple-800 dark:text-purple-300">Powered by Eventify</h2>
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            </div>
            <CardDescription className="text-purple-600 dark:text-purple-400">
              Featured sessions from our sponsors
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-purple-300 text-purple-700 hover:bg-purple-100 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/50"
              onClick={() => setIsEditingSponsoredSessions(!isEditingSponsoredSessions)}
            >
              {isEditingSponsoredSessions ? (
                <>
                  <X className="h-4 w-4 mr-1" />
                  Done
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Sessions
                </>
              )}
            </Button>
            {isEditingSponsoredSessions && (
              <Button 
                size="sm" 
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Session
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            {sponsoredSessions.map((session) => (
              <div key={session.id} className="flex bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-800 rounded-lg hover:shadow-sm transition-all p-0 overflow-hidden">
                <div className="w-2 bg-purple-400 dark:bg-purple-600"></div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex gap-2 items-center mb-1">
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700">
                          Sponsored
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <Clock className="h-3 w-3 mr-1 inline" />
                          {session.time}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <MapPin className="h-3 w-3 mr-1 inline" />
                          {session.location}
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{session.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {session.speaker}, {session.company}
                      </p>
                      
                      {/* Attachments section - only visible in edit mode or if has attachments */}
                      {(isEditingSponsoredSessions || session.attachments.length > 0) && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <Paperclip className="h-3 w-3 text-gray-500" />
                            <span className="text-xs text-gray-500">Attachments</span>
                          </div>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {session.attachments.map((file, index) => (
                              <Badge 
                                key={index} 
                                variant="outline" 
                                className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center gap-1"
                              >
                                {file}
                                {isEditingSponsoredSessions && (
                                  <X className="h-3 w-3 ml-1 cursor-pointer" />
                                )}
                              </Badge>
                            ))}
                            {isEditingSponsoredSessions && (
                              <Badge 
                                variant="outline" 
                                className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/50 cursor-pointer"
                                onClick={() => handleAddAttachment(session.id)}
                              >
                                <Plus className="h-3 w-3 mr-1" />
                                Add File
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {isEditingSponsoredSessions ? (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/50"
                        >
                          Add to Schedule
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="conflicts">Conflicts</TabsTrigger>
        </TabsList>
      </Tabs>

      <ScrollArea className="flex-1">
        {view === "list" ? (
          <div className="space-y-4">
            {scheduleItems.map((item) => (
              <Card key={item.id} className={`${item.conflict ? 'border-red-300' : ''}`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className={getTypeColor(item.type)} variant="outline">
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
                      <CardTitle className="mt-2">{item.title}</CardTitle>
                      {item.speaker && <CardDescription>{item.speaker}, {item.company}</CardDescription>}
                    </div>
                    <Button variant="ghost" size="icon">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{item.location}</span>
                  </div>
                  {item.attendees && (
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{item.attendees.join(", ")}</span>
                    </div>
                  )}
                  {item.conflict && (
                    <div className="mt-2">
                      <Badge variant="destructive">Time Conflict</Badge>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end pt-0">
                  <Button variant="outline" size="sm" className="mr-2">Reschedule</Button>
                  <Button variant="ghost" size="sm" className="text-red-500">Remove</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 rounded-lg p-4 h-[500px] flex items-center justify-center">
            <p className="text-slate-500">Calendar view with drag-and-drop rescheduling would be implemented here</p>
          </div>
        )}
      </ScrollArea>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Sync with External Calendar</h3>
            <p className="text-sm text-gray-500">Keep your events in sync</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Google Calendar
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Outlook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
