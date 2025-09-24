
import React from "react";
import { SurveyCard } from "./SurveyCard";
import { Survey } from "@/types/survey";

interface SurveyGridProps {
  surveys: Survey[];
}

export const SurveyGrid: React.FC<SurveyGridProps> = ({ surveys }) => {
  if (surveys.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-slate-500">No surveys available at this time.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {surveys.map((survey) => (
        <SurveyCard key={survey.id} survey={survey} />
      ))}
    </div>
  );
};
