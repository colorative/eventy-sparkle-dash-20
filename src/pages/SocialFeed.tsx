
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SocialFeedContent } from "@/components/socialfeed/SocialFeedContent";

const SocialFeed: React.FC = () => {
  return (
    <PageLayout hideRightSidebar={false}>
      <SocialFeedContent />
    </PageLayout>
  );
};

export default SocialFeed;
