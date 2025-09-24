
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SurveyContent } from "@/components/survey/SurveyContent";

const Survey = () => {
  return (
    <PageLayout hideRightSidebar={false}>
      <SurveyContent />
    </PageLayout>
  );
};

export default Survey;
