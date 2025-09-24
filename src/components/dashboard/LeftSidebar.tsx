import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Home, Building, Calendar, Users, FileText, Inbox, Heart, MapPin, Mic, Package, ChevronDown, ChevronUp, BookOpen, Image, Newspaper, Share2, ClipboardList, Trophy, MessageSquare, FormInput, CalendarDays, Bookmark, Award } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LeftSidebarProps {
  currentRole?: string;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentRole = "exhibitor" }) => {
  const location = useLocation();
  const [leadsOpen, setLeadsOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  const handleLeadsToggle = (open: boolean) => {
    setLeadsOpen(open);
    if (open) {
      setCompanyOpen(false);
    }
  };

  const handleCompanyToggle = (open: boolean) => {
    setCompanyOpen(open);
    if (open) {
      setLeadsOpen(false);
    }
  };

  return <div className="h-full">
      <Sidebar>
        <SidebarContent className="px-0 py-0">
          {/* Main Navigation with top padding */}
          <SidebarGroup className="pt-[80px]">
            <SidebarGroupContent>
              <ScrollArea className="h-full hide-scrollbar">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Home">
                      <Link to="/">
                        <Home className="h-4 w-4" />
                        <span>Home</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Conditional rendering based on role */}
                  {currentRole === "attendee" ? (
                    // For Attendee role: Show "Interested in You" as top-level menu item
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Interested in You">
                        <Link to="/interested">
                          <Heart className="h-4 w-4" />
                          <span>Interested in You</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : (
                    // For Exhibitor role: Show Leads menu group as before
                    <Collapsible open={leadsOpen} onOpenChange={handleLeadsToggle}>
                      <CollapsibleTrigger className="w-full">
                        <SidebarMenuButton tooltip="Leads" className="w-full">
                          <Heart className="h-4 w-4" />
                          <span>Leads</span>
                          {leadsOpen ? <ChevronUp className="h-4 w-4 ml-auto" /> : <ChevronDown className="h-4 w-4 ml-auto" />}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuItem>
                            <SidebarMenuSubButton asChild>
                              <Link to="/interested">Interested in You</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuSubButton asChild>
                              <Link to="/leads">All Leads</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuSubButton asChild>
                              <Link to="/lead-form">Lead Form</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  )}

                  {/* My Company Profile Menu Group - Hidden for Attendee role */}
                  {currentRole !== "attendee" && (
                    <Collapsible open={companyOpen} onOpenChange={handleCompanyToggle}>
                      <CollapsibleTrigger className="w-full">
                        <SidebarMenuButton tooltip="My Company Profile" className="w-full">
                          <Building className="h-4 w-4" />
                          <span>My Company Profile</span>
                          {companyOpen ? <ChevronUp className="h-4 w-4 ml-auto" /> : <ChevronDown className="h-4 w-4 ml-auto" />}
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          <SidebarMenuItem>
                            <SidebarMenuSubButton asChild>
                              <Link to="/activate-team">Manage Team</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuSubButton asChild>
                              <Link to="/my-products">My Products</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuSubButton asChild>
                              <Link to="/settings">Profile Settings</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  )}

                  {/* Direct Links */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Explore">
                      <Link to="/explore">
                        <Home className="h-4 w-4" />
                        <span>Explore</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {/* Calendar menu item - moved above My Meetings */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Calendar">
                      <Link to="/calendar">
                        <Calendar className="h-4 w-4" />
                        <span>Calendar</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  {/* My Meetings menu item - renamed from Meetings */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="My Meetings">
                      <Link to="/meetings">
                        <Users className="h-4 w-4" />
                        <span>My Meetings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                   <SidebarMenuItem>
                     <SidebarMenuButton asChild tooltip="Inbox">
                       <Link to="/inbox">
                         <Inbox className="h-4 w-4" />
                         <span>Inbox</span>
                       </Link>
                     </SidebarMenuButton>
                   </SidebarMenuItem>

                   <SidebarMenuItem>
                     <SidebarMenuButton asChild tooltip="Bookmarks">
                       <Link to="/bookmarks">
                         <Bookmark className="h-4 w-4" />
                         <span>Bookmarks</span>
                       </Link>
                     </SidebarMenuButton>
                   </SidebarMenuItem>
                </SidebarMenu>
              </ScrollArea>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Event Tools Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Event Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <ScrollArea className="h-full hide-scrollbar">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Event Agenda">
                      <Link to="/agenda">
                        <FileText className="h-4 w-4" />
                        <span>Event Agenda</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Exhibitors">
                      <Link to="/exhibitors">
                        <Building className="h-4 w-4" />
                        <span>Exhibitors</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Sponsors">
                      <Link to="/sponsors">
                        <Award className="h-4 w-4" />
                        <span>Sponsors</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Attendees">
                      <Link to="/attendees">
                        <Users className="h-4 w-4" />
                        <span>Attendees</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Speakers">
                      <Link to="/speakers">
                        <Mic className="h-4 w-4" />
                        <span>Speakers</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Community Forum">
                      <Link to="/community-forum">
                        <MessageSquare className="h-4 w-4" />
                        <span>Community Forum</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Social Feed">
                      <Link to="/social-feed">
                        <Share2 className="h-4 w-4" />
                        <span>Social Feed</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Maps">
                      <Link to="/maps">
                        <MapPin className="h-4 w-4" />
                        <span>Maps</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Products">
                      <Link to="/products">
                        <Package className="h-4 w-4" />
                        <span>Products</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Gallery">
                      <Link to="/gallery">
                        <Image className="h-4 w-4" />
                        <span>Gallery</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="News">
                      <Link to="/news">
                        <Newspaper className="h-4 w-4" />
                        <span>News</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Gamification">
                      <Link to="/gamification">
                        <Trophy className="h-4 w-4" />
                        <span>Gamification</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Itinerary">
                      <Link to="/itinerary">
                        <CalendarDays className="h-4 w-4" />
                        <span>Itinerary</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Survey">
                      <Link to="/survey">
                        <ClipboardList className="h-4 w-4" />
                        <span>Survey</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Event Guide">
                      <Link to="/event-guide">
                        <BookOpen className="h-4 w-4" />
                        <span>Event Guide</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Notes">
                      <Link to="/notes">
                        <FileText className="h-4 w-4" />
                        <span>Notes</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </ScrollArea>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>;
};
