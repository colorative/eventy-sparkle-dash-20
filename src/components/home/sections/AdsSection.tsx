
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

export const AdsSection: React.FC = () => {
  const adImages = [
    "https://colorative.sirv.com/ads-banner-3.png",
    "https://colorative.sirv.com/ad-banner-2.png", 
    "https://colorative.sirv.com/ad-banner-1.png"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % adImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [adImages.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ads</h2>
      <div className="relative">
        <Card className="w-full max-w-[420px] aspect-[7/4] p-0 overflow-hidden">
          <div className="relative w-full h-full">
            {adImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Advertisement ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
        </Card>
        
        {/* Slider dots */}
        <div className="flex gap-2 mt-3">
          {adImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentIndex 
                  ? 'bg-slate-600 dark:bg-slate-300' 
                  : 'bg-slate-300 dark:bg-slate-600'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
