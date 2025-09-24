
import React from "react";
import { Search, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchViewToggleProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchViewToggle: React.FC<SearchViewToggleProps> = ({
  viewMode,
  setViewMode,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search guides..." 
          className="pl-9 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="border rounded-md flex dark:border-gray-600">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setViewMode("grid")} 
          className={viewMode === "grid" ? "bg-slate-100 dark:bg-gray-700" : "hover:bg-slate-100 dark:hover:bg-gray-700"}
        >
          <Grid className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setViewMode("list")} 
          className={viewMode === "list" ? "bg-slate-100 dark:bg-gray-700" : "hover:bg-slate-100 dark:hover:bg-gray-700"}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
