
import { useState, useEffect } from "react";
import { Survey } from "@/types/survey";
import { useSurveys } from "./useSurveys";

export function useSurvey(surveyId: string) {
  const { surveys, isLoading: isSurveysLoading } = useSurveys();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (isSurveysLoading) {
      return;
    }

    // Simulate API call to fetch individual survey
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const foundSurvey = surveys.find(s => s.id === surveyId) || null;
        setSurvey(foundSurvey);
        
        if (!foundSurvey) {
          setError(new Error('Survey not found'));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [surveyId, surveys, isSurveysLoading]);

  return { survey, isLoading: isLoading || isSurveysLoading, error };
}
