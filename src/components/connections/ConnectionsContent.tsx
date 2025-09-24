
import React, { useState } from "react";
import { Search, Filter, Plus, MessageSquare, Calendar, Tags, MoreHorizontal, Tag, Download, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Avatar from "boring-avatars";

export const ConnectionsContent: React.FC = () => {
  const connections = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "VP of Engineering",
      company: "TechCorp",
      image: null,
      initials: "AJ",
      status: "connected",
      notes: "Met at morning coffee break. Interested in our AI solution.",
      tags: ["Potential Client", "AI"],
      lastContact: "Today, 2:30 PM",
      email: "alex.johnson@techcorp.com",
      phone: "+1 (555) 123-4567"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      role: "CTO",
      company: "InnovateSoft",
      image: null,
      initials: "MR",
      status: "connected",
      notes: "Discussed potential partnership during lunch. Follow up next week.",
      tags: ["Partnership", "Follow Up"],
      lastContact: "Yesterday",
      email: "maria@innovatesoft.com",
      phone: "+1 (555) 987-6543"
    },
    {
      id: 3,
      name: "John Smith",
      role: "Product Manager",
      company: "GlobalTech",
      image: null,
      initials: "JS",
      status: "pending",
      tags: [],
      lastContact: null,
      email: "john.smith@globaltech.com",
      phone: null
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Director of Sales",
      company: "SalesPro",
      image: null,
      initials: "SW",
      status: "connected",
      notes: "Great conversation about our product. Wants a demo next week.",
      tags: ["Hot Lead", "Demo Scheduled"],
      lastContact: "2 days ago",
      email: "sarah@salespro.com",
      phone: "+1 (555) 444-5555"
    },
    {
      id: 5,
      name: "Michael Chen",
      role: "CEO",
      company: "StartupNow",
      image: null,
      initials: "MC",
      status: "pending",
      tags: [],
      lastContact: null,
      email: "michael@startupnow.com",
      phone: null
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case "connected": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "ignored": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const [selectedTags, setSelectedTags] = useState([]);
  
  const toggleTag = (connection, tag) => {
    console.log(`Toggling tag "${tag}" for ${connection.name}`);
    // In a real app, this would update state or make an API call
  };

  return (
    <div className="bg-white flex min-w-60 flex-col overflow-hidden items-stretch flex-1 shrink basis-[0%] p-6 max-md:max-w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Connections</h1>
          <p className="text-gray-500">Manage your event contacts</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Tags className="h-4 w-4" />
            Manage Tags
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Contact
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search connections" className="pl-9" />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Contacts</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="tagged">Tagged</TabsTrigger>
        </TabsList>
      </Tabs>

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {connections.map((connection) => (
            <Card key={connection.id} className="p-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center p-4">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="flex-shrink-0 cursor-pointer">
                        <div className="h-12 w-12">
                          <Avatar
                            size={48}
                            name={connection.name}
                            variant="marble"
                            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                          />
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="h-10 w-10">
                          <Avatar
                            size={40}
                            name={connection.name}
                            variant="marble"
                            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                          />
                        </div>
                        <div className="space-y-1 flex-1">
                          <h4 className="text-sm font-semibold">{connection.name}</h4>
                          <p className="text-sm text-gray-500">{connection.role} at {connection.company}</p>
                          {connection.email && (
                            <div className="flex items-center pt-2">
                              <span className="text-xs text-gray-500">{connection.email}</span>
                            </div>
                          )}
                          {connection.phone && (
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500">{connection.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                  
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{connection.name}</h3>
                        <p className="text-sm text-gray-500">{connection.role} at {connection.company}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(connection.status)} variant="outline">
                          {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    {connection.notes && (
                      <p className="text-sm text-gray-700 mt-1">{connection.notes}</p>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {connection.tags && connection.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs gap-1">
                          {tag}
                          <button className="ml-1 hover:bg-gray-200 rounded-full" onClick={() => toggleTag(connection, tag)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-2">
                    {connection.status === "connected" && (
                      <>
                        <Button variant="ghost" size="icon" className="text-gray-500">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-500">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {connection.status === "pending" && (
                      <>
                        <Button variant="ghost" size="icon" className="text-green-500">
                          <Check className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <X className="h-5 w-5" />
                        </Button>
                      </>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-gray-500">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Add Note</DropdownMenuItem>
                        <DropdownMenuItem>Add to Group</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-500">Remove Connection</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
