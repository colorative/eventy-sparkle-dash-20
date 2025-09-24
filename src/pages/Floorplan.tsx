
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { FloorplanContent } from "@/components/floorplan/FloorplanContent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Floorplan = () => {
  return (
    <PageLayout>
      <div className="flex-1 flex overflow-hidden">
        <FloorplanContent />
        
        {/* Right sidebar content */}
        <div className="w-[320px] border-l p-4 overflow-auto">
          <Tabs defaultValue="exhibitors">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="exhibitors">Exhibitors</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
            </TabsList>
            
            <TabsContent value="exhibitors" className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search exhibitors..."
                  className="pl-8"
                />
              </div>
              
              {/* Exhibitor List */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card key={i} className="cursor-pointer hover:bg-gray-50">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        {String.fromCharCode(64 + i)}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Exhibitor {i}</h4>
                        <p className="text-xs text-gray-500">Booth #{100 + i}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="amenities" className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search amenities..."
                  className="pl-8"
                />
              </div>
              
              {/* Amenities List */}
              {['Restrooms', 'Food Court', 'Information Desk', 'First Aid', 'ATM', 'Charging Station', 'Lounge Area'].map((amenity, i) => (
                <Card key={i} className="cursor-pointer hover:bg-gray-50">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <span className="text-lg">•</span>
                      </div>
                      <h4 className="font-medium text-sm">{amenity}</h4>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default Floorplan;
