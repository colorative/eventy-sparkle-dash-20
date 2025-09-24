import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const FeaturedSponsors: React.FC = () => {
  const featuredSponsors = [
    {
      id: 1,
      name: "Adobe",
      tier: "PLATINUM",
      logo: "https://www.vectorlogo.zone/logos/adobe/adobe-icon.svg",
      coverPhoto: "https://www.vectorlogo.zone/logos/adobe/adobe-ar21.svg",
      boothName: "Booth A-12",
      tierColor: "bg-slate-900"
    },
    {
      id: 2,
      name: "Google",
      tier: "PLATINUM", 
      logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
      coverPhoto: "https://www.vectorlogo.zone/logos/google/google-ar21.svg",
      boothName: "Booth A-15",
      tierColor: "bg-slate-900"
    },
    {
      id: 3,
      name: "Microsoft",
      tier: "GOLD",
      logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg",
      coverPhoto: "https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg",
      boothName: "Booth B-08",
      tierColor: "bg-yellow-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredSponsors.map((sponsor) => (
        <Card key={sponsor.id} className="hover:shadow-lg transition-shadow cursor-pointer relative overflow-hidden">
          <CardContent className="p-0">
            {/* Cover Photo */}
            <div className="h-32 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center relative">
              <img 
                src={sponsor.coverPhoto} 
                alt={`${sponsor.name} full logo`}
                className="max-h-20 max-w-full object-contain"
                loading="lazy"
              />
              <Badge className={`absolute top-2 right-2 ${sponsor.tierColor} text-white text-xs`}>
                {sponsor.tier}
              </Badge>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-14 h-14 bg-white rounded border flex items-center justify-center flex-shrink-0">
                  <img 
                    src={sponsor.logo} 
                    alt={`${sponsor.name} icon`}
                    className="w-10 h-10 object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{sponsor.name}</h3>
                  <p className="text-sm text-slate-600">{sponsor.boothName}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};