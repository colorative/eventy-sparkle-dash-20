
import React from "react";
import { useParams, Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { JobDetailsContent } from "@/components/forum/JobDetailsContent";

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <PageLayout>
      <JobDetailsContent id={id || ""} />
    </PageLayout>
  );
};

export default JobDetails;
