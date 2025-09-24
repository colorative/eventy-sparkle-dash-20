
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Avatar from "boring-avatars";
import { Reply } from "lucide-react";

export const MessagesSection: React.FC = () => {
  const navigate = useNavigate();
  
  const handleOpenChat = () => {
    navigate('/inbox');
  };

  const handleReply = () => {
    navigate('/inbox');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Messages</h2>
      <Card className="overflow-hidden">
        {/* Top Section - Header */}
        <div className="relative bg-gray-50 dark:bg-gray-800 p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                You've got a new message!
              </h3>
              <button 
                onClick={handleOpenChat}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
              >
                TAP TO OPEN CHAT
              </button>
            </div>
            
            {/* SVG Icon on the right */}
            <div className="flex-shrink-0 ml-6">
              <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_10842_74615)">
                  <rect x="18" y="18" width="40" height="40" rx="20" fill="#2AB849" shapeRendering="crispEdges"/>
                  <rect x="15" y="15" width="46" height="46" rx="23" stroke="#2AB849" strokeOpacity="0.5" strokeWidth="6" shapeRendering="crispEdges"/>
                  <path d="M33 34.5H38M33 38H41M35.6837 44H42.2C43.8802 44 44.7202 44 45.362 43.673C45.9265 43.3854 46.3854 42.9265 46.673 42.362C47 41.7202 47 40.8802 47 39.2V33.8C47 32.1198 47 31.2798 46.673 30.638C46.3854 30.0735 45.9265 29.6146 45.362 29.327C44.7202 29 43.8802 29 42.2 29H33.8C32.1198 29 31.2798 29 30.638 29.327C30.0735 29.6146 29.6146 30.0735 29.327 30.638C29 31.2798 29 32.1198 29 33.8V46.3355C29 46.8684 29 47.1348 29.1092 47.2716C29.2042 47.3906 29.3483 47.4599 29.5005 47.4597C29.6756 47.4595 29.8837 47.2931 30.2998 46.9602L32.6852 45.0518C33.1725 44.662 33.4162 44.4671 33.6875 44.3285C33.9282 44.2055 34.1844 44.1156 34.4492 44.0613C34.7477 44 35.0597 44 35.6837 44Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <filter id="filter0_d_10842_74615" x="0" y="0" width="76" height="76" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="6"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.721875 0 0 0 0 0.875 0 0 0 0 0.756196 0 0 0 0.47 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10842_74615"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10842_74615" result="shape"/>
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Message Preview */}
        <div className="p-6 pt-4 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar
                size={40}
                name="Esther Howard"
                variant="marble"
                colors={["#92A3FD", "#9DCEFF", "#FEA1A1", "#FEC7D7", "#D9B3FF"]}
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-slate-900 dark:text-white">Esther Howard</h4>
                  <span className="text-xs text-gray-500">12 Jan</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Hi, I've been calling you and your...
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleReply}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2"
            >
              <Reply className="h-4 w-4" />
              Reply
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
