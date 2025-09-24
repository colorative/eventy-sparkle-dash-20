
import React from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { IceBreakerDetailsContent } from "@/components/forum/IceBreakerDetailsContent";

const IceBreakerDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <PageLayout>
      <IceBreakerDetailsContent id={id || ""} />
    </PageLayout>
  );
};

export default IceBreakerDetails;
