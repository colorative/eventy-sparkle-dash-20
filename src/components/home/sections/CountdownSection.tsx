
'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

export const CountdownSection: React.FC = () => {
  // Event date: July 10, 2026 at 9:00 AM
  const eventDate = new Date('2026-07-10T09:00:00');
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = eventDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDate]);

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-stretch min-h-[112px]">
          {/* Left side - SVG Icon */}
          <div className="flex items-center justify-center">
            <svg width="102" height="88" viewBox="0 0 102 88" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <rect x="22" y="24" width="40" height="40" rx="20" fill="#105EFB"/>
              <rect x="2" y="4" width="80" height="80" rx="40" stroke="#105EFB" strokeOpacity="0.1" strokeWidth="40"/>
              <g filter="url(#filter0_d_10772_24863)">
                <rect x="22" y="24" width="40" height="40" rx="20" fill="#105EFB" shapeRendering="crispEdges"/>
                <rect x="19" y="21" width="46" height="46" rx="23" stroke="#105EFB" strokeOpacity="0.55" strokeWidth="6" shapeRendering="crispEdges"/>
                <path d="M42 44L37.7271 40.4393C37.0923 39.9102 36.7748 39.6457 36.5466 39.3214C36.3444 39.0341 36.1943 38.7135 36.103 38.3743C36 37.9914 36 37.5782 36 36.7518V34M42 44L46.2729 40.4393C46.9077 39.9102 47.2252 39.6457 47.4534 39.3214C47.6556 39.0341 47.8057 38.7135 47.897 38.3743C48 37.9914 48 37.5782 48 36.7518V34M42 44L37.7271 47.5607C37.0923 48.0898 36.7748 48.3543 36.5466 48.6786C36.3444 48.9659 36.1943 49.2865 36.103 49.6257C36 50.0086 36 50.4218 36 51.2482V54M42 44L46.2729 47.5607C46.9077 48.0898 47.2252 48.3543 47.4534 48.6786C47.6556 48.9659 47.8057 49.2865 47.897 49.6257C48 50.0086 48 50.4218 48 51.2482V54M34 34H50M34 54H50" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <filter id="filter0_d_10772_24863" x="4" y="6" width="76" height="76" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset/>
                  <feGaussianBlur stdDeviation="6"/>
                  <feComposite in2="hardAlpha" operator="out"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0.721875 0 0 0 0 0.875 0 0 0 0 0.756196 0 0 0 0.47 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10772_24863"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10772_24863" result="shape"/>
                </filter>
              </defs>
            </svg>
          </div>
          
          {/* Middle - Text content */}
          <div className="flex-1 flex flex-col justify-center px-6 py-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
              Get ready for something amazing!
            </h3>
            <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              EVENT IS GOING LIVE IN
            </p>
          </div>
          
          {/* Right side - Countdown */}
          <div className="flex items-center gap-2 px-6 py-4">
            <div className="text-center">
              <div className="bg-white text-gray-900 rounded-lg px-3 py-2 w-12 h-12 flex items-center justify-center">
                <div className="text-xl font-mono font-bold tabular-nums leading-none">
                  {formatNumber(timeLeft.days)}
                </div>
              </div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                Days
              </div>
            </div>
            
            <div className="text-xl font-bold text-gray-800 dark:text-gray-200 mx-1">:</div>
            
            <div className="text-center">
              <div className="bg-white text-gray-900 rounded-lg px-3 py-2 w-12 h-12 flex items-center justify-center">
                <div className="text-xl font-mono font-bold tabular-nums leading-none">
                  {formatNumber(timeLeft.hours)}
                </div>
              </div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                Hours
              </div>
            </div>
            
            <div className="text-xl font-bold text-gray-800 dark:text-gray-200 mx-1">:</div>
            
            <div className="text-center">
              <div className="bg-white text-gray-900 rounded-lg px-3 py-2 w-12 h-12 flex items-center justify-center">
                <div className="text-xl font-mono font-bold tabular-nums leading-none">
                  {formatNumber(timeLeft.minutes)}
                </div>
              </div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                Minutes
              </div>
            </div>
            
            <div className="text-xl font-bold text-gray-800 dark:text-gray-200 mx-1">:</div>
            
            <div className="text-center">
              <div className="bg-white text-gray-900 rounded-lg px-3 py-2 w-12 h-12 flex items-center justify-center">
                <div className="text-xl font-mono font-bold tabular-nums leading-none">
                  {formatNumber(timeLeft.seconds)}
                </div>
              </div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
                Seconds
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
