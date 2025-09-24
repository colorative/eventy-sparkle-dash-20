
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ExploreContent } from "@/components/explore/ExploreContent";

const Explore = () => {
  return (
    <PageLayout hideRightSidebar>
      <ExploreContent />
    </PageLayout>
  );
};

export default Explore;
