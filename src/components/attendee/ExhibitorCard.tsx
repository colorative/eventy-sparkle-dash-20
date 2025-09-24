
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ExhibitorCardProps {
  name: string;
  boothNumber: string;
  logo: string;
}

export const ExhibitorCard: React.FC<ExhibitorCardProps> = ({
  name,
  boothNumber,
  logo,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Linked Exhibitor</h2>
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-md overflow-hidden mr-4">
            <img 
              src={logo} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-gray-500">Booth {boothNumber}</p>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-4">
          Visit Exhibitor
        </Button>
      </CardContent>
    </Card>
  );
};
