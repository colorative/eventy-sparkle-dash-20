
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SupportChat } from "@/components/support/SupportChat";

const Support = () => {
  return (
    <PageLayout hideRightSidebar={true}>
      <div className="p-6 h-[calc(100vh-65px)] flex flex-col overflow-hidden">
        <SupportChat />
      </div>
    </PageLayout>
  );
};

export default Support;
