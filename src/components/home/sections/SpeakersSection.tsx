
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Bookmark } from "lucide-react";

export const SpeakersSection: React.FC = () => {
  const navigate = useNavigate();
  
  const speakers = [
    {
      name: "Dr. Sophia Chen",
      position: "Director of AI Research",
      company: "NeuroTech Labs",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Michael Rodriguez",
      position: "Chief Innovation Officer", 
      company: "FutureTech Industries",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Dr. James Wilson",
      position: "Quantum Computing Researcher",
      company: "Quantum Dynamics",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Sarah Johnson",
      position: "Head of Product",
      company: "TechNova",
      imageUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Dr. Robert Chang",
      position: "Director of Robotics",
      company: "Automation Systems Inc.",
      imageUrl: "https://images.unsplash.com/photo-1577880216142-8549e9488dad?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Speakers</h2>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/speakers')}
          className="text-blue-600 hover:text-blue-700"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {speakers.map((speaker, index) => (
          <Card 
            key={index}
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 flex flex-col"
          >
            <div className="relative">
              <AspectRatio ratio={3 / 4} className="bg-gray-100 dark:bg-gray-800">
                <img src={speaker.imageUrl} alt={speaker.name} className="object-cover w-full h-full" />
              </AspectRatio>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute top-2 right-2 bg-white border-gray-300 rounded-full h-8 w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  // Bookmark functionality would go here
                }}
              >
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-3 flex flex-col flex-1">
              <h3 className="font-semibold text-sm dark:text-white">{speaker.name}</h3>
              <div className="mb-3 h-10 text-xs">
                <span className="text-gray-600 dark:text-gray-400">{speaker.position} at </span>
                <span className="text-blue-600 dark:text-blue-400">{speaker.company}</span>
              </div>
              
              <div className="flex justify-center mt-auto">
                <Button 
                  variant="outline"
                  size="sm"
                  className="text-xs border-gray-300 w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Navigate to speaker profile
                  }} 
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
