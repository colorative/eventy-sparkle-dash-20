
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MapPin, Bookmark } from "lucide-react";
import BoringAvatar from "boring-avatars";
import { HorizontalScroller } from "@/components/ui/horizontal-scroller";

export const SchedulesSection: React.FC = () => {
  const navigate = useNavigate();
  
  const sessions = [
    {
      title: "Where and How Payments will be Most Impacted by Blockchain Innovation",
      speaker: "Daniel Jack Miller",
      company: "Modern Arch",
      date: "Jul 10, 2026",
      time: "12:30 PM - 1:00 PM",
      venue: "Session Hall 2",
      category: "Crown Down"
    },
    {
      title: "Generative AI in Enterprise Applications",
      speaker: "Sarah Johnson",
      company: "AI Systems",
      date: "Jul 11, 2026",
      time: "2:00 PM - 2:30 PM", 
      venue: "Main Auditorium",
      category: "Tech Innovation"
    },
    {
      title: "Future of Remote Collaboration",
      speaker: "Mike Chen",
      company: "CollabTech",
      date: "Jul 12, 2026",
      time: "3:30 PM - 4:00 PM",
      venue: "Workshop Room A",
      category: "Workplace"
    },
    {
      title: "Machine Learning at Scale",
      speaker: "Dr. Lisa Wang",
      company: "DataCore",
      date: "Jul 10, 2026",
      time: "4:00 PM - 4:30 PM",
      venue: "Tech Hall",
      category: "AI & ML"
    },
    {
      title: "The Future of Cybersecurity",
      speaker: "Alex Rodriguez",
      company: "SecureNet",
      date: "Jul 11, 2026",
      time: "9:00 AM - 9:30 AM",
      venue: "Security Center",
      category: "Security"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Sessions</h2>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/agenda')}
          className="text-blue-600 hover:text-blue-700"
        >
          View All
        </Button>
      </div>
      <HorizontalScroller>
        {sessions.map((session, index) => (
          <Card key={index} className="flex-shrink-0 w-80">
            <CardContent className="p-4">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                {session.category}
              </div>
              <div className="min-h-[3rem] mb-3">
                <h3 className="font-medium text-sm text-slate-900 dark:text-white line-clamp-2">
                  {session.title}
                </h3>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <BoringAvatar
                    size={40}
                    name={session.speaker}
                    variant="beam"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-blue-600 truncate">{session.speaker}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{session.company}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  {session.date}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <div className="bg-slate-800 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                    {session.time}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 min-w-0">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{session.venue}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="flex-shrink-0">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </HorizontalScroller>
    </div>
  );
};
