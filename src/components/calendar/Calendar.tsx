
import React from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO, addHours, startOfDay } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { CalendarFilter } from "@/contexts/CalendarContext";

interface Person {
  id: string;
  name: string;
  email: string;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description?: string;
  location?: string;
  attendees?: Person[];
  colorClass?: string;
  duration?: number; // Duration in minutes
  category: CalendarFilter; // Add category field
}

interface CalendarProps {
  events: Event[];
  currentDate: Date;
  currentView: "month" | "week" | "day";
  onDateChange: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ 
  events, 
  currentDate, 
  currentView,
  onDateChange, 
  onEventClick 
}) => {
  const hoursOfDay = Array.from({ length: 24 }, (_, i) => i);

  const renderTimeColumn = () => {
    if (currentView === "month") return null;
    
    return (
      <div className="flex flex-col border-r pr-2 text-right w-16">
        {hoursOfDay.map((hour) => (
          <div key={hour} className="h-20 text-xs text-gray-500 -mt-2.5">
            {hour === 0 ? '' : `${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`}
          </div>
        ))}
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDate = startOfWeek(currentDate);

    if (currentView === "day") {
      days.push(
        <div className="py-2 text-center text-sm font-medium col-span-full" key="single-day">
          {format(currentDate, "EEEE, MMMM d")}
        </div>
      );
    } else {
      for (let i = 0; i < 7; i++) {
        days.push(
          <div className="py-2 text-center text-sm font-medium" key={i}>
            {format(addDays(startDate, i), currentView === "week" ? "EEE d" : dateFormat)}
          </div>
        );
      }
    }

    return (
      <div className={`grid ${currentView === "day" ? "grid-cols-1" : "grid-cols-7"} bg-gray-50 divide-x divide-gray-200`}>
        {days}
      </div>
    );
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const cloneDay = day;
        const dayEvents = events.filter(event => 
          isSameDay(event.date, cloneDay)
        );

        days.push(
          <div
            className={`min-h-[120px] p-1 ${
              !isSameMonth(day, monthStart)
                ? "text-gray-400 bg-gray-50"
                : isSameDay(day, new Date())
                ? "bg-blue-50"
                : ""
            }`}
            key={day.toString()}
            onClick={() => onDateChange(cloneDay)}
          >
            <div className="text-right p-1">
              {formattedDate}
            </div>
            <div className="overflow-y-auto max-h-[80px]">
              {dayEvents.map((event) => (
                <TooltipProvider key={event.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`p-1 mb-1 text-xs truncate rounded cursor-pointer hover:opacity-80 ${event.colorClass || 'bg-blue-100 text-blue-800'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEventClick(event);
                        }}
                      >
                        {event.time} - {event.title}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="start" className="p-3 z-50 max-w-xs animate-in fade-in-50 duration-300">
                      <div className="space-y-2">
                        <p className="font-medium">{event.title}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <CalendarIcon className="h-3.5 w-3.5 text-gray-500" />
                          <span>{format(event.date, 'EEEE, MMMM d')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Clock className="h-3.5 w-3.5 text-gray-500" />
                          <span>{event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2 text-xs">
                            <MapPin className="h-3.5 w-3.5 text-gray-500" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      
      rows.push(
        <div className="grid grid-cols-7 divide-x divide-gray-200" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    
    return <div className="divide-y divide-gray-200">{rows}</div>;
  };

  const renderTimeBasedView = () => {
    let startDate;
    let endDate;
    
    if (currentView === "week") {
      startDate = startOfWeek(currentDate);
      endDate = addDays(startDate, 6);
    } else {
      // Day view
      startDate = currentDate;
      endDate = currentDate;
    }

    const numberOfDays = currentView === "week" ? 7 : 1;
    
    return (
      <div className="flex relative">
        {renderTimeColumn()}
        <div className={`flex-1 grid grid-cols-${numberOfDays}`}>
          {Array.from({ length: numberOfDays }).map((_, dayIndex) => {
            const currentDay = addDays(startDate, dayIndex);
            
            return (
              <div key={dayIndex} className="relative divide-y divide-gray-200">
                {hoursOfDay.map((hour) => {
                  const hourDate = addHours(startOfDay(currentDay), hour);
                  const hourEvents = events.filter(event => {
                    const eventHour = parseInt(event.time.split(':')[0]);
                    return isSameDay(event.date, currentDay) && eventHour === hour;
                  });

                  return (
                    <div key={hour} className="h-20 relative">
                      {hourEvents.map((event) => (
                        <TooltipProvider key={event.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className={`absolute top-0 left-0 right-0 mx-1 p-1 text-xs rounded cursor-pointer hover:opacity-80 ${event.colorClass || 'bg-blue-100 text-blue-800'}`}
                                style={{ 
                                  zIndex: 10,
                                  minHeight: "24px",
                                  maxHeight: event.duration ? `${Math.min(event.duration / 60 * 80, 80)}%` : "80%"
                                }}
                                onClick={() => onEventClick(event)}
                              >
                                <div className="font-medium truncate">{event.title}</div>
                                <div className="truncate">{event.time}</div>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent side="right" align="start" className="p-3 z-50 max-w-xs animate-in fade-in-50 duration-300">
                              <div className="space-y-2">
                                <p className="font-medium">{event.title}</p>
                                <div className="flex items-center gap-2 text-xs">
                                  <CalendarIcon className="h-3.5 w-3.5 text-gray-500" />
                                  <span>{format(event.date, 'EEEE, MMMM d')}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs">
                                  <Clock className="h-3.5 w-3.5 text-gray-500" />
                                  <span>{event.time}</span>
                                  {event.duration && (
                                    <span className="text-gray-500">
                                      ({event.duration >= 60 
                                        ? `${Math.floor(event.duration / 60)}h${event.duration % 60 > 0 ? ` ${event.duration % 60}m` : ''}`
                                        : `${event.duration}m`})
                                    </span>
                                  )}
                                </div>
                                {event.location && (
                                  <div className="flex items-center gap-2 text-xs">
                                    <MapPin className="h-3.5 w-3.5 text-gray-500" />
                                    <span>{event.location}</span>
                                  </div>
                                )}
                                {event.description && (
                                  <p className="text-xs text-gray-600 mt-1">{event.description}</p>
                                )}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="calendar w-full">
      {renderDays()}
      <div className="border-l border-t divide-y divide-gray-200">
        {currentView === "month" ? renderMonthView() : renderTimeBasedView()}
      </div>
    </div>
  );
};
