
import React from "react";

export const SessionPoweredBy = () => {
  const sponsors = [
    {
      name: "TechCorp",
      logo: "https://colorative.sirv.com/logoipsum-352.png"
    },
    {
      name: "InnovateAI", 
      logo: "https://colorative.sirv.com/logoipsum-372.png"
    },
    {
      name: "CloudTech",
      logo: "https://colorative.sirv.com/logoipsum-367.png"
    }
  ];

  return (
    <div className="flex items-center gap-3">
      {sponsors.map((sponsor, index) => (
        <div key={index} className="flex items-center gap-2 p-2 rounded-lg border bg-card shadow-sm">
          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center overflow-hidden">
            <img 
              src={sponsor.logo} 
              alt={sponsor.name} 
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="text-xs text-gray-600">{sponsor.name}</span>
        </div>
      ))}
    </div>
  );
};
