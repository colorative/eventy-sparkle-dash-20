
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuicklinksSettingsModal, QuicklinkSettings } from "./QuicklinksSettingsModal";
import { 
  Calendar, 
  Mic, 
  Users, 
  Building2, 
  MessagesSquare, 
  Map, 
  Camera, 
  Newspaper, 
  Trophy, 
  ClipboardList, 
  BookOpen, 
  StickyNote,
  MessageCircle,
  Video,
  Bookmark,
  ExternalLink,
  Bell,
  Mail,
  Settings
} from "lucide-react";

const availableIcons = {
  Calendar, Mic, Users, Building2, MessagesSquare, Map, Camera,
  Newspaper, Trophy, ClipboardList, BookOpen, StickyNote,
  MessageCircle, Video, Bookmark, ExternalLink, Bell, Mail
};

export const QuicklinksSection: React.FC = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<QuicklinkSettings>({
    layout: "3-column",
    showLabels: true,
    displayMode: "icon-with-title",
    customizations: {}
  });

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('quicklinks-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('quicklinks-settings', JSON.stringify(settings));
  }, [settings]);

  const quicklinks = [
    {
      title: "Agenda",
      icon: <Calendar className="h-5 w-5" />,
      path: "/agenda"
    },
    {
      title: "Speakers", 
      icon: <Mic className="h-5 w-5" />,
      path: "/speakers"
    },
    {
      title: "Sponsors",
      icon: <Building2 className="h-5 w-5" />,
      path: "/sponsors"
    },
    {
      title: "Exhibitors",
      icon: <Users className="h-5 w-5" />,
      path: "/exhibitors"
    },
    {
      title: "Social Feed",
      icon: <MessagesSquare className="h-5 w-5" />,
      path: "/social-feed"
    },
    {
      title: "Maps",
      icon: <Map className="h-5 w-5" />,
      path: "/floorplans-list"
    },
    {
      title: "Gallery",
      icon: <Camera className="h-5 w-5" />,
      path: "/gallery"
    },
    {
      title: "News",
      icon: <Newspaper className="h-5 w-5" />,
      path: "/news"
    },
    {
      title: "Gamification",
      icon: <Trophy className="h-5 w-5" />,
      path: "/gamification"
    },
    {
      title: "Survey",
      icon: <ClipboardList className="h-5 w-5" />,
      path: "/survey"
    },
    {
      title: "Event Guide",
      icon: <BookOpen className="h-5 w-5" />,
      path: "/event-guide"
    },
    {
      title: "Notes",
      icon: <StickyNote className="h-5 w-5" />,
      path: "/notes"
    },
    {
      title: "Community Forum",
      icon: <MessageCircle className="h-5 w-5" />,
      path: "/community-forum"
    },
    {
      title: "Meetings",
      icon: <Video className="h-5 w-5" />,
      path: "/meetings"
    },
    {
      title: "Bookmarks",
      icon: <Bookmark className="h-5 w-5" />,
      path: "/bookmarks"
    },
    {
      title: "Webview",
      icon: <ExternalLink className="h-5 w-5" />,
      path: "/external-link"
    },
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      path: "/notifications"
    },
    {
      title: "Messages",
      icon: <Mail className="h-5 w-5" />,
      path: "/inbox"
    }
  ];

  const handleClick = (path: string) => {
    navigate(path);
  };

  const getGridColumns = () => {
    switch (settings.layout) {
      case "list": return "grid-cols-1";
      case "2-column": return "grid-cols-2";
      case "3-column": return "grid-cols-3";
      case "4-column": return "grid-cols-4";
      case "6-column": return "grid-cols-6";
      default: return "grid-cols-3";
    }
  };

  const getCustomIcon = (title: string, originalIcon: React.ReactNode) => {
    const customIconName = settings.customizations[title]?.iconName;
    if (customIconName && availableIcons[customIconName as keyof typeof availableIcons]) {
      const IconComponent = availableIcons[customIconName as keyof typeof availableIcons];
      return <IconComponent className="h-5 w-5" />;
    }
    return originalIcon;
  };

  const getItemStyles = (title: string) => {
    const customization = settings.customizations[title];
    const styles: React.CSSProperties = {};
    
    if (customization?.backgroundColor) {
      styles.backgroundColor = customization.backgroundColor;
    }
    
    if (customization?.backgroundImage) {
      styles.backgroundImage = `url(${customization.backgroundImage})`;
      styles.backgroundSize = 'cover';
      styles.backgroundPosition = 'center';
    }
    
    return styles;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Quick Links</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSettings(true)}
          className="text-slate-500 hover:text-slate-700"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      
      <div className={cn("grid gap-3", getGridColumns())}>
        {quicklinks.map((link) => (
          <QuicklinkItem
            key={link.title}
            {...link}
            icon={getCustomIcon(link.title, link.icon)}
            onClick={() => handleClick(link.path)}
            showLabel={settings.showLabels}
            displayMode={settings.displayMode}
            layout={settings.layout}
            customStyles={getItemStyles(link.title)}
          />
        ))}
      </div>

      <QuicklinksSettingsModal
        open={showSettings}
        onOpenChange={setShowSettings}
        settings={settings}
        onSettingsChange={setSettings}
        quicklinks={quicklinks}
      />
    </div>
  );
};

const QuicklinkItem = ({
  title,
  icon,
  onClick,
  showLabel,
  displayMode,
  layout,
  customStyles,
}: {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  showLabel: boolean;
  displayMode: string;
  layout: string;
  customStyles: React.CSSProperties;
}) => {
  const isVerticalLayout = layout === "6-column";
  const isSingleColumn = layout === "list";
  const isHorizontalLayout = ["2-column", "3-column", "4-column"].includes(layout);

  const shouldShowIcon = displayMode === "icon-with-title" || displayMode === "only-icon";
  const shouldShowTitle = (displayMode === "icon-with-title" || displayMode === "only-title") && showLabel;

  return (
    <Card
      className={cn(
        "cursor-pointer hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors duration-200 border-slate-200 dark:border-slate-700",
        isSingleColumn && "h-16",
        isVerticalLayout && "h-20",
        isHorizontalLayout && "h-14"
      )}
      onClick={onClick}
      style={customStyles}
    >
      <div className={cn(
        "flex items-center justify-center h-full p-4",
        isSingleColumn && "justify-center gap-4",
        isHorizontalLayout && "justify-center gap-3",
        isVerticalLayout && "flex-col gap-1"
      )}>
        {shouldShowIcon && (
          <div className="text-slate-600 dark:text-slate-400 flex-shrink-0">
            {icon}
          </div>
        )}
        
        {shouldShowTitle && (
          <span className={cn(
            "text-xs font-medium text-slate-800 dark:text-slate-100 text-center",
            isSingleColumn && "text-sm",
            isVerticalLayout && "text-center text-xs",
            isHorizontalLayout && "text-xs"
          )}>
            {title}
          </span>
        )}
      </div>
    </Card>
  );
};
