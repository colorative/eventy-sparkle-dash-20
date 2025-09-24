
import React from "react";
import { SurveyListItem } from "./SurveyListItem";
import { Survey } from "@/types/survey";

interface SurveyListProps {
  surveys: Survey[];
}

export const SurveyList: React.FC<SurveyListProps> = ({ surveys }) => {
  if (surveys.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-slate-500">No surveys available at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {surveys.map((survey) => (
        <SurveyListItem key={survey.id} survey={survey} />
      ))}
    </div>
  );
};
