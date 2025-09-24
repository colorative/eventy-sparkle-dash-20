import React, { useState } from "react";
import { Search, Filter, Clock, User, Building, MapPin, MoreHorizontal, Heart, Calendar, MessageSquare, Trash2, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import BoringAvatar from "boring-avatars";

export const BookmarksContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const bookmarks = [
    {
      id: 1,
      type: "exhibitor",
      name: "TechSolutions Inc.",
      category: "Enterprise Software",
      location: "Booth #123",
      description: "Leading provider of AI-driven enterprise solutions.",
      logoInitials: "TS"
    },
    {
      id: 2,
      type: "speaker",
      name: "Dr. Lisa Chen",
      role: "AI Research Director",
      company: "FutureTech",
      avatarInitials: "LC"
    },
    {
      id: 3,
      type: "session",
      title: "Blockchain Technology Workshop",
      speaker: "Michael Rodriguez",
      time: "Monday, 2:00 PM",
      location: "Workshop Room A",
      description: "Hands-on workshop exploring blockchain applications in business."
    },
    {
      id: 4,
      type: "exhibitor",
      name: "CloudSecure",
      category: "Cybersecurity",
      location: "Booth #456",
      description: "Next-generation cloud security solutions for modern enterprises.",
      logoInitials: "CS"
    },
    {
      id: 5,
      type: "speaker",
      name: "Sarah Johnson",
      role: "CEO",
      company: "InnovateNow",
      avatarInitials: "SJ"
    },
    {
      id: 6,
      type: "exhibitor",
      name: "DataFlow Systems",
      category: "Analytics",
      location: "Booth #789",
      description: "Real-time data processing and analytics solutions.",
      logoInitials: "DS"
    },
    {
      id: 7,
      type: "speaker",
      name: "Prof. Robert Kim",
      role: "Research Professor",
      company: "MIT",
      avatarInitials: "RK"
    },
    {
      id: 8,
      type: "session",
      title: "Digital Marketing Strategies",
      speaker: "Emma Thompson",
      time: "Friday, 11:00 AM",
      location: "Marketing Hub",
      description: "Modern approaches to digital marketing and customer engagement."
    },
    {
      id: 9,
      type: "exhibitor",
      name: "GreenTech Solutions",
      category: "Sustainability",
      location: "Booth #234",
      description: "Sustainable technology solutions for modern businesses.",
      logoInitials: "GT"
    },
    {
      id: 10,
      type: "speaker",
      name: "Dr. Maria Rodriguez",
      role: "CTO",
      company: "NeuralNet Inc.",
      avatarInitials: "MR"
    },
    {
      id: 11,
      type: "sponsor",
      name: "Microsoft",
      category: "Technology Partner",
      level: "Platinum",
      description: "Leading technology solutions and cloud services provider.",
      logoInitials: "MS"
    },
    {
      id: 12,
      type: "sponsor",
      name: "Google",
      category: "Cloud Solutions",
      level: "Gold",
      description: "Cloud computing and enterprise solutions.",
      logoInitials: "GO"
    },
    {
      id: 13,
      type: "sponsor",
      name: "Amazon Web Services",
      category: "Cloud Infrastructure",
      level: "Silver",
      description: "Cloud computing platform and services.",
      logoInitials: "AWS"
    },
    {
      id: 14,
      type: "sponsor",
      name: "Salesforce",
      category: "CRM Solutions",
      level: "Bronze",
      description: "Customer relationship management solutions.",
      logoInitials: "SF"
    }
  ];

  const getTypeColor = (type: string) => {
    switch(type) {
      case "exhibitor": return "bg-purple-100 text-purple-800";
      case "speaker": return "bg-blue-100 text-blue-800";
      case "session": return "bg-green-100 text-green-800";
      case "sponsor": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBookmarks = bookmarks.filter(item => {
    switch(activeTab) {
      case "exhibitors": return item.type === "exhibitor";
      case "sponsors": return item.type === "sponsor";
      case "speakers": return item.type === "speaker";
      case "sessions": return item.type === "session";
      default: return true;
    }
  });

  const removeFromList = (id: number) => {
    console.log(`Removing item ${id} from bookmarks`);
    // In a real app, this would update state or make an API call
  };

  return (
    <div className="bg-white flex min-w-60 flex-col overflow-hidden items-stretch flex-1 shrink basis-[0%] p-6 max-md:max-w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Bookmarks</h1>
          <p className="text-gray-500">Your saved exhibitors, speakers, and sessions</p>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search your bookmarks" className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="exhibitors">Exhibitors</TabsTrigger>
          <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
          <TabsTrigger value="speakers">Speakers</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <ScrollArea className="flex-1">
            <div className="space-y-3">
              {filteredBookmarks.map((item) => (
                <BookmarkCard key={item.id} item={item} onRemove={removeFromList} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="exhibitors" className="mt-6">
          <ScrollArea className="flex-1">
            <div className="space-y-3">
              {filteredBookmarks.map((item) => (
                <BookmarkCard key={item.id} item={item} onRemove={removeFromList} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="sponsors" className="mt-6">
          <ScrollArea className="flex-1">
            <div className="space-y-3">
              {filteredBookmarks.map((item) => (
                <BookmarkCard key={item.id} item={item} onRemove={removeFromList} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="speakers" className="mt-6">
          <ScrollArea className="flex-1">
            <div className="space-y-3">
              {filteredBookmarks.map((item) => (
                <BookmarkCard key={item.id} item={item} onRemove={removeFromList} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="sessions" className="mt-6">
          <ScrollArea className="flex-1">
            <div className="space-y-3">
              {filteredBookmarks.map((item) => (
                <BookmarkCard key={item.id} item={item} onRemove={removeFromList} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface BookmarkCardProps {
  item: any;
  onRemove: (id: number) => void;
}

const BookmarkCard: React.FC<BookmarkCardProps> = ({ item, onRemove }) => {
  const getTypeColor = (type: string) => {
    switch(type) {
      case "exhibitor": return "bg-purple-100 text-purple-800";
      case "speaker": return "bg-blue-100 text-blue-800";
      case "session": return "bg-green-100 text-green-800";
      case "sponsor": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-0 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-start p-4">
          {/* Avatar section - aligned to top */}
          <div className="flex-shrink-0">
            {(item.type === "exhibitor" || item.type === "sponsor") && (
              <BoringAvatar
                size={48}
                name={item.name}
                variant="marble"
                colors={["#92A3FD", "#9DCEFF", "#EE9AE5", "#FFB4A3", "#FFC6FF"]}
              />
            )}
            
            {item.type === "speaker" && (
              <BoringAvatar
                size={48}
                name={item.name}
                variant="marble"
                colors={["#92A3FD", "#9DCEFF", "#EE9AE5", "#FFB4A3", "#FFC6FF"]}
              />
            )}
            
            {item.type === "session" && (
              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-gray-500" />
              </div>
            )}
          </div>
          
          {/* Content section */}
          <div className="ml-4 flex-1">
            {/* Name and badge in same line */}
            <div className="flex items-center gap-2">
              <h3 className="font-medium">
                {item.type === "session" ? item.title : item.name}
              </h3>
              <Badge className={getTypeColor(item.type)} variant="outline">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </Badge>
            </div>
            
            {/* Type-specific details */}
            {item.type === "exhibitor" && (
              <>
                <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {item.location}
                </div>
              </>
            )}
            
            {item.type === "sponsor" && (
              <>
                <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                <p className="text-xs text-gray-500 mt-1">{item.level} Sponsor</p>
              </>
            )}
            
            {item.type === "speaker" && (
              <p className="text-sm text-gray-500 mt-1">{item.role}, {item.company}</p>
            )}
            
            {item.type === "session" && (
              <>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <User className="h-3 w-3 mr-1" />
                  {item.speaker}
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.time}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {item.location}
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2 ml-2">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Add Note</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500" onClick={() => onRemove(item.id)}>
                  Remove from Bookmarks
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};