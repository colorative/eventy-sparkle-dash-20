import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ isOpen, onClose }) => {
  const sponsorTiers = ["PLATINUM", "GOLD", "SILVER", "BRONZE"];
  const categories = ["Technology", "E-commerce", "Social Media", "Entertainment", "Automotive", "Travel"];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Filter Sponsors</SheetTitle>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div>
            <h3 className="font-medium mb-3">Sponsor Tier</h3>
            <div className="space-y-2">
              {sponsorTiers.map((tier) => (
                <div key={tier} className="flex items-center space-x-2">
                  <Checkbox id={tier} />
                  <Label htmlFor={tier} className="text-sm">
                    {tier}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={category} />
                  <Label htmlFor={category} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Clear All
            </Button>
            <Button onClick={onClose} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};