import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid2X2, List } from "lucide-react";
import { FeaturedSponsors } from "./FeaturedSponsors";
import { AllSponsors } from "./AllSponsors";
import { FilterPanel } from "./FilterPanel";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SponsorsContent: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 flex min-w-60 flex-col overflow-auto items-stretch justify-start flex-1 shrink basis-[0%] p-6 max-md:max-w-full">
      {/* Fixed-width container with responsive behavior */}
      <div className="w-full max-w-[1024px] mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">Featured Sponsors</h1>
          <p className="text-slate-500 text-sm mb-4">Platinum and Gold sponsors</p>
          <FeaturedSponsors />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <h2 className="text-xl font-bold">All Sponsors</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative md:w-64 w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <div className="flex items-center gap-2">
                    <span>Browse by</span>
                    <SelectValue placeholder="All" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="tier">Sponsor Tier</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={() => setIsFilterOpen(true)}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              
              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  className="h-9 w-9"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <AllSponsors 
            viewMode={viewMode} 
            searchQuery={searchQuery}
          />
        </div>
      </div>
      
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
};