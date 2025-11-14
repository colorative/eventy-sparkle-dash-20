import React, { useState } from "react";
import { Clock, User, MapPin, Bookmark, Filter, Search, Grid, List as ListIcon, Calendar, ChevronDown, Plus, Download, LayoutGrid } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import BoringAvatar from "boring-avatars";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { SessionDetailsContent } from "@/components/session/SessionDetailsContent";
import { SponsoredSessionCard } from "@/components/agenda/SponsoredSessionCard";
import { 
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
} from "@/components/ui/mini-calendar";

export const AgendaContent: React.FC = () => {
  const [viewType, setViewType] = useState("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFirstSessionModalOpen, setIsFirstSessionModalOpen] = useState(false);
  const navigate = useNavigate();

  const sessions = [{
    id: 1,
    title: "Opening Keynote: The Future of Technology",
    track: "Main Track",
    type: "keynote",
    time: "9:00 AM - 10:30 AM",
    date: "Monday, June 10",
    location: "Main Stage",
    speaker: {
      name: "Dr. Emma Chen",
      role: "CTO",
      company: "FutureTech Industries",
      avatarName: "Dr. Emma Chen"
    },
    description: "Join Dr. Emma Chen as she explores emerging technologies and their impact on our future.",
    tags: ["AI", "Future Tech", "Innovation"],
    saved: true,
    sponsors: [
      { name: "Salesforce", logo: "/src/assets/salesforce-logo.png" },
      { name: "HubSpot", logo: "/src/assets/hubspot-logo.png" }
    ]
  }, {
    id: 2,
    title: "Workshop: Building Scalable Cloud Solutions",
    track: "Technical",
    type: "workshop",
    time: "11:00 AM - 1:00 PM",
    date: "Monday, June 10",
    location: "Workshop Room A",
    speaker: {
      name: "James Wilson",
      role: "Principal Cloud Architect",
      company: "CloudSphere",
      avatarName: "James Wilson"
    },
    description: "A hands-on workshop exploring best practices for building scalable cloud applications.",
    tags: ["Cloud", "Architecture", "Scalability"],
    saved: false
  }, {
    id: 3,
    title: "Panel Discussion: Diversity in Tech",
    track: "Leadership",
    type: "panel",
    time: "2:00 PM - 3:30 PM",
    date: "Monday, June 10",
    location: "Panel Room B",
    speakers: [{
      name: "Sarah Johnson",
      role: "VP of Engineering",
      company: "TechDiversity",
      avatarName: "Sarah Johnson"
    }, {
      name: "Michael Lee",
      role: "CEO",
      company: "InclusiveTech",
      avatarName: "Michael Lee"
    }, {
      name: "Priya Sharma",
      role: "Director of HR",
      company: "GlobalTech",
      avatarName: "Priya Sharma"
    }],
    description: "Industry leaders discuss challenges and opportunities for improving diversity in technology.",
    tags: ["Diversity", "Leadership", "Culture"],
    saved: true
  },
  {
    id: 4,
    title: "Tech Talk: The Rise of Quantum Computing",
    track: "Technical",
    type: "talk",
    time: "4:00 PM - 5:00 PM",
    date: "Monday, June 10",
    location: "Tech Stage",
    speaker: {
      name: "Dr. Robert Kim",
      role: "Quantum Research Lead",
      company: "QuantumTech",
      avatarName: "Dr. Robert Kim"
    },
    description: "An exploration of quantum computing advances and their potential applications in industry.",
    tags: ["Quantum", "Computing", "Research"],
    saved: false
  }, {
    id: 5,
    title: "Networking Reception",
    track: "Social",
    type: "social",
    time: "6:00 PM - 8:00 PM",
    date: "Monday, June 10",
    location: "Grand Hall",
    description: "Join fellow attendees for drinks, appetizers, and networking opportunities.",
    tags: ["Networking", "Social"],
    saved: false
  }];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "keynote":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200";
      case "workshop":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200";
      case "panel":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200";
      case "talk":
        return "bg-green-100 text-green-800 hover:bg-green-200 border-green-200";
      case "social":
        return "bg-pink-100 text-pink-800 hover:bg-pink-200 border-pink-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200";
    }
  };
  const sessionCardColors = ["bg-[#9b87f5]", "bg-[#1A1F2C]", "bg-[#1EAEDB]", "bg-[#ea384c]"];
  const handleSaveSession = (id: number) => {
    const session = sessions.find(s => s.id === id);
    if (session) {
      toast({
        title: session.saved ? "Session unsaved" : "Session saved",
        description: `Session "${session.title}" has been ${session.saved ? 'removed from' : 'added to'} your bookmarks.`
      });
    }
  };

  const handleAddToSchedule = (id, title) => {
    toast({
      title: "Added to schedule",
      description: `"${title}" has been added to your personal schedule.`
    });
  };

  const handleViewDetails = (id: number) => {
    if (id === 1) {
      setIsFirstSessionModalOpen(true);
    } else {
      navigate(`/agenda/sessions/${id}`);
    }
  };

  const groupedByTrack = sessions.reduce((acc, session) => {
    const track = session.track || "Uncategorized";
    if (!acc[track]) {
      acc[track] = [];
    }
    acc[track].push(session);
    return acc;
  }, {} as Record<string, typeof sessions>);

  const filteredSessions = sessions.filter(session => 
    session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    session.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    session.track?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCalendarView = () => {
    return (
      <div className="bg-white border rounded-lg p-4">
        <div className="text-center mb-4">
          <h2 className="text-lg font-medium">Monday, June 10</h2>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div className="relative min-h-[600px]">
            <div className="absolute left-0 top-0 h-full w-16 border-r pr-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-[50px] text-right text-xs text-gray-500 pr-2">
                  {(i + 8) % 12 === 0 ? 12 : (i + 8) % 12}:00 {i + 8 < 12 ? 'AM' : 'PM'}
                </div>
              ))}
            </div>
            
            <div className="ml-16 relative">
              {sessions.map((session, idx) => {
                const startHour = parseInt(session.time.split(':')[0]);
                const duration = session.time.includes('AM - ') || session.time.includes('PM - ') ? 
                  parseInt(session.time.split(' - ')[1].split(':')[0]) - startHour : 1;
                
                const top = (startHour - 8) * 50;
                const height = duration * 50;
                
                return (
                  <div 
                    key={session.id}
                    className={`absolute w-[calc(100%-8px)] p-2 rounded border ${sessionCardColors[idx % sessionCardColors.length]} bg-opacity-10 border-opacity-50 overflow-hidden cursor-pointer`}
                    style={{ 
                      top: `${top}px`, 
                      height: `${height}px`,
                      left: '4px'
                    }}
                    onClick={() => handleViewDetails(session.id)}
                  >
                    <div className="text-xs font-medium truncate">{session.title}</div>
                    <div className="text-xs text-gray-500 truncate">{session.location}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div className="bg-white dark:bg-gray-800 flex min-w-60 flex-col overflow-hidden items-stretch flex-1 shrink basis-[0%] p-6 max-md:p-4 max-md:max-w-full">
    <div className="w-full max-w-[1024px] mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Event Agenda</h1>
          <p className="text-gray-500 dark:text-gray-400">Browse and save sessions to your schedule</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative w-[260px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Search sessions..."
              className="pl-9 bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="outline" className="gap-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <div className="border rounded-md flex dark:border-gray-600">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewType("list")} 
              className={viewType === "list" ? "bg-slate-100 dark:bg-gray-700" : "hover:bg-slate-100 dark:hover:bg-gray-700"}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewType("grid")} 
              className={viewType === "grid" ? "bg-slate-100 dark:bg-gray-700" : "hover:bg-slate-100 dark:hover:bg-gray-700"}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewType("calendar")} 
              className={viewType === "calendar" ? "bg-slate-100 dark:bg-gray-700" : "hover:bg-slate-100 dark:hover:bg-gray-700"}
            >
              <Calendar className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setViewType("track")} 
              className={viewType === "track" ? "bg-slate-100 dark:bg-gray-700" : "hover:bg-slate-100 dark:hover:bg-gray-700"}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Date Filter Bar */}
      <div className="mb-6">
        <MiniCalendar days={14} className="w-full justify-between">
          <MiniCalendarNavigation direction="prev" />
          <MiniCalendarDays>
            {(date) => <MiniCalendarDay date={date} key={date.toISOString()} />}
          </MiniCalendarDays>
          <MiniCalendarNavigation direction="next" />
        </MiniCalendar>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="bg-gray-100 dark:bg-gray-700 p-1">
          <TabsTrigger value="all" className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">All Sessions</TabsTrigger>
          <TabsTrigger value="main" className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Main Track</TabsTrigger>
          <TabsTrigger value="technical" className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Technical</TabsTrigger>
          <TabsTrigger value="leadership" className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Leadership</TabsTrigger>
          <TabsTrigger value="social" className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Social</TabsTrigger>
          <TabsTrigger value="saved" className="text-sm data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600">Saved</TabsTrigger>
        </TabsList>
      </Tabs>

      <ScrollArea className="flex-1 pr-4">
        {viewType === "list" ? <div className="space-y-4">
            {filteredSessions.map((session, idx) => 
              session.sponsors && session.sponsors.length > 0 ? (
                <SponsoredSessionCard
                  key={session.id}
                  session={session}
                  colorClass={sessionCardColors[idx % sessionCardColors.length]}
                  onViewDetails={handleViewDetails}
                  onSaveSession={handleSaveSession}
                  onAddToSchedule={handleAddToSchedule}
                />
              ) : (
                <Card key={session.id} className="overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700 dark:bg-gray-800 cursor-pointer flex" onClick={() => handleViewDetails(session.id)}>
                  <div className={`w-2 ${sessionCardColors[idx % sessionCardColors.length]}`}></div>
                  <div className="flex-1">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold dark:text-white line-clamp-2">{session.title}</h3>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={e => {
                            e.stopPropagation();
                            handleAddToSchedule(session.id, session.title);
                          }} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={e => {
                            e.stopPropagation();
                            handleSaveSession(session.id);
                          }} className={session.saved ? "text-primary hover:text-primary/80 hover:bg-primary/10 dark:hover:bg-primary/20" : "hover:bg-gray-100 dark:hover:bg-gray-700"}>
                            <Bookmark className="h-4 w-4" fill={session.saved ? "currentColor" : "none"} />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="dark:text-gray-300">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{session.time}</span>
                        <span className="mx-2">•</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{session.location}</span>
                      </div>
                      
                      {session.speaker && <div className="flex items-center gap-2 mb-3">
                          <BoringAvatar size={32} name={session.speaker.avatarName} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                          <div>
                            <p className="text-sm font-medium dark:text-white">{session.speaker.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{session.speaker.role}, {session.speaker.company}</p>
                          </div>
                        </div>}
                      
                      {session.speakers && <div className="mb-3">
                          <p className="text-sm font-medium mb-2 dark:text-white">Panelists:</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-2">
                            {session.speakers.map((speaker, index) => <div key={index} className="flex items-center gap-2">
                                <BoringAvatar size={28} name={speaker.avatarName} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                                <div>
                                  <p className="text-xs font-medium dark:text-white">{speaker.name}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">{speaker.company}</p>
                                </div>
                              </div>)}
                          </div>
                        </div>}
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{session.description}</p>
                      
                      <div className="flex flex-wrap gap-1">
                        {session.tags.map((tag, index) => <Badge key={index} variant="secondary" className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors">{tag}</Badge>)}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              )
            )}
          </div> : viewType === "grid" ? 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSessions.map((session, idx) => <Card key={session.id} className="flex flex-col h-full hover:shadow-md transition-all border-gray-200 dark:border-gray-700 dark:bg-gray-800 cursor-pointer" onClick={() => handleViewDetails(session.id)}>
                <div className="flex">
                    <div className={`w-2 ${sessionCardColors[idx % sessionCardColors.length]}`}></div>
                    <div className="flex-1 flex flex-col">
                        <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                            <Badge className={`${getTypeColor(session.type)} transition-colors`} variant="outline">
                                {session.type.charAt(0).toUpperCase() + session.type.slice(1)}
                            </Badge>
                            <CardTitle className="mt-2 text-lg dark:text-white line-clamp-2">{session.title}</CardTitle>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" onClick={e => {
                                e.stopPropagation();
                                handleAddToSchedule(session.id, session.title);
                              }} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Calendar className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={e => {
                                e.stopPropagation();
                                handleSaveSession(session.id);
                              }} className={session.saved ? "text-primary hover:text-primary/80 hover:bg-primary/10 dark:hover:bg-primary/20" : "hover:bg-gray-100 dark:hover:bg-gray-700"}>
                                <Bookmark className="h-4 w-4" fill={session.saved ? "currentColor" : "none"} />
                              </Button>
                            </div>
                        </div>
                        </CardHeader>
                        <CardContent className="flex-grow dark:text-gray-300">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{session.time}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{session.location}</span>
                        </div>
                        {session.speaker && <div className="flex items-center gap-2 mb-2">
                            <BoringAvatar size={28} name={session.speaker.avatarName} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                            <div>
                                <p className="text-xs font-medium dark:text-white">{session.speaker.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{session.speaker.company}</p>
                            </div>
                            </div>}
                         {session.speakers && session.speakers.length > 0 && <div className="mb-2">
                                <p className="text-xs font-medium mb-1 dark:text-white">Panelists:</p>
                                <div className="flex flex-wrap gap-1">
                                {session.speakers.map((panelist, pIdx) => <BoringAvatar key={pIdx} size={24} name={panelist.avatarName} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />)}
                                </div>
                            </div>}
                        </CardContent>
                    </div>
                </div>
              </Card>)}
          </div> : viewType === "calendar" ? 
          renderCalendarView() : 
          <div className="space-y-8">
            {Object.entries(groupedByTrack).map(([track, trackSessions]) => (
              <div key={track} className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">{track}</h2>
                <div className="space-y-4">
                  {(trackSessions as typeof sessions).map((session, idx) => (
                    <Card key={session.id} className="overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700 dark:bg-gray-800 cursor-pointer flex" onClick={() => handleViewDetails(session.id)}>
                      <div className={`w-2 ${sessionCardColors[idx % sessionCardColors.length]}`}></div>
                      <div className="flex-1">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="dark:text-white line-clamp-2">{session.title}</CardTitle>
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToSchedule(session.id, session.title);
                                }} 
                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <Calendar className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSaveSession(session.id);
                                }} 
                                className={session.saved ? "text-primary hover:text-primary/80 hover:bg-primary/10 dark:hover:bg-primary/20" : "hover:bg-gray-100 dark:hover:bg-gray-700"}
                              >
                                <Bookmark className="h-4 w-4" fill={session.saved ? "currentColor" : "none"} />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="dark:text-gray-300">
                          <div className="flex flex-wrap gap-4 mb-3">
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{session.location}</span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>}
      </ScrollArea>

      <Sheet open={isFirstSessionModalOpen} onOpenChange={setIsFirstSessionModalOpen}>
        <SheetContent side="right" className="w-[70vw] max-w-none p-0 overflow-hidden">
          <div className="h-full overflow-auto">
            <SessionDetailsContent sessionId="1" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </div>;
};
