
import React, { useState } from "react";
import { SurveyList } from "./SurveyList";
import { SurveyGrid } from "./SurveyGrid";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { useSurveys } from "@/hooks/useSurveys";
import { CustomSpinner } from "@/components/ui/CustomSpinner"; // Import CustomSpinner

export const SurveyContent: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { surveys, isLoading } = useSurveys();

  return (
    <div className="w-full max-w-[1024px] mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Event Surveys</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="h-8 w-8 p-0"
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="h-8 w-8 p-0"
          >
            <Grid className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <CustomSpinner />
        </div>
      ) : viewMode === "grid" ? (
        <SurveyGrid surveys={surveys} />
      ) : (
        <SurveyList surveys={surveys} />
      )}
    </div>
  );
};

