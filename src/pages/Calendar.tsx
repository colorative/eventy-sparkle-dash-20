
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CalendarContent } from "@/components/calendar/CalendarContent";
import { CalendarRightSidebar } from "@/components/calendar/CalendarRightSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { CalendarProvider } from "@/contexts/CalendarContext";

const Calendar: React.FC = () => {
  return (
    <CalendarProvider>
      <SidebarProvider>
        <PageLayout hideRightSidebar={true}>
          <div className="flex w-full h-full">
            <SidebarInset className="flex-1">
              <CalendarContent />
            </SidebarInset>
            <div className="w-72 h-[calc(100vh-65px)]">
              <CalendarRightSidebar />
            </div>
          </div>
        </PageLayout>
      </SidebarProvider>
    </CalendarProvider>
  );
};

export default Calendar;
