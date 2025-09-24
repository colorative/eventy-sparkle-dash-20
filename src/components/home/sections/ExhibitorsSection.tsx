
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { HorizontalScroller } from "@/components/ui/horizontal-scroller";

export const ExhibitorsSection: React.FC = () => {
  const navigate = useNavigate();
  
  const exhibitors = [
    {
      name: "TechCorp Solutions & Innovation",
      booth: "A-15",
      bgColor: "#0a4a87",
      logo: "T",
      coverPhoto: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop"
    },
    {
      name: "CloudFirst Digital Technologies", 
      booth: "B-22",
      bgColor: "#1976d2",
      logo: "C",
      coverPhoto: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop"
    },
    {
      name: "DataSync",
      booth: "C-08",
      bgColor: "#ff6d00",
      logo: "D",
      coverPhoto: null
    },
    {
      name: "AI Labs Advanced Research & Development",
      booth: "D-12",
      bgColor: "#5e35b1",
      logo: "A",
      coverPhoto: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=200&fit=crop"
    },
    {
      name: "BlockChain Pro",
      booth: "E-05",
      bgColor: "#00c853",
      logo: "B",
      coverPhoto: null
    },
    {
      name: "NeuralNet Systems",
      booth: "F-18",
      bgColor: "#ff7043",
      logo: "N",
      coverPhoto: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=200&fit=crop"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Exhibitors</h2>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/exhibitors')}
          className="text-blue-600 hover:text-blue-700"
        >
          View All
        </Button>
      </div>
      <HorizontalScroller>
        {exhibitors.map((exhibitor, index) => (
          <div key={index} className="flex-shrink-0 cursor-pointer group">
            {exhibitor.coverPhoto ? (
              // Standard Exhibitor Card with Cover Photo
              <div className="w-[280px] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
                {/* Cover Photo */}
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={exhibitor.coverPhoto}
                    alt={`${exhibitor.name} cover`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                {/* Profile Section */}
                <div className="relative px-4 pb-4">
                  {/* Logo positioned to overlap cover photo */}
                  <div className="relative -mt-8 mb-3">
                    <div 
                      className="w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center border-2 border-white shadow-sm"
                      style={{ backgroundColor: exhibitor.bgColor }}
                    >
                      <div className="text-white text-2xl md:text-3xl font-bold">{exhibitor.logo}</div>
                    </div>
                  </div>
                  
                  {/* Company Info */}
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg leading-tight mb-1 truncate">
                      {exhibitor.name}
                    </h3>
                    <p className="text-sm text-slate-500">Booth {exhibitor.booth}</p>
                  </div>
                </div>
              </div>
            ) : (
              // Logo-Only Card (Match height of standard cards, adjust width proportionally)
              <div className="w-[224px] h-[224px] bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md dark:bg-gray-800 dark:border-gray-700">
                {/* Centered Logo Section - full width */}
                <div className="h-full flex flex-col items-center justify-center p-4">
                  <div 
                    className="w-full h-24 md:h-28 rounded-lg flex items-center justify-center mb-3 shadow-sm"
                    style={{ backgroundColor: exhibitor.bgColor }}
                  >
                    <div className="text-white text-5xl md:text-6xl font-bold leading-none">{exhibitor.logo}</div>
                  </div>
                  
                  {/* Company Info */}
                  <div className="text-center">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-base leading-tight mb-1 px-2">
                      {exhibitor.name}
                    </h3>
                    <p className="text-sm text-slate-500">Booth {exhibitor.booth}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </HorizontalScroller>
    </div>
  );
};
