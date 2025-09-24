
import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface CalendarsProps {
  calendars: {
    name: string
    items: string[]
  }[]
}

export function Calendars({ calendars }: CalendarsProps) {
  return (
    <>
      {calendars.map((calendar, index) => (
        <SidebarGroup key={calendar.name}>
          <Collapsible defaultOpen={index === 0} className="group/collapsible">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center text-sm font-medium">
                {calendar.name}
                <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {calendar.items.map((item) => (
                    <SidebarMenuItem key={item}>
                      <SidebarMenuButton asChild>
                        <div className="flex items-center space-x-2 p-2">
                          <Checkbox 
                            id={item}
                            defaultChecked={item === "Personal" || item === "Work"}
                          />
                          <label
                            htmlFor={item}
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {item}
                          </label>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      ))}
    </>
  )
}
