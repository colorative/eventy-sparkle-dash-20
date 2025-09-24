import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, MapPin, MoreHorizontal, Calendar as CalendarIcon, X, Check, Clock3, Building, Users, ChevronLeft, ChevronRight, Settings, Filter } from "lucide-react";
import BoringAvatar from "boring-avatars";
import { useSidebar } from "@/components/ui/sidebar";
import { format, addDays, startOfToday } from "date-fns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { PublicMeetingsContent } from "./PublicMeetingsContent";
import { SettingsModal } from "./SettingsModal";
import { TimeSlotModal } from "./TimeSlotModal";
export const MeetingsContent = () => {
  const navigate = useNavigate();
  const {
    state
  } = useSidebar();
  const [activeTab, setActiveTab] = useState("private");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [timeSlotModalOpen, setTimeSlotModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);

  // Generate 30 days starting from today to show a full month
  const weekDays = Array.from({
    length: 30
  }, (_, i) => addDays(startOfToday(), i));
  const pendingMeetings = [{
    id: 1,
    title: "Partnership Discussion",
    requestedBy: {
      name: "Sarah Johnson",
      company: "TechCorp",
      avatar: null
    },
    date: "2025-06-15",
    suggestedTimeSlots: ["10:00 AM - 10:30 AM", "1:00 PM - 1:30 PM", "3:30 PM - 4:00 PM"],
    message: "I'd like to discuss potential partnership opportunities between our companies.",
    location: "Main Hall - Meeting Pod 3"
  }, {
    id: 2,
    title: "AI Solutions Overview",
    requestedBy: {
      name: "Michael Zhang",
      company: "InnovateX",
      avatar: null
    },
    date: "2025-06-15",
    suggestedTimeSlots: ["11:00 AM - 11:30 AM", "2:00 PM - 2:30 PM"],
    message: "Interested in learning more about your AI solutions.",
    location: "Networking Lounge - Table 7"
  }, {
    id: 3,
    title: "Integration Possibilities",
    requestedBy: {
      name: "Jessica Lee",
      company: "DataVision",
      avatar: null
    },
    date: "2025-06-16",
    suggestedTimeSlots: ["9:30 AM - 10:00 AM", "4:00 PM - 4:30 PM"],
    message: "Would like to explore integration possibilities with our data platform.",
    location: "Exhibitor Hall - Booth #104"
  }];
  const scheduledMeetings = [{
    id: 101,
    title: "Cloud Solutions Discussion",
    with: {
      name: "Robert Chen",
      company: "CloudTech",
      avatar: null
    },
    date: "2025-06-15",
    time: "11:00 AM - 11:30 AM",
    location: "Main Hall - Meeting Pod 5",
    status: "confirmed",
    teamParticipant: {
      name: "Alex Morgan",
      designation: "Senior Sales Manager",
      avatar: null
    }
  }, {
    id: 102,
    title: "AI Integration Strategy",
    with: {
      name: "Emily Wong",
      company: "AI Solutions",
      avatar: null
    },
    date: "2025-06-15",
    time: "2:30 PM - 3:00 PM",
    location: "Networking Lounge - Table 12",
    status: "confirmed",
    teamParticipant: {
      name: "Jamie Rodriguez",
      designation: "Product Specialist",
      avatar: null
    }
  }, {
    id: 103,
    title: "Technical Partnership",
    with: {
      name: "David Miller",
      company: "TechInnovate",
      avatar: null
    },
    date: "2025-06-16",
    time: "10:30 AM - 11:00 AM",
    location: "Exhibitor Hall - Booth #237",
    status: "confirmed",
    teamParticipant: {
      name: "Chris Taylor",
      designation: "Technical Lead",
      avatar: null
    }
  }];
  const pastMeetings = [{
    id: 201,
    title: "Digital Systems Integration",
    with: {
      name: "Laura Thompson",
      company: "Digital Systems",
      avatar: null
    },
    date: "2025-06-10",
    time: "1:00 PM - 1:30 PM",
    location: "Main Hall - Meeting Pod 2",
    status: "completed",
    notes: "Discussed potential partnership. Follow up with proposal by end of month.",
    teamParticipant: {
      name: "Taylor Johnson",
      designation: "Business Development",
      avatar: null
    }
  }, {
    id: 202,
    title: "Security Solutions Review",
    with: {
      name: "James Wilson",
      company: "SecureTech",
      avatar: null
    },
    date: "2025-06-09",
    time: "11:30 AM - 12:00 PM",
    location: "Networking Lounge - Table 5",
    status: "completed",
    notes: "Interested in our security solutions. Send product sheet.",
    teamParticipant: {
      name: "Sam Roberts",
      designation: "Solutions Architect",
      avatar: null
    }
  }];
  const handleScheduleNewMeeting = () => {
    navigate("/meetings/new");
  };
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };
  const scrollDates = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  const handleAddToCalendar = (meeting: any) => {
    setSelectedMeeting(meeting);
    setCalendarDialogOpen(true);
  };
  const handleScheduleRoom = (room: any) => {
    setSelectedRoom(room);
    setTimeSlotModalOpen(true);
  };

  // Filter meetings based on status
  const getFilteredMeetings = () => {
    if (statusFilter === "all") {
      return [...pendingMeetings, ...scheduledMeetings, ...pastMeetings];
    }
    if (statusFilter === "confirmed") {
      return scheduledMeetings;
    }
    if (statusFilter === "pending") {
      return pendingMeetings;
    }
    if (statusFilter === "past") {
      return pastMeetings;
    }
    return [];
  };
  return <div className="container p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Meetings</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => setSettingsOpen(true)}>
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button className="gap-2" onClick={handleScheduleNewMeeting}>
            <CalendarIcon className="h-4 w-4" />
            Schedule New Meeting
          </Button>
        </div>
      </div>
      
      {/* Calendar Bar - Updated with 12px left margin */}
      <div className="relative mb-6">
        <Button variant="outline" size="icon" className="absolute left-6 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-sm bg-white dark:bg-gray-800 shadow-sm" onClick={() => scrollDates('left')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div ref={scrollContainerRef} className="overflow-x-auto py-3 px-24 scrollbar-hide bg-white border-t border-b border-gray-200" style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
          <div className="flex space-x-3 min-w-max ml-3">
            {weekDays.map((day, index) => {
            const isSelected = day.toDateString() === selectedDate.toDateString();
            const month = format(day, 'MMM');
            const dayNum = format(day, 'dd');
            const dayName = format(day, 'EEEEE');
            return <div key={index} onClick={() => handleDateSelect(day)} className={`flex-none cursor-pointer w-14 h-[72px] flex flex-col items-center justify-center transition-colors ${isSelected ? 'bg-primary text-primary-foreground rounded-md shadow-sm' : 'text-foreground hover:bg-muted rounded-md'}`} style={{
              minWidth: '3.5rem',
              padding: '1.5px 0'
            }}>
                  <div className="text-xs font-medium uppercase mb-1">{dayName}</div>
                  <div className="text-lg font-semibold">{dayNum}</div>
                  <div className="text-xs text-gray-400">{month}</div>
                </div>;
          })}
          </div>
        </div>
        <Button variant="outline" size="icon" className="absolute right-6 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-sm bg-white dark:bg-gray-800 shadow-sm" onClick={() => scrollDates('right')}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Updated Tabs and Filter Row - Tabs moved to left, filter stays right */}
      <div className="flex justify-between items-center mb-6">
        <Tabs defaultValue="private" onValueChange={setActiveTab} className="w-auto">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="private">Private</TabsTrigger>
            <TabsTrigger value="public">Public</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Meetings</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="past">Past</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="private" className="space-y-4">
          {activeTab === "private" && statusFilter === "pending" && <>
              {pendingMeetings.map(meeting => <Card key={meeting.id} className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex gap-4">
                        <BoringAvatar size={48} name={meeting.requestedBy.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                        <div className="space-y-1.5">
                          <h3 className="text-lg font-semibold">{meeting.title}</h3>
                          <div className="flex items-center">
                            <span className="font-medium">{meeting.requestedBy.name}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {meeting.requestedBy.company}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {meeting.message}
                          </p>
                          <div className="flex flex-wrap gap-x-4 mt-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              <span>{new Date(meeting.date).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-3.5 w-3.5 mr-1.5" />
                              <span>{meeting.suggestedTimeSlots[0]}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-1.5" />
                        <span>{meeting.location}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="gap-1">
                          <Check className="h-3.5 w-3.5" />
                          Accept
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1">
                          <X className="h-3.5 w-3.5" />
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </>}

          {activeTab === "private" && (statusFilter === "confirmed" || statusFilter === "all") && <>
              {scheduledMeetings.map(meeting => <Card key={meeting.id} className="border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between gap-4">
                        <div className="flex gap-4">
                          <BoringAvatar size={48} name={meeting.with.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold">{meeting.title}</h3>
                            <div className="flex items-center">
                              <span className="font-medium">Meeting with {meeting.with.name}</span>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {meeting.with.company}
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap gap-x-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="h-4 w-4 mr-1.5" />
                                <span>{new Date(meeting.date).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric'
                            })}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-1.5" />
                                <span>{meeting.time}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="h-4 w-4 mr-1.5" />
                                <span>{meeting.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Badge className="bg-green-100 text-green-800">
                            Confirmed
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4 pt-3 border-t">
                      <Button variant="outline" size="sm" className="gap-1" onClick={() => handleAddToCalendar(meeting)}>
                        <Calendar className="h-3.5 w-3.5" />
                        Add to Calendar
                      </Button>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Reschedule</Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Cancel</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>)}
            </>}

          {activeTab === "private" && (statusFilter === "past" || statusFilter === "all") && <>
              {pastMeetings.map(meeting => <Card key={meeting.id} className="border-gray-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between gap-4">
                        <div className="flex gap-4">
                          <BoringAvatar size={48} name={meeting.with.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold">{meeting.title}</h3>
                            <div className="flex items-center">
                              <span className="font-medium">Meeting with {meeting.with.name}</span>
                              <Badge variant="outline" className="ml-2 text-xs">
                                {meeting.with.company}
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap gap-x-4">
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="h-4 w-4 mr-1.5" />
                                <span>{new Date(meeting.date).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric'
                            })}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="h-4 w-4 mr-1.5" />
                                <span>{meeting.time}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center mt-3 pt-3 border-t">
                              
                            </div>
                            
                            {meeting.notes && <div className="mt-3 p-3 border rounded-md text-sm">
                                <p className="text-gray-700">{meeting.notes}</p>
                              </div>}
                          </div>
                        </div>
                        
                        <div>
                          <Badge className="bg-gray-100 text-gray-800">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4 pt-3 border-t">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        Schedule Follow-up
                      </Button>
                      
                      {!meeting.notes && <Button variant="outline" size="sm">Add Notes</Button>}
                    </div>
                  </CardContent>
                </Card>)}
            </>}
        </TabsContent>
        
        <TabsContent value="public" className="space-y-4">
          <PublicMeetingsContent onScheduleRoom={handleScheduleRoom} />
        </TabsContent>
      </Tabs>
      
      {/* Calendar Options Dialog */}
      <Dialog open={calendarDialogOpen} onOpenChange={setCalendarDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add to Calendar</DialogTitle>
            <DialogDescription>
              Choose your preferred calendar application to add this meeting.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white w-full">
              <Calendar className="h-5 w-5" />
              Add to Google Calendar
            </Button>
            <Button className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white w-full">
              <Calendar className="h-5 w-5" />
              Add to Apple Calendar
            </Button>
            <Button className="flex items-center justify-center gap-2 w-full" variant="outline">
              <Calendar className="h-5 w-5" />
              Add to Outlook Calendar
            </Button>
          </div>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />

      {/* Time Slot Modal */}
      <TimeSlotModal open={timeSlotModalOpen} onOpenChange={setTimeSlotModalOpen} selectedRoom={selectedRoom} selectedDate={selectedDate} />
    </div>;
};