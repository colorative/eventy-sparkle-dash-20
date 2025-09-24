
import React from "react";

interface GamificationIconProps {
  iconType: string;
  className?: string;
}

export const GamificationIcon: React.FC<GamificationIconProps> = ({ iconType, className = "w-8 h-8" }) => {
  // Map of icon types to their SVG URLs
  const iconUrls: Record<string, string> = {
    "attendee-scanner": "https://raw.githubusercontent.com/colorative/gamificationicons/bd1406bfc9b093b860efa0d604e31e1e5f093e7e/Property%201%3DAttendee%20Scanner.svg",
    "trivia": "https://raw.githubusercontent.com/colorative/gamificationicons/bd1406bfc9b093b860efa0d604e31e1e5f093e7e/Property%201%3Dtrivia.svg",
    "exhibitor-scanner": "https://raw.githubusercontent.com/colorative/gamificationicons/bd1406bfc9b093b860efa0d604e31e1e5f093e7e/Property%201%3DExhibitor%20Scanner.svg",
    "rate-session": "https://raw.githubusercontent.com/colorative/gamificationicons/bd1406bfc9b093b860efa0d604e31e1e5f093e7e/Property%201%3Dratesession.svg",
    "live-qa-like": "https://raw.githubusercontent.com/colorative/gamificationicons/bd1406bfc9b093b860efa0d604e31e1e5f093e7e/Property%201%3Dliveqalike.svg",
    "exhibitors-deal": "https://raw.githubusercontent.com/colorative/gamificationicons/bd1406bfc9b093b860efa0d604e31e1e5f093e7e/Property%201%3Dexhibitorsdeal.svg",
    "news-reader": "https://raw.githubusercontent.com/colorative/gamificationicons/bd1406bfc9b093b860efa0d604e31e1e5f093e7e/Property%201%3DNews%20Reader.svg",
    "active-user": "https://raw.githubusercontent.com/colorative/gamificationicons/bd1406bfc9b093b860efa0d604e31e1e5f093e7e/Property%201%3DActive%20User.svg", 
    "social-photo-post": "https://raw.githubusercontent.com/colorative/gamificationicons/bd1406bfc9b093b860efa0d604e31e1e5f093e7e/Property%201%3Dsocialphotopost.svg"
  };

  const url = iconUrls[iconType] || iconUrls["active-user"]; // Default to active-user if type not found

  return (
    <img src={url} alt={`${iconType} icon`} className={className} />
  );
};
