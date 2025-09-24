
import React from "react";
import { Progress } from "@/components/ui/progress";
import Avatar from "boring-avatars";

// New CoinIcon component for profile section
const CoinIcon = () => (
  <svg className="h-5 w-5 text-amber-500 mr-1" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <circle cx="256" cy="256" fill="#ffb703" r="256"></circle>
    <circle cx="256" cy="256" fill="#ffcc29" r="183.75"></circle>
    <g fill="none" strokeMiterlimit="10">
      <circle cx="256" cy="256" r="183.75" stroke="#f99300" strokeWidth="32.32"></circle>
      <path d="m341.31 468.54a227.51 227.51 0 0 0 142.15-210.92" stroke="#ffcc29" strokeLinecap="round" strokeWidth="19.39"></path>
      <path d="m142.26 59a226.34 226.34 0 0 1 113.74-30.46" stroke="#ffcc29" strokeLinecap="round" strokeWidth="19.39"></path>
      <path d="m64.77 132.76a228.18 228.18 0 0 1 39.64-46.37" stroke="#ffcc29" strokeLinecap="round" strokeWidth="19.39"></path>
      <path d="m56.22 364.84a226.58 226.58 0 0 1 -27.68-108.84" stroke="#ffcc29" strokeLinecap="round" strokeWidth="19.39"></path>
    </g>
    <path d="m303.53 237.67-44.85-64.91a3.25 3.25 0 0 0 -5.36 0l-44.85 64.91a3.26 3.26 0 0 1 -4 1.14l-63.64-28.27a3.27 3.27 0 0 0 -4.46 3.89l36.9 126.36a3.26 3.26 0 0 0 3.13 2.35h159.21a3.26 3.26 0 0 0 3.13-2.35l36.9-126.36a3.27 3.27 0 0 0 -4.46-3.89l-63.64 28.27a3.29 3.29 0 0 1 -4.01-1.14z" fill="#f99300"></path>
  </svg>
);

const ProfileSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Avatar
            size={80}
            name="Daniel Miller"
            variant="marble"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl font-bold">Daniel Miller</h3>
            <div className="flex items-center">
              <CoinIcon />
              <span className="font-semibold text-amber-600">1250 pts</span>
            </div>
          </div>
          <div className="text-sm text-gray-500 mb-2">12th Position in Leaderboard</div>
          <div className="flex items-center">
            <div className="flex-1 mr-2">
              <Progress value={30} className="h-2" />
              <div className="flex justify-between text-xs mt-1">
                <span>9/30 tasks completed</span>
                <span className="text-blue-600">30%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
