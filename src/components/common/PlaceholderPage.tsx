
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PlaceholderPageProps {
  title: string;
  description: string;
  features?: string[];
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ 
  title, 
  description, 
  features = [] 
}) => {
  return (
    <div className="flex flex-col p-6 h-full bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {features.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Planned Features:</h3>
              <ul className="list-disc pl-5 space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="text-slate-700">{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="flex justify-center mt-8">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Coming Soon
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
