
import React from "react";
import BoringAvatar from "boring-avatars";
import { Speaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface CoverPhotoSectionProps {
  name: string;
  role: string;
  company: string;
  coverPhoto: string;
}

export const CoverPhotoSection: React.FC<CoverPhotoSectionProps> = ({
  name,
  role,
  company,
  coverPhoto,
}) => {
  const speakName = () => {
    const utterance = new SpeechSynthesisUtterance(name);
    window.speechSynthesis.speak(utterance);
    
    toast({
      title: "Speaking",
      description: `Speaking ${name}`,
    });
  };

  return (
    <div className="relative h-60 mb-24 rounded-lg overflow-hidden">
      {/* Cover photo container with gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 w-full h-full">
        {/* Main cover photo with fixed aspect ratio */}
        <img 
          src={coverPhoto} 
          alt="Cover" 
          className="w-full h-full object-cover"
          style={{ aspectRatio: '600/300' }}
        />
        
        {/* Blurred background extension */}
        <div 
          className="absolute inset-0 bg-no-repeat bg-cover bg-center z-[-1]" 
          style={{ 
            backgroundImage: `url(${coverPhoto})`,
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
        {/* Overlay to enhance text visibility */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Avatar and name section */}
      <div className="absolute -bottom-16 left-0 ml-8 flex flex-col items-start z-20">
        <div className="relative">
          <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white bg-white z-20 relative">
            <BoringAvatar
              size={128}
              name={name}
              variant="marble"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </div>
        </div>
        <div className="mt-4 text-left">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">{name}</h1>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-2" 
              onClick={speakName}
              title="Speak name"
            >
              <Speaker className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-gray-600 mt-1">{role} at {company}</p>
        </div>
      </div>
    </div>
  );
};
