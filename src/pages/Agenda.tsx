
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AgendaContent } from "@/components/agenda/AgendaContent";

const Agenda: React.FC = () => {
  return (
    <PageLayout>
      <AgendaContent />
    </PageLayout>
  );
};

export default Agenda;
