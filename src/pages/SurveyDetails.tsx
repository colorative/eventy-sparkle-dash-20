
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SurveyDetailsContent } from "@/components/survey/SurveyDetailsContent";
import { useParams } from "react-router-dom";

const SurveyDetails = () => {
  const { surveyId } = useParams();

  return (
    <PageLayout hideRightSidebar={true}>
      <SurveyDetailsContent surveyId={surveyId || ""} />
    </PageLayout>
  );
};

export default SurveyDetails;
