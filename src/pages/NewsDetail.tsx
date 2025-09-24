
import React from "react";
import { NewsDetailContent } from "@/components/news/NewsDetailContent";
import { PageLayout } from "@/components/layout/PageLayout";

const NewsDetail: React.FC = () => {
  return (
    <PageLayout hideRightSidebar={true}>
      <NewsDetailContent />
    </PageLayout>
  );
};

export default NewsDetail;
