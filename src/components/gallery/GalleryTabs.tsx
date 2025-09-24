
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GalleryTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export const GalleryTabs: React.FC<GalleryTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  sortBy, 
  onSortChange 
}) => {
  return (
    <div className="flex items-center justify-between">
      <Tabs value={activeTab} onValueChange={onTabChange} className="w-auto">
        <TabsList className="w-auto grid grid-cols-2 md:inline-flex">
          <TabsTrigger value="all">All Photos</TabsTrigger>
          <TabsTrigger value="my-photos">My Photos</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="most-liked">Most Liked</SelectItem>
          <SelectItem value="recently-uploaded">Recently Uploaded</SelectItem>
          <SelectItem value="most-commented">Most Commented</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
