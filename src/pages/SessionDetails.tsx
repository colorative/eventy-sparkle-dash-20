
import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { SessionDetailsContent } from "@/components/session/SessionDetailsContent";

const SessionDetails: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  
  return (
    <PageLayout>
      <SessionDetailsContent sessionId={sessionId} />
    </PageLayout>
  );
};

export default SessionDetails;
