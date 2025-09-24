import React from "react";
import { MessageSquare, Calendar, Eye, Clock, Building, User, PanelRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Avatar from "boring-avatars";
export const InterestedContent: React.FC = () => {
  const interestedProfiles = [{
    id: 1,
    name: "Alex Thompson",
    role: "Product Manager",
    company: "TechInnovate",
    avatar: null,
    initials: "AT",
    reason: "Viewed your company profile and spent 5 minutes on your product page",
    time: "15 minutes ago",
    profileViews: 3,
    mutual: 2,
    message: "Hi there! I'm interested in learning more about your AI solutions. Would you have time for a quick chat during the event?",
    interests: ["AI Solutions", "Product Management", "SaaS"]
  }, {
    id: 2,
    name: "Sarah Chen",
    role: "CTO",
    company: "DataVision",
    avatar: null,
    initials: "SC",
    reason: "Bookmarked your profile and requested your product materials",
    time: "2 hours ago",
    profileViews: 1,
    mutual: 4,
    message: null,
    interests: ["Data Analytics", "Enterprise Software", "Cloud Solutions"]
  }, {
    id: 3,
    name: "Michael Rodriguez",
    role: "VP of Partnerships",
    company: "Global Enterprises",
    avatar: null,
    initials: "MR",
    reason: "Attended the same session and wants to connect",
    time: "Yesterday",
    profileViews: 5,
    mutual: 1,
    message: "Hello! I saw your company presentation yesterday and would love to discuss potential partnership opportunities. Are you free tomorrow at 2 PM?",
    interests: ["Partnerships", "Enterprise Sales", "Strategic Alliances"]
  }, {
    id: 4,
    name: "Emma Wilson",
    role: "Head of Innovation",
    company: "Future Technologies",
    avatar: null,
    initials: "EW",
    reason: "Searched for your company and requested contact information",
    time: "Yesterday",
    profileViews: 2,
    mutual: 0,
    message: null,
    interests: ["Innovation Strategy", "Digital Transformation", "Emerging Tech"]
  }, {
    id: 5,
    name: "David Kim",
    role: "CEO",
    company: "StartupHub",
    avatar: null,
    initials: "DK",
    reason: "Interested in your product demo and investment opportunities",
    time: "2 days ago",
    profileViews: 4,
    mutual: 3,
    message: "I was impressed by your company's growth metrics. Let's discuss potential investment opportunities during the event.",
    interests: ["Investments", "Startups", "Tech Innovation"]
  }];
  return <div className="bg-white flex min-w-60 flex-col overflow-hidden items-stretch flex-1 shrink basis-[0%] p-6 max-md:max-w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Interested in You</h1>
          <p className="text-gray-500">People who have engaged with your profile</p>
        </div>
        
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {interestedProfiles.map(profile => <Card key={profile.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12">
                    <Avatar size={48} name={profile.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <HoverCard>
                          <HoverCardTrigger asChild>
                            <h3 className="font-medium text-lg cursor-pointer hover:text-blue-600">{profile.name}</h3>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="flex justify-between space-x-4">
                              <div className="h-10 w-10">
                                <Avatar size={40} name={profile.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                              </div>
                              <div className="space-y-1 flex-1">
                                <h4 className="text-sm font-semibold">{profile.name}</h4>
                                <p className="text-sm text-gray-500">{profile.role} at {profile.company}</p>
                                <div className="flex items-center pt-2">
                                  <div className="text-xs text-gray-500">
                                    <span className="font-medium">{profile.mutual}</span> mutual connections
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-1 pt-2">
                                  {profile.interests.map((interest, index) => <Badge key={index} variant="secondary" className="text-xs">{interest}</Badge>)}
                                </div>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                        
                        <div className="flex items-center">
                          <div className="flex items-center text-sm text-gray-500">
                            <Building className="h-4 w-4 mr-1" />
                            <span>{profile.role}, {profile.company}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center text-xs text-gray-500">
                            <Eye className="h-3 w-3 mr-1" />
                            <span>{profile.profileViews} profile views</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <User className="h-3 w-3 mr-1" />
                            <span>{profile.mutual} mutual connections</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{profile.time}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          Schedule Meeting
                        </Button>
                        <Button size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Respond
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                
                
                {profile.message}
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {profile.interests.map((interest, index) => <Badge key={index} variant="outline" className="text-xs">{interest}</Badge>)}
                </div>
              </CardContent>
              
            </Card>)}
        </div>
      </ScrollArea>
    </div>;
};