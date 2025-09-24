import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquare, Settings, ChevronDown, PanelRight, UserCircle, Briefcase, Mic, User, Check, LogOut, UserCog, Inbox, MessagesSquare, Mail, FileText, Headset, Bell as BellIcon, Package, HelpCircle, Download } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface HeaderProps {
  currentRole?: string;
  onRoleChange?: (role: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRole: propCurrentRole, onRoleChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [internalCurrentRole, setInternalCurrentRole] = useState("exhibitor");
  const navigate = useNavigate();
  
  // Use prop value if provided, otherwise use internal state
  const currentRole = propCurrentRole || internalCurrentRole;
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // You would need to add logic to actually hide/show the sidebar
    const sidebar = document.querySelector('.left-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('hidden');
    }
  };
  const handleRoleChange = (role: string) => {
    if (onRoleChange) {
      onRoleChange(role);
    } else {
      setInternalCurrentRole(role);
    }
    toast({
      title: "Role switched",
      description: `You are now viewing as ${role.charAt(0).toUpperCase() + role.slice(1)}.`
    });
  };

  // Dummy notification data
  const notifications = [{
    id: 1,
    title: "New meeting request",
    description: "Sarah Connor wants to meet you",
    time: "10m ago",
    read: false
  }, {
    id: 2,
    title: "Meeting reminder",
    description: "Virtual booth tour in 30 minutes",
    time: "30m ago",
    read: false
  }, {
    id: 3,
    title: "Connection accepted",
    description: "John Doe accepted your connection",
    time: "2h ago",
    read: true
  }];

  // Dummy messages data
  const messages = [{
    id: 1,
    sender: "Alex Kim",
    message: "Do you have time to discuss our partnership?",
    time: "5m ago",
    read: false
  }, {
    id: 2,
    sender: "Sarah Connor",
    message: "I'm interested in your products",
    time: "1h ago",
    read: false
  }, {
    id: 3,
    sender: "John Doe",
    message: "Thanks for the demo yesterday",
    time: "1d ago",
    read: true
  }];
  return <div className="flex w-full items-stretch flex-wrap max-md:max-w-full">
      <div className="border-slate-200 dark:border-slate-200 flex min-w-50flex-col items-center leading-none justify-center w-[256px] p-2 border-r border-b px-0 bg-white py-0">
        <Link to="/" className="w-full flex justify-center items-center">
          <img src="/lovable-uploads/f3a6544b-2304-40a7-b580-54f250614975.png" alt="AI Summit '26 Logo" className="h-12 object-contain" />
        </Link>
      </div>
      <div className="min-w-60 flex-1 shrink basis-4 max-md:max-w-full">
        <nav className="border-slate-200 dark:border-slate-200 flex w-full items-center gap-3 px-4 border-b max-md:max-w-full py-[12px] bg-white">
          <div className="self-stretch flex min-w-60 w-full items-center gap-[40px_100px] justify-between flex-wrap flex-1 shrink basis-[0%] my-auto max-md:max-w-full">
            <div className="self-stretch flex min-w-60 items-center text-base text-slate-950 dark:text-white font-medium whitespace-nowrap leading-none w-[468px] my-auto max-md:max-w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="self-stretch flex w-[200px] items-center gap-2.5 my-auto px-3 py-2 rounded-md">
                    <div className="self-stretch flex w-[137px] items-center gap-2 my-auto">
                      <Avatar className="h-6 w-6">
                        {currentRole === "exhibitor" ? <div className="bg-indigo-600 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            E
                          </div> : currentRole === "speaker" ? <div className="bg-amber-600 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            S
                          </div> : currentRole === "sponsor" ? <div className="bg-green-600 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            $
                          </div> : <div className="bg-blue-600 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            A
                          </div>}
                      </Avatar>
                      <span className="self-stretch my-auto">
                        Eventify
                        <ChevronDown className="h-4 w-4 ml-1 inline-block" />
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className={`${currentRole === "exhibitor" ? "bg-slate-100 dark:bg-gray-800" : ""} cursor-pointer`} onClick={() => handleRoleChange("exhibitor")}>
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>Exhibitor</span>
                    {currentRole === "exhibitor" && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem className={`${currentRole === "speaker" ? "bg-slate-100 dark:bg-gray-800" : ""} cursor-pointer`} onClick={() => handleRoleChange("speaker")}>
                    <Mic className="h-4 w-4 mr-2" />
                    <span>Speaker</span>
                    {currentRole === "speaker" && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem className={`${currentRole === "sponsor" ? "bg-slate-100 dark:bg-gray-800" : ""} cursor-pointer`} onClick={() => handleRoleChange("sponsor")}>
                    <UserCircle className="h-4 w-4 mr-2" />
                    <span>Sponsor</span>
                    {currentRole === "sponsor" && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem className={`${currentRole === "attendee" ? "bg-slate-100 dark:bg-gray-800" : ""} cursor-pointer`} onClick={() => handleRoleChange("attendee")}>
                    <User className="h-4 w-4 mr-2" />
                    <span>Attendee</span>
                    {currentRole === "attendee" && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="self-stretch flex min-w-60 items-center gap-8 my-auto">
              <div className="self-stretch flex min-w-60 items-center gap-2 my-auto">
                {/* Support Icon - Updated to Headset */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="self-stretch flex min-h-9 items-center gap-2 justify-center w-9 my-auto p-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-gray-800"
                  onClick={() => navigate('/support')}
                >
                  <Headset className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                </Button>
                
                {/* Notifications Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="self-stretch flex min-h-9 items-center gap-2 justify-center w-9 my-auto p-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-gray-800 relative">
                      <Bell className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                      <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel className="flex justify-between items-center">
                      <span>Notifications</span>
                      <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                        Mark all as read
                      </Button>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notifications.map(notification => <DropdownMenuItem key={notification.id} className={`p-3 cursor-pointer ${!notification.read ? 'bg-slate-50 dark:bg-gray-800' : ''}`}>
                        <div className="flex items-start gap-3">
                          <div className={`rounded-full p-2 ${!notification.read ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}>
                            <BellIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>{notification.title}</p>
                            <p className="text-xs text-slate-500 mt-1">{notification.description}</p>
                            <p className="text-xs text-slate-400 mt-2">{notification.time}</p>
                          </div>
                          {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                        </div>
                      </DropdownMenuItem>)}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="py-2 justify-center cursor-pointer" onClick={() => navigate('/notifications')}>
                      <span className="text-sm text-blue-600">View all notifications</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Messages Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="self-stretch flex min-h-9 items-center gap-2 justify-center w-9 my-auto p-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-gray-800 relative">
                      <MessageSquare className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                      <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                        {messages.filter(m => !m.read).length}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel className="flex justify-between items-center">
                      <span>Messages</span>
                      <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                        Mark all as read
                      </Button>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {messages.map(message => <DropdownMenuItem key={message.id} className={`p-3 cursor-pointer ${!message.read ? 'bg-slate-50 dark:bg-gray-800' : ''}`}>
                        <div className="flex items-start gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-indigo-100 text-indigo-800">
                              {message.sender.split(' ').map(name => name[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className={`text-sm ${!message.read ? 'font-medium' : ''}`}>{message.sender}</p>
                            <p className="text-xs text-slate-500 mt-1">{message.message}</p>
                            <p className="text-xs text-slate-400 mt-2">{message.time}</p>
                          </div>
                          {!message.read && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                        </div>
                      </DropdownMenuItem>)}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="py-2 justify-center cursor-pointer" onClick={() => navigate('/inbox')}>
                      <span className="text-sm text-blue-600">View all messages</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Settings Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="self-stretch flex min-h-9 items-center gap-2 justify-center w-9 my-auto p-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-gray-800">
                      <Settings className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
                      <UserCog className="h-4 w-4 mr-2" />
                      <span>Account Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span>Company Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/products')}>
                      <Package className="h-4 w-4 mr-2" />
                      <span>Our Products</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Bell className="h-4 w-4 mr-2" />
                      <span>Notification Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Inbox className="h-4 w-4 mr-2" />
                      <span>Inbox Preferences</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      <span>Help & Support</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="secondary" onClick={() => navigate('/activate-team')} className="self-stretch min-h-9 gap-2 tracking-[-0.08px] leading-none my-auto rounded-md text-blue-50 bg-blue-700 hover:bg-blue-600 text-sm px-[23px] font-medium">
                  My Team
                </Button>
                
                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="border-slate-200 dark:border-gray-700 border self-stretch flex items-center gap-1 my-auto pl-1 pr-2 py-1 rounded-full border-solid hover:bg-slate-100 dark:hover:bg-gray-800 cursor-pointer">
                      <Avatar className="h-7 w-7">
                        <img src="https://cdn.builder.io/api/v1/image/assets/4f5dcc361c1f41d3969c5785002c7d1e/04119bb9cfbed970d5bcf9384747e39da3836ebf?placeholderIfAbsent=true" className="aspect-[1] object-contain w-7 self-stretch shrink-0 my-auto rounded-full" alt="Profile" />
                      </Avatar>
                      <ChevronDown className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center gap-2 p-2">
                      <Avatar className="h-8 w-8">
                        <img src="https://cdn.builder.io/api/v1/image/assets/4f5dcc361c1f41d3969c5785002c7d1e/04119bb9cfbed970d5bcf9384747e39da3836ebf?placeholderIfAbsent=true" className="aspect-[1] object-contain w-full h-full rounded-full" alt="Profile" />
                      </Avatar>
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium">Jane Smith</p>
                        <p className="text-xs text-slate-500">jane@eventify.com</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      <span>My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/settings')}>
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Account Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                      <Briefcase className="h-4 w-4 mr-2" />
                      <span>Company Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/inbox')}>
                      <MessagesSquare className="h-4 w-4 mr-2" />
                      <span>My Messages</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/export')}>
                      <Download className="h-4 w-4 mr-2" />
                      <span>Export Data</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600" onClick={() => navigate('/signout')}>
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </nav>
        {/* Second nav bar removed as requested */}
      </div>
    </div>;
};
