
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { EventGuideContent } from "@/components/eventguide/EventGuideContent";

const EventGuide = () => {
  return (
    <PageLayout hideRightSidebar={false}>
      <EventGuideContent />
    </PageLayout>
  );
};

export default EventGuide;
