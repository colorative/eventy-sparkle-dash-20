
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Survey } from "@/types/survey";
import { format } from "date-fns";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SurveyCardProps {
  survey: Survey;
}

export const SurveyCard: React.FC<SurveyCardProps> = ({ survey }) => {
  const isOpen = new Date(survey.closesAt) > new Date();
  
  return (
    <Link to={`/survey/${survey.id}`}>
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        <div className="flex h-full">
          <div className="w-1/3 relative">
            <AspectRatio ratio={1/1} className="h-full">
              <img 
                src={survey.thumbnailUrl} 
                alt={survey.title} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
          <div className="w-2/3 flex flex-col">
            <CardContent className="pt-4 flex-grow">
              <h3 className="font-semibold text-md mb-1">{survey.title}</h3>
              <p className="text-xs text-slate-500 line-clamp-2">{survey.description}</p>
            </CardContent>
            <CardFooter className="pt-0 pb-3 flex items-center">
              <Badge className={isOpen ? "bg-green-500 hover:bg-green-600" : "bg-slate-400 hover:bg-slate-500"}>
                {isOpen ? "Open" : "Closed"}
              </Badge>
              {isOpen && (
                <span className="text-xs text-slate-500 ml-2">
                  Open until {format(new Date(survey.closesAt), "MMM d, yyyy")}
                </span>
              )}
            </CardFooter>
          </div>
        </div>
      </Card>
    </Link>
  );
};
