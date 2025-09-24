
import React from "react";
import { NewsContent } from "@/components/news/NewsContent";
import { PageLayout } from "@/components/layout/PageLayout";

const News: React.FC = () => {
  return (
    <PageLayout hideRightSidebar={false}>
      <NewsContent />
    </PageLayout>
  );
};

export default News;
