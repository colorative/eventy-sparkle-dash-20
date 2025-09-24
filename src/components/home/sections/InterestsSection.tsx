
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { SelectorChips } from "@/components/ui/selector-chips";
import { useNavigate } from "react-router-dom";

const suggestedInterests = [
  "Angular",
  "Svelte", 
  "Python",
  "CSS",
  "Bootstrap",
  "Material",
  "Next.js",
  "React",
  "Vue.js",
  "Ember.js",
  "Nuxt.js",
  "More"
];

export const InterestsSection: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleInterestsChange = (selected: string[]) => {
    setSelectedInterests(selected);
  };

  const handleMoreClick = () => {
    navigate("/profile");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add Interests</h2>
      <Card className="overflow-hidden">
        {/* Gradient Header - More Compact */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_10777_24917)">
                  <rect x="12" y="12" width="40" height="40" rx="20" fill="white"/>
                  <path d="M31 35H28C26.1362 35 25.2044 35 24.4693 35.3045C23.4892 35.7105 22.7105 36.4892 22.3045 37.4693C22 38.2044 22 39.1362 22 41M35.5 23.2908C36.9659 23.8841 38 25.3213 38 27M31.9999 41.5L34.025 41.095C34.2015 41.0597 34.2898 41.042 34.3721 41.0097C34.4452 40.9811 34.5147 40.9439 34.579 40.899C34.6516 40.8484 34.7152 40.7848 34.8426 40.6574L41.5 34C42.0524 33.4477 42.0523 32.5523 41.5 32C40.9477 31.4477 40.0523 31.4477 39.5 32L32.8425 38.6575C32.7152 38.7848 32.6516 38.8484 32.601 38.921C32.5561 38.9853 32.5189 39.0548 32.4902 39.1278C32.458 39.2102 32.4403 39.2984 32.405 39.475L31.9999 41.5ZM33.5 27C33.5 29.2091 31.7091 31 29.5 31C27.2909 31 25.5 29.2091 25.5 27C25.5 24.7909 27.2909 23 29.5 23C31.7091 23 33.5 24.7909 33.5 27Z" stroke="#105EFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <filter id="filter0_d_10777_24917" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset/>
                    <feGaussianBlur stdDeviation="6"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10777_24917"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10777_24917" result="shape"/>
                  </filter>
                </defs>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add interests to your profile and start connecting!
              </h3>
            </div>
          </div>
        </div>

        {/* Tags Section */}
        <div className="p-4">
          <SelectorChips 
            options={suggestedInterests} 
            onChange={handleInterestsChange}
            onMoreClick={handleMoreClick}
          />
        </div>
      </Card>
    </div>
  );
};
