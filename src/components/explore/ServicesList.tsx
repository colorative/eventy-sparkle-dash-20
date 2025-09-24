
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface Service {
  id: string; // Changed from number to string to match ExploreContent
  name: string;
  provider: string;
  description: string;
  type: string;
  price: string;
  availability: string;
  tags: string[];
  image: string;
  isSaved: boolean;
}

interface ServicesListProps {
  services: Service[];
  viewMode: "grid" | "list";
}

export const ServicesList: React.FC<ServicesListProps> = ({ services, viewMode }) => {
  const toggleSaved = (id: string) => { // Changed from number to string
    toast({
      title: "Item saved",
      description: "The item has been added to your saved list.",
    });
  };

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700 dark:bg-gray-800">
            <div 
              className="h-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${service.image})` }}
            />
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-1">
                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    {service.type}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      service.availability === "Available Now" 
                        ? "bg-green-50 text-green-700 border-green-100 dark:bg-green-900 dark:text-green-300 dark:border-green-800" 
                        : "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-800"
                    }`}
                  >
                    {service.availability}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-6 w-6 ${service.isSaved ? "text-red-500" : "text-gray-400"}`}
                  onClick={() => toggleSaved(service.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={service.isSaved ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </Button>
              </div>
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-base dark:text-white">{service.name}</h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">by {service.provider}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-2 line-clamp-2">
                {service.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex flex-wrap gap-1">
                  {service.tags.slice(0, 2).map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-slate-100 dark:bg-gray-700 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <span className="text-sm font-medium dark:text-white">{service.price}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {services.map((service) => (
        <Card key={service.id} className="overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex">
            <div 
              className="w-32 h-auto bg-cover bg-center"
              style={{ backgroundImage: `url(${service.image})` }}
            />
            <CardContent className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {service.type}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        service.availability === "Available Now" 
                          ? "bg-green-50 text-green-700 border-green-100 dark:bg-green-900 dark:text-green-300 dark:border-green-800" 
                          : "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-800"
                      }`}
                    >
                      {service.availability}
                    </Badge>
                  </div>
                  <h3 className="font-medium dark:text-white mt-1">{service.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">by {service.provider}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium dark:text-white">{service.price}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-6 w-6 ${service.isSaved ? "text-red-500" : "text-gray-400"}`}
                    onClick={() => toggleSaved(service.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={service.isSaved ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 my-2">{service.description}</p>
              <div className="flex flex-wrap gap-1">
                {service.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-slate-100 dark:bg-gray-700 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
};
