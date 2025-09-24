
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

export const NewsSection: React.FC = () => {
  const navigate = useNavigate();
  
  const news = [
    {
      title: "AI Summit 2026 Keynote Speakers Announced",
      summary: "Leading experts in AI and machine learning will share their insights...",
      time: "2 hours ago",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "New Networking Features Launched",
      summary: "Enhanced attendee matching and meeting scheduling now available...",
      time: "5 hours ago",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop&crop=center"
    },
    {
      title: "Exhibitor Spotlight: Innovation Showcase",
      summary: "Discover the latest products and services from our exhibitors...",
      time: "1 day ago",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop&crop=center"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">News</h2>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/news')}
          className="text-blue-600 hover:text-blue-700"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {news.map((article, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <Clock className="w-3 h-3" />
                  {article.time}
                </div>
                <h3 className="font-medium text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {article.summary}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
