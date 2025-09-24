
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Survey } from "@/types/survey";
import { format } from "date-fns";

interface SurveyListItemProps {
  survey: Survey;
}

export const SurveyListItem: React.FC<SurveyListItemProps> = ({ survey }) => {
  const isOpen = new Date(survey.closesAt) > new Date();
  
  return (
    <Link to={`/survey/${survey.id}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <CardContent className="p-0">
          <div className="flex h-24">
            <div className="w-24 h-24 flex-shrink-0">
              <img 
                src={survey.thumbnailUrl} 
                alt={survey.title} 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between min-h-0">
              <div className="flex-1">
                <h3 className="font-semibold text-md mb-1 line-clamp-1">{survey.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{survey.description}</p>
              </div>
              <div className="flex items-center mt-2">
                <Badge className={`text-xs ${isOpen ? "bg-green-500 hover:bg-green-600" : "bg-slate-400 hover:bg-slate-500"}`}>
                  {isOpen ? "Open" : "Closed"}
                </Badge>
                {isOpen && (
                  <span className="text-xs text-slate-500 ml-2">
                    Open until {format(new Date(survey.closesAt), "MMM d, yyyy")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
