
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Image as ImageIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const SessionMediaGrid: React.FC = () => {
  // Updated with 600x300 (2:1) aspect ratio images
  const sessionMedia = [
    {
      id: 1,
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=300",
      title: "Session Introduction"
    },
    {
      id: 2,
      type: "image",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=300",
      title: "Tech Demonstration"
    },
    {
      id: 3,
      type: "video",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600&h=300",
      title: "Q&A Session"
    },
    {
      id: 4,
      type: "image",
      thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=300",
      title: "Product Overview"
    }
  ];

  const handleMediaClick = (item: any) => {
    if (item.type === "video") {
      toast({
        title: "Video playback",
        description: `Playing ${item.title}`
      });
    } else {
      toast({
        title: "Image view",
        description: `Viewing ${item.title}`
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-5">
        <h2 className="text-xl font-semibold mb-3">Session Media</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {sessionMedia.map((item) => (
            <div 
              key={item.id}
              className="relative rounded-md overflow-hidden bg-gray-100 cursor-pointer group"
              style={{ aspectRatio: '2/1' }}
              onClick={() => handleMediaClick(item)}
            >
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-1.5 rounded-full bg-white/70">
                  {item.type === "video" ? (
                    <Play className="h-5 w-5 text-indigo-600" />
                  ) : (
                    <ImageIcon className="h-5 w-5 text-indigo-600" />
                  )}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-white text-xs font-medium">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
