
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SocialFeedDetailContent } from "@/components/socialfeed/SocialFeedDetailContent";

const SocialFeedDetail: React.FC = () => {
  return (
    <PageLayout hideRightSidebar={false}>
      <SocialFeedDetailContent />
    </PageLayout>
  );
};

export default SocialFeedDetail;
