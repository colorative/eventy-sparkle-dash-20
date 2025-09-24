
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { NoteDetails as NoteDetailsComponent } from "@/components/notes/NoteDetails";

const NoteDetails = () => {
  return (
    <PageLayout>
      <NoteDetailsComponent />
    </PageLayout>
  );
};

export default NoteDetails;
