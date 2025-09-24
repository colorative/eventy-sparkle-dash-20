
import React, { useState } from "react";
import { ZoomIn, ZoomOut, Map, MapPin, Building, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { InteractiveFloorMap } from "./InteractiveFloorMap";

interface FloorplanContentProps {
  floorplanId?: string;
}

export const FloorplanContent: React.FC<FloorplanContentProps> = ({ floorplanId }) => {
  const [floor, setFloor] = useState("1");

  // This would be where you fetch the specific floorplan data based on the ID
  const floorplanTitle = floorplanId ? `Event Floorplan ${floorplanId}` : "Event Floorplan";

  return (
    <div className="bg-white flex flex-col overflow-hidden items-stretch flex-1 shrink basis-[0%] p-6 max-md:max-w-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link to="/maps">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{floorplanTitle}</h1>
            <p className="text-gray-500">Navigate the event venue efficiently</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={floor} onValueChange={setFloor}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select floor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Floor 1</SelectItem>
              <SelectItem value="2">Floor 2</SelectItem>
              <SelectItem value="3">Floor 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <InteractiveFloorMap className="h-[calc(100%-80px)] w-full" />
    </div>
  );
};
