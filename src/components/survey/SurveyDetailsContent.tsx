
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useSurvey } from "@/hooks/useSurvey";
import { SurveyQuestion } from "./SurveyQuestion";
import { CustomSpinner } from "@/components/ui/CustomSpinner"; // Import CustomSpinner

interface SurveyDetailsContentProps {
  surveyId: string;
}

export const SurveyDetailsContent: React.FC<SurveyDetailsContentProps> = ({ surveyId }) => {
  const navigate = useNavigate();
  const { survey, isLoading } = useSurvey(surveyId);

  if (isLoading) {
    return (
      <div className="w-full max-w-[1024px] mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <CustomSpinner />
        </div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="w-full max-w-[1024px] mx-auto p-4">
        <Card>
          <CardContent className="py-10 text-center">
            <h2 className="text-lg font-semibold mb-2">Survey Not Found</h2>
            <p className="text-sm text-slate-500 mb-5">The survey you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/survey")}>Back to Surveys</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isOpen = new Date(survey.closesAt) > new Date();

  return (
    <div className="w-full max-w-[1024px] mx-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Button variant="outline" onClick={() => navigate("/survey")} className="mb-3 text-xs">
            &larr; Back to Surveys
          </Button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">{survey.title}</h1>
            <Badge className={isOpen ? "bg-green-500" : "bg-slate-400"}>
              {isOpen ? "Open" : "Closed"}
            </Badge>
          </div>
          {isOpen && (
            <p className="text-xs text-slate-500">
              Open until {format(new Date(survey.closesAt), "MMMM d, yyyy")}
            </p>
          )}
        </div>
      </div>

      <Card className="mb-5">
        <CardHeader className="py-3">
          <p className="text-sm">{survey.description}</p>
        </CardHeader>
      </Card>

      <form>
        <div className="space-y-4">
          {survey.questions.map((question) => (
            <SurveyQuestion key={question.id} question={question} />
          ))}
        </div>

        {isOpen && (
          <div className="mt-6 flex justify-end">
            <Button type="submit" size="sm">Submit Survey</Button>
          </div>
        )}
      </form>
    </div>
  );
};

