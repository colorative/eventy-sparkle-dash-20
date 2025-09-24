
import React from "react";
import { Link } from "react-router-dom";
import { Building, MapPin, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FloorplanProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  dateAdded: string;
  floors: number;
  type: "floor" | "google";
}

interface FloorplanCardProps {
  floorplan: FloorplanProps;
  viewMode: "grid" | "list";
}

export const FloorplanCard: React.FC<FloorplanCardProps> = ({
  floorplan,
  viewMode
}) => {
  // Determine the appropriate icon based on map type
  const MapIcon = floorplan.type === "floor" ? Building : Globe;

  // Determine the link based on map type
  const mapLink = floorplan.type === "floor" ? `/maps/${floorplan.id}` : `/maps/google/${floorplan.id}`;

  // Determine the map type label
  const mapTypeLabel = floorplan.type === "floor" ? "Floor Map" : "Location Map";

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <Link to={mapLink} className="block">
          <div className="flex h-32">
            <div className="w-48 h-full flex-shrink-0 overflow-hidden bg-gray-100">
              <img 
                src={`${floorplan.thumbnail}?w=240&h=180&fit=crop&auto=format`} 
                alt={floorplan.title} 
                className="w-full h-full object-cover" 
              />
            </div>
            <CardContent className="flex-1 p-6">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-lg">{floorplan.title}</h3>
                  <Badge variant="outline" className="mt-1">{mapTypeLabel}</Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{floorplan.description}</p>
              {floorplan.type === "floor" && floorplan.floors > 0}
            </CardContent>
            <div className="flex items-center p-6">
              <Button variant="outline" size="sm">View</Button>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <Link to={mapLink} className="flex flex-col h-full">
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img 
            src={`${floorplan.thumbnail}?w=600&h=400&fit=crop&auto=format`} 
            alt={floorplan.title} 
            className="w-full h-full object-cover" 
          />
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg">{floorplan.title}</h3>
          </div>
          <Badge variant="outline" className="w-fit mb-2">{mapTypeLabel}</Badge>
        </CardContent>
      </Link>
    </Card>
  );
};
