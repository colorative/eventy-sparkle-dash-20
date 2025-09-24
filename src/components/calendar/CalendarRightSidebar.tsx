
import * as React from "react";
import { DatePicker } from "@/components/date-picker";
import { CalendarFilters } from "@/components/calendar/CalendarFilters";
import { Sidebar, SidebarContent, SidebarRail, SidebarSeparator } from "@/components/ui/sidebar";

export function CalendarRightSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <div className="h-full w-full border-l border-border bg-sidebar">
      <Sidebar side="right" variant="sidebar" collapsible="none" className="w-full border-0 p-0" {...props}>
        <SidebarContent className="p-0 gap-0">
          <DatePicker />
          <SidebarSeparator className="mx-0" />
          <CalendarFilters />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}
