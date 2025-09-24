
import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Banner = () => {
  const [showBanner, setShowBanner] = useState(true);
  
  if (!showBanner) return null;
  
  return (
    <div className="relative overflow-hidden rounded-lg mb-4 bg-blue-600">
      <div className="flex items-center h-[110px]">
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-1 text-white">Event Gamification</h2>
          <p className="text-white">Complete challenges, earn points, and win prizes!</p>
        </div>
        <img 
          src="https://futureconnectdemo.eventify.io/p/1c63b91ed3d7f79a053ffd8bb8efa1e6.png" 
          alt="Gamification" 
          className="h-[110px] object-contain pr-10" 
        />
      </div>
      <Button 
        size="icon" 
        variant="ghost" 
        className="absolute top-2 right-2 text-white hover:bg-blue-700"
        onClick={() => setShowBanner(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
    </div>
  );
};

export default Banner;
