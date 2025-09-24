
import React from "react";
import { useParams, Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { MeetupDetailsContent } from "@/components/forum/MeetupDetailsContent";

const MeetupDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <PageLayout>
      <MeetupDetailsContent id={id || ""} />
    </PageLayout>
  );
};

export default MeetupDetails;
