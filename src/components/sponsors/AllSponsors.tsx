import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
interface AllSponsorsProps {
  viewMode: "grid" | "list";
  searchQuery: string;
}
export const AllSponsors: React.FC<AllSponsorsProps> = ({
  viewMode,
  searchQuery
}) => {
  const allSponsors = [{
    id: 1,
    name: "Adobe",
    tier: "PLATINUM",
    logo: "https://www.vectorlogo.zone/logos/adobe/adobe-icon.svg",
    boothNumber: "A-12",
    tierColor: "bg-slate-900"
  }, {
    id: 2,
    name: "Google",
    tier: "PLATINUM",
    logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
    boothNumber: "A-15",
    tierColor: "bg-slate-900"
  }, {
    id: 3,
    name: "Microsoft",
    tier: "GOLD",
    logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg",
    boothNumber: "B-08",
    tierColor: "bg-yellow-500"
  }, {
    id: 4,
    name: "Amazon",
    tier: "GOLD",
    logo: "https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg",
    boothNumber: "B-22",
    tierColor: "bg-yellow-500"
  }, {
    id: 5,
    name: "Apple",
    tier: "SILVER",
    logo: "https://www.vectorlogo.zone/logos/apple/apple-icon.svg",
    boothNumber: "C-14",
    tierColor: "bg-gray-400"
  }, {
    id: 6,
    name: "Facebook",
    tier: "SILVER",
    logo: "https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg",
    boothNumber: "C-18",
    tierColor: "bg-gray-400"
  }, {
    id: 7,
    name: "Netflix",
    tier: "BRONZE",
    logo: "https://www.vectorlogo.zone/logos/netflix/netflix-icon.svg",
    boothNumber: "D-05",
    tierColor: "bg-orange-400"
  }, {
    id: 8,
    name: "Spotify",
    tier: "BRONZE",
    logo: "https://www.vectorlogo.zone/logos/spotify/spotify-icon.svg",
    boothNumber: "D-12",
    tierColor: "bg-orange-400"
  }, {
    id: 9,
    name: "Tesla",
    tier: "GOLD",
    logo: "https://www.vectorlogo.zone/logos/tesla/tesla-icon.svg",
    boothNumber: "B-31",
    tierColor: "bg-yellow-500"
  }, {
    id: 10,
    name: "Airbnb",
    tier: "SILVER",
    logo: "https://www.vectorlogo.zone/logos/airbnb/airbnb-icon.svg",
    boothNumber: "C-27",
    tierColor: "bg-gray-400"
  }];
  const filteredSponsors = allSponsors.filter(sponsor => sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) || sponsor.boothNumber.toLowerCase().includes(searchQuery.toLowerCase()));
  if (viewMode === "list") {
    return <div className="space-y-4">
        {filteredSponsors.map(sponsor => <Card key={sponsor.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 flex items-center justify-center bg-gray-50 rounded-lg flex-shrink-0">
                    <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="w-12 h-12 object-contain" loading="lazy" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{sponsor.name}</h3>
                    <p className="text-sm text-slate-600">Booth {sponsor.boothNumber}</p>
                  </div>
                </div>
                <Badge className={`${sponsor.tierColor} text-white text-xs`}>
                  {sponsor.tier}
                </Badge>
              </div>
            </CardContent>
          </Card>)}
      </div>;
  }
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredSponsors.map(sponsor => <div key={sponsor.id} className="cursor-pointer">
          <Card className="hover:shadow-lg transition-shadow mb-3">
            <CardContent className="p-8">
              <div className="w-24 h-24 mx-auto flex items-center justify-center rounded-lg">
                <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="w-20 h-20 object-contain" loading="lazy" />
              </div>
            </CardContent>
          </Card>
          <div className="text-left">
            <h3 className="font-semibold text-lg mb-1">{sponsor.name}</h3>
            <div className="flex items-center gap-2">
              <Badge className={`${sponsor.tierColor} text-white text-xs`}>
                {sponsor.tier}
              </Badge>
              <span className="text-sm text-slate-600">Booth {sponsor.boothNumber}</span>
            </div>
          </div>
        </div>)}
    </div>;
};