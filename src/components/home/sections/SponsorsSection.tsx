
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HorizontalScroller } from "@/components/ui/horizontal-scroller";

export const SponsorsSection: React.FC = () => {
  const sponsors = [{
    name: "Dashlane",
    tier: "PLATINUM",
    logo: "https://www.vectorlogo.zone/logos/dashlane/dashlane-ar21.svg",
    tierColor: "bg-slate-900"
  }, {
    name: "DigIdentity",
    tier: "GOLD",
    logo: "https://www.vectorlogo.zone/logos/digidentityeu/digidentityeu-ar21.svg",
    tierColor: "bg-yellow-500"
  }, {
    name: "Feedzai",
    tier: "GOLD",
    logo: "https://www.vectorlogo.zone/logos/feedzai/feedzai-ar21.svg",
    tierColor: "bg-yellow-500"
  }, {
    name: "Equisoft",
    tier: "SILVER",
    logo: "https://www.vectorlogo.zone/logos/equisoft/equisoft-ar21.svg",
    tierColor: "bg-gray-400"
  }, {
    name: "Fusion Reactor",
    tier: "BRONZE",
    logo: "https://www.vectorlogo.zone/logos/fusion-reactor/fusion-reactor-ar21.svg",
    tierColor: "bg-orange-400"
  }, {
    name: "Hello Grove",
    tier: "BRONZE",
    logo: "https://www.vectorlogo.zone/logos/hellogrove/hellogrove-ar21.svg",
    tierColor: "bg-orange-400"
  }, {
    name: "Habitica",
    tier: "SILVER",
    logo: "https://www.vectorlogo.zone/logos/habitica/habitica-ar21.svg",
    tierColor: "bg-gray-400"
  }, {
    name: "Hello Inspire",
    tier: "BRONZE",
    logo: "https://www.vectorlogo.zone/logos/helloinspire/helloinspire-ar21.svg",
    tierColor: "bg-orange-400"
  }, {
    name: "Lever",
    tier: "GOLD",
    logo: "https://www.vectorlogo.zone/logos/leverco/leverco-ar21.svg",
    tierColor: "bg-yellow-500"
  }, {
    name: "Moven",
    tier: "SILVER",
    logo: "https://www.vectorlogo.zone/logos/moven/moven-ar21.svg",
    tierColor: "bg-gray-400"
  }, {
    name: "Papertrail",
    tier: "BRONZE",
    logo: "https://www.vectorlogo.zone/logos/papertrailapp/papertrailapp-ar21.svg",
    tierColor: "bg-orange-400"
  }, {
    name: "Supabase",
    tier: "PLATINUM",
    logo: "https://www.vectorlogo.zone/logos/supabase/supabase-ar21.svg",
    tierColor: "bg-slate-900"
  }];
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Sponsors</h2>
      <HorizontalScroller>
        {sponsors.map((sponsor, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow flex-shrink-0">
            <CardContent className="p-6 text-center">
              <div className="h-40 md:h-44 px-2 mx-auto mb-4 flex items-center justify-center">
                <img src={sponsor.logo} alt={`${sponsor.name} sponsor logo`} className="w-[200px] max-w-[200px] h-auto object-contain shrink-0" loading="lazy" />
              </div>
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                {sponsor.name}
              </h3>
              <span className={`inline-block text-xs text-white px-3 py-1 rounded-full ${sponsor.tierColor}`}>
                {sponsor.tier}
              </span>
            </CardContent>
          </Card>
        ))}
      </HorizontalScroller>
    </div>
  );
};
