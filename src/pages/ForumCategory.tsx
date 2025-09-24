
import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { ForumCategoryContent } from "@/components/forum/ForumCategoryContent";

const ForumCategory = () => {
  const { slug } = useParams<{ slug: string }>();
  
  return (
    <PageLayout>
      <ForumCategoryContent slug={slug || ""} />
    </PageLayout>
  );
};

export default ForumCategory;
