
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export const CompleteProfileSection: React.FC = () => {
  const navigate = useNavigate();
  
  const handleEditProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Complete Profile</h2>
      <Card className="overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Background with SVG Overlay - reduced height by 12px */}
        <div className="relative h-12 bg-white">
          {/* SVG Overlay positioned at top-left with fixed dimensions */}
          <div className="absolute top-0 left-0">
            <svg 
              width="636" 
              height="77" 
              viewBox="0 0 636 77" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="block"
              style={{ width: '636px', height: '77px' }}
            >
              <path d="M636 0H0V46H232.847C253.153 46 263.251 55.2707 272.403 63.6726C279.987 70.6346 286.92 77 298.473 77H636V46V0Z" fill="url(#paint0_linear_10841_74520)"/>
              <defs>
                <linearGradient id="paint0_linear_10841_74520" x1="0" y1="46" x2="441.5" y2="46" gradientUnits="userSpaceOnUse">
                  <stop offset="0.0990295" stopColor="#E7E2FF"/>
                  <stop offset="0.485577" stopColor="#FFDEC8"/>
                  <stop offset="1" stopColor="white"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          
          {/* Plus Button Overlay */}
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-6 left-6 bg-white border-gray-300 rounded-full h-12 w-12 shadow-sm hover:shadow-md"
            onClick={handleEditProfile}
          >
            <Plus className="h-6 w-6 text-blue-600" />
          </Button>
        </div>
        
        {/* Card Content */}
        <div className="p-6 pt-9 relative">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Complete your profile!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Personalize your profile with a profile picture.
              </p>
            </div>
            
            {/* Bottom Right Button */}
            <Button 
              variant="default"
              onClick={handleEditProfile}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add a Picture
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
