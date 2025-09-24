
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";

export const MapsSection: React.FC = () => {
  const maps = [
    {
      title: "Interactive Floor Map",
      description: "Navigate the venue with our interactive map",
      icon: "🗺️"
    },
    {
      title: "Floor Plans",
      description: "View detailed floor plans and layouts", 
      icon: "🏢"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Maps</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {maps.map((map, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-3">{map.icon}</div>
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                {map.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                {map.description}
              </p>
              <Button size="sm" variant="outline" className="w-full">
                <Map className="w-4 h-4 mr-2" />
                View Map
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
