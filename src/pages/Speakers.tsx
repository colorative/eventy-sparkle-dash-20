
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SpeakersContent } from "@/components/speakers/SpeakersContent";

const Speakers = () => {
  return (
    <PageLayout hideRightSidebar={true}>
      <SpeakersContent />
    </PageLayout>
  );
};

export default Speakers;
