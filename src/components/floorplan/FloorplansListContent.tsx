import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Building, LayoutGrid, LayoutList, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FloorplanCard } from "./FloorplanCard";

// Updated sample data with map types
const MAPS = [{
  id: "1",
  title: "Main Exhibition Hall",
  description: "Primary exhibition area with all major booths and product displays",
  thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
  dateAdded: "2025-04-15",
  floors: 2,
  type: "floor" as "floor" // Type assertion to match union type
}, {
  id: "2",
  title: "Conference Center",
  description: "Meeting rooms and presentation spaces for scheduled events",
  thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  dateAdded: "2025-04-10",
  floors: 3,
  type: "floor" as "floor" // Type assertion to match union type
}, {
  id: "3",
  title: "Venue Location",
  description: "Navigate to the event venue with interactive directions",
  thumbnail: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83",
  dateAdded: "2025-04-05",
  floors: 0,
  type: "google" as "google" // Type assertion to match union type
}, {
  id: "4",
  title: "Nearby Accommodations",
  description: "Hotels and lodging options within walking distance of the venue",
  thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  dateAdded: "2025-04-01",
  floors: 0,
  type: "google" as "google" // Type assertion to match union type
}];
export const FloorplansListContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mapTypeFilter, setMapTypeFilter] = useState<"all" | "floor" | "google">("all");
  const filteredMaps = MAPS.filter(map => {
    // Apply search filter
    const matchesSearch = map.title.toLowerCase().includes(searchQuery.toLowerCase()) || map.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply map type filter
    const matchesType = mapTypeFilter === "all" || map.type === mapTypeFilter;
    return matchesSearch && matchesType;
  });
  return <div className="bg-white p-6 rounded-lg flex flex-col h-full overflow-hidden">
      <div className="flex flex-col gap-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Maps</h1>
            <p className="text-gray-500">Navigate the event venue and surrounding areas</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "bg-gray-100" : ""}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setViewMode("list")} className={viewMode === "list" ? "bg-gray-100" : ""}>
              <LayoutList className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        
        
        
      </div>
      
      <div className="overflow-y-auto flex-1">
        <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredMaps.length > 0 ? filteredMaps.map(map => <FloorplanCard key={map.id} floorplan={map} viewMode={viewMode} />) : <div className="col-span-full flex items-center justify-center h-40 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No maps match your search</p>
            </div>}
        </div>
      </div>
    </div>;
};