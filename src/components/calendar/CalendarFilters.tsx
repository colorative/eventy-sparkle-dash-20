
import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { useCalendar, CalendarFilter } from "@/contexts/CalendarContext"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const filterCategories: { name: CalendarFilter; color: string }[] = [
  { name: "Sessions", color: "text-blue-600" },
  { name: "Networking", color: "text-green-600" },
  { name: "Meetings", color: "text-purple-600" },
];

export function CalendarFilters() {
  const { activeFilters, toggleFilter } = useCalendar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>My Calendars</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {filterCategories.map((category) => (
            <SidebarMenuItem key={category.name}>
              <SidebarMenuButton asChild>
                <div className="flex items-center space-x-2 p-2">
                  <Checkbox 
                    id={category.name}
                    checked={activeFilters.includes(category.name)}
                    onCheckedChange={() => toggleFilter(category.name)}
                  />
                  <label
                    htmlFor={category.name}
                    className={`text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${category.color}`}
                  >
                    {category.name}
                  </label>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
