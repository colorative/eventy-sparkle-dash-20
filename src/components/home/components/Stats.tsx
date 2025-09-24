
import React from "react";
import { Link } from "react-router-dom";
import { 
  Eye,
  MessageSquare,
  Building,
  Users,
  Bookmark,
  Mail,
  MousePointerClick
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

interface StatItem {
  value: number;
  label: string;
  icon: React.ReactNode;
  link: string;
  spotlightColor: string;
}

export const Stats: React.FC = () => {
  const stats: StatItem[] = [
    {
      value: 7,
      label: "Interested in Me",
      icon: <Eye className="h-6 w-6 text-indigo-500" />,
      link: "/interested",
      spotlightColor: "#6366f130"
    },
    {
      value: 3,
      label: "Pending Meetings",
      icon: <MessageSquare className="h-6 w-6 text-green-500" />,
      link: "/meetings",
      spotlightColor: "#10b98130"
    },
    {
      value: 24,
      label: "Total Leads",
      icon: <Building className="h-6 w-6 text-blue-500" />,
      link: "/leads",
      spotlightColor: "#3b82f630"
    },
    {
      value: 236,
      label: "Our Exhibitors",
      icon: <Users className="h-6 w-6 text-purple-500" />,
      link: "/exhibitors",
      spotlightColor: "#a855f730"
    },
    {
      value: 2145,
      label: "Attendees",
      icon: <Users className="h-6 w-6 text-indigo-500" />,
      link: "/attendees",
      spotlightColor: "#6366f130"
    },
    {
      value: 71,
      label: "Recommended for Me",
      icon: <Users className="h-6 w-6 text-purple-500" />,
      link: "/attendees?tab=recommended",
      spotlightColor: "#a855f730"
    },
    {
      value: 456,
      label: "Profile Views",
      icon: <Eye className="h-6 w-6 text-indigo-500" />,
      link: "/profile-views",
      spotlightColor: "#6366f130"
    },
    {
      value: 89,
      label: "Messages",
      icon: <MessageSquare className="h-6 w-6 text-green-500" />,
      link: "/messages",
      spotlightColor: "#10b98130"
    },
    {
      value: 42,
      label: "Bookmarked",
      icon: <Bookmark className="h-6 w-6 text-purple-500" />,
      link: "/bookmarked",
      spotlightColor: "#a855f730"
    },
    {
      value: 231,
      label: "Email Clicks",
      icon: <Mail className="h-6 w-6 text-blue-500" />,
      link: "/email-clicks",
      spotlightColor: "#3b82f630"
    },
    {
      value: 156,
      label: "Ad Clicks",
      icon: <MousePointerClick className="h-6 w-6 text-orange-500" />,
      link: "/ad-clicks",
      spotlightColor: "#f9731630"
    },
    {
      value: 512,
      label: "Booth Visits",
      icon: <Building className="h-6 w-6 text-red-500" />,
      link: "/booth-visits",
      spotlightColor: "#ef444430"
    }
  ];

  return (
    <div className="w-full mt-1 max-md:max-w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
          >
            <SpotlightCard 
              className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 self-stretch flex flex-col items-stretch justify-center my-auto px-6 py-3 rounded-lg transition-all"
              spotlightColor={stat.spotlightColor}
            >
              <div className="flex w-full items-center justify-between">
                <div className="self-stretch flex-1 shrink basis-[0%] my-auto">
                  <div className="text-slate-950 dark:text-white text-2xl font-medium leading-none tracking-[-0.14px]">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-none mt-1.5">
                    {stat.label}
                  </div>
                </div>
                <div className="self-stretch flex min-h-[62px] flex-col w-6 my-auto">
                  {stat.icon}
                </div>
              </div>
            </SpotlightCard>
          </Link>
        ))}
      </div>
    </div>
  );
};
