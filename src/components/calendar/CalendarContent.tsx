import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, CalendarDays, CalendarRange } from "lucide-react";
import { Calendar, Event } from "./Calendar";
import { EventModal } from "./EventModal";
import { addMonths, subMonths, format, addDays, subDays, addWeeks, subWeeks, startOfDay, addHours, addMinutes } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin } from "lucide-react";
import { useCalendar, CalendarFilter } from "@/contexts/CalendarContext";

// Generate random events with varying durations and categories
const generateRandomEvents = (count: number): Event[] => {
  const eventTypes = [
    { title: "AI Workshop", description: "Hands-on workshop on machine learning", category: "Sessions" as CalendarFilter },
    { title: "Keynote: Future of AI", description: "Opening keynote presentation", category: "Sessions" as CalendarFilter },
    { title: "Panel Discussion", description: "Expert panel on AI ethics", category: "Sessions" as CalendarFilter },
    { title: "Coffee Break Networking", description: "Informal networking during coffee break", category: "Networking" as CalendarFilter },
    { title: "Welcome Reception", description: "Opening reception for all attendees", category: "Networking" as CalendarFilter },
    { title: "Lunch & Learn", description: "Networking lunch with industry leaders", category: "Networking" as CalendarFilter },
    { title: "Team Meeting", description: "Weekly team sync meeting", category: "Meetings" as CalendarFilter },
    { title: "Client Call", description: "Discussion with client about project requirements", category: "Meetings" as CalendarFilter },
    { title: "Sponsor Meeting", description: "Meeting with event sponsors", category: "Meetings" as CalendarFilter },
    { title: "Tech Talk: Neural Networks", description: "Deep dive into neural network architectures", category: "Sessions" as CalendarFilter },
    { title: "Startup Pitch Session", description: "AI startup presentations", category: "Sessions" as CalendarFilter },
    { title: "Industry Mixer", description: "Evening networking event", category: "Networking" as CalendarFilter },
    { title: "Board Meeting", description: "Quarterly board meeting", category: "Meetings" as CalendarFilter },
    { title: "Code Review", description: "Review of AI model implementations", category: "Meetings" as CalendarFilter }
  ];

  const locations = [
    "Conference Room A", 
    "Conference Room B", 
    "Main Auditorium",
    "Zoom Meeting", 
    "Virtual Meeting Room",
    "Office Lobby",
    "Training Center",
    "Exhibition Hall",
    "Board Room"
  ];

  const colorClasses = {
    "Sessions": "bg-blue-100 text-blue-800",
    "Networking": "bg-green-100 text-green-800", 
    "Meetings": "bg-purple-100 text-purple-800"
  };

  const people = [
    { id: "1", name: "Alex Johnson", email: "alex@example.com" },
    { id: "2", name: "Taylor Smith", email: "taylor@example.com" },
    { id: "3", name: "Jordan Lee", email: "jordan@example.com" },
    { id: "4", name: "Morgan Brown", email: "morgan@example.com" },
    { id: "5", name: "Casey Davis", email: "casey@example.com" },
    { id: "6", name: "Riley Wilson", email: "riley@example.com" },
    { id: "7", name: "Sam Rodriguez", email: "sam@example.com" },
    { id: "8", name: "Jamie Martinez", email: "jamie@example.com" },
    { id: "9", name: "Quinn Thompson", email: "quinn@example.com" },
    { id: "10", name: "Avery Garcia", email: "avery@example.com" },
  ];

  const getRandomTime = () => {
    const hours = Math.floor(Math.random() * 12) + 8; // 8 AM to 7 PM
    const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    const period = hours < 12 ? "AM" : "PM";
    return `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const getRandomPeople = () => {
    const count = Math.floor(Math.random() * 5) + 1; // 1 to 5 people
    const selectedPeople = [];
    const availablePeople = [...people];
    
    for (let i = 0; i < count; i++) {
      if (availablePeople.length === 0) break;
      const randomIndex = Math.floor(Math.random() * availablePeople.length);
      selectedPeople.push(availablePeople[randomIndex]);
      availablePeople.splice(randomIndex, 1);
    }
    
    return selectedPeople;
  };

  const getRandomDuration = () => {
    // Generate a random duration between 15 minutes and 3 hours (in 15-minute increments)
    const durations = [15, 30, 45, 60, 75, 90, 120, 150, 180];
    return durations[Math.floor(Math.random() * durations.length)];
  };

  const events: Event[] = [];
  const today = new Date();
  const startDay = addDays(today, -15);

  // Generate random events
  for (let i = 0; i < count; i++) {
    const randomDayOffset = Math.floor(Math.random() * 30);
    const eventDate = addDays(startDay, randomDayOffset);
    
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const randomTimeStart = getRandomTime();
    const duration = getRandomDuration();
    
    const event: Event = {
      id: uuidv4(),
      title: eventType.title,
      date: eventDate,
      time: randomTimeStart,
      description: eventType.description,
      location: locations[Math.floor(Math.random() * locations.length)],
      colorClass: colorClasses[eventType.category],
      attendees: getRandomPeople(),
      duration: duration,
      category: eventType.category
    };
    
    events.push(event);
  }

  // Add multiple events on today's date to test the day view
  const todayEvents = 5;
  for (let i = 0; i < todayEvents; i++) {
    const hour = 9 + i; // Starting from 9 AM, adding events hourly
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const duration = getRandomDuration();
    
    const event: Event = {
      id: uuidv4(),
      title: `Today: ${eventType.title}`,
      date: today,
      time: `${hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`,
      description: `Special today's event: ${eventType.description}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      colorClass: colorClasses[eventType.category],
      attendees: getRandomPeople(),
      duration: duration,
      category: eventType.category
    };
    
    events.push(event);
  }

  return events;
};

export const CalendarContent = () => {
  const { selectedDate, setSelectedDate, activeFilters } = useCalendar();
  const [currentDate, setCurrentDate] = useState<Date>(selectedDate);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<"month" | "week" | "day">("month");
  const [events, setEvents] = useState<Event[]>(generateRandomEvents(50));
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState<boolean>(false);

  // Filter events based on active filters
  const filteredEvents = events.filter(event => activeFilters.includes(event.category));

  // Sync with shared calendar state
  React.useEffect(() => {
    setCurrentDate(selectedDate);
  }, [selectedDate]);

  const handleNavigation = (direction: "previous" | "next") => {
    let newDate;
    switch (currentView) {
      case "day":
        newDate = direction === "previous" ? subDays(currentDate, 1) : addDays(currentDate, 1);
        break;
      case "week":
        newDate = direction === "previous" ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1);
        break;
      case "month":
        newDate = direction === "previous" ? subMonths(currentDate, 1) : addMonths(currentDate, 1);
        break;
    }
    setCurrentDate(newDate);
    setSelectedDate(newDate); // Sync with shared state
  };

  const handleCurrentDate = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today); // Sync with shared state
  };

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    setSelectedDate(date); // Sync with shared state
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
  };

  const formatEventTime = (event: Event) => {
    // Format the start time
    const startTime = event.time;
    
    // If there's a duration, calculate end time
    if (event.duration) {
      const [hourStr, minuteStr] = event.time.split(':');
      const hourPeriod = event.time.includes('PM') ? 'PM' : 'AM';
      const hour = parseInt(hourStr);
      const minute = parseInt(minuteStr);
      
      // Create a date object for the start time
      const startDate = startOfDay(event.date);
      const eventStart = addHours(startDate, hour + (hourPeriod === 'PM' && hour !== 12 ? 12 : 0));
      const eventStartWithMinutes = addMinutes(eventStart, minute);
      
      // Add duration to get end time
      const eventEnd = addMinutes(eventStartWithMinutes, event.duration);
      
      // Format the end time
      const endHour = eventEnd.getHours();
      const endMinute = eventEnd.getMinutes();
      const endPeriod = endHour >= 12 ? 'PM' : 'AM';
      const displayEndHour = endHour % 12 || 12;
      
      return `${startTime} - ${displayEndHour}:${endMinute.toString().padStart(2, '0')} ${endPeriod}`;
    }
    
    return startTime;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 px-6 pt-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>

      <Card className="bg-white overflow-hidden border-0 rounded-none shadow-sm">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleNavigation("previous")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleNavigation("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleCurrentDate}>
              Today
            </Button>
          </div>
          <div className="text-lg font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </div>
          
          <Tabs 
            value={currentView} 
            onValueChange={(value) => setCurrentView(value as "month" | "week" | "day")}
            className="w-auto"
          >
            <TabsList>
              <TabsTrigger value="month" className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                <span>Month</span>
              </TabsTrigger>
              <TabsTrigger value="week" className="flex items-center gap-1.5">
                <CalendarRange className="h-4 w-4" />
                <span>Week</span>
              </TabsTrigger>
              <TabsTrigger value="day" className="flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4" />
                <span>Day</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Calendar 
          events={filteredEvents}
          currentDate={currentDate}
          currentView={currentView}
          onDateChange={handleDateChange}
          onEventClick={handleEventClick}
        />
      </Card>

      <EventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={(event) => {
          const newEvent = {
            ...event,
            id: uuidv4(),
            colorClass: "bg-blue-100 text-blue-800",
            duration: 60,
            category: "Meetings" as CalendarFilter // Default to Meetings for new events
          };
          
          setEvents([...events, newEvent]);
          setIsModalOpen(false);
        }}
      />

      {/* Improved Event Details Modal */}
      <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedEvent.title}</DialogTitle>
              </DialogHeader>
              
              <div className="py-4 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-medium">{format(selectedEvent.date, 'EEEE, MMMM dd, yyyy')}</div>
                    <div className="text-gray-600">{formatEventTime(selectedEvent)}</div>
                    {selectedEvent.duration && (
                      <div className="text-sm text-gray-500">
                        Duration: {selectedEvent.duration >= 60 
                          ? `${Math.floor(selectedEvent.duration / 60)}h ${selectedEvent.duration % 60 > 0 ? `${selectedEvent.duration % 60}m` : ''}`
                          : `${selectedEvent.duration}m`}
                      </div>
                    )}
                  </div>
                </div>
                
                {selectedEvent.location && (
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-medium">{selectedEvent.location}</div>
                  </div>
                )}
                
                {selectedEvent.description && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                    <p className="text-sm">{selectedEvent.description}</p>
                  </div>
                )}
                
                {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Attendees ({selectedEvent.attendees.length})</h3>
                    <div className="space-y-3">
                      {selectedEvent.attendees.map(person => (
                        <div key={person.id} className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                            {person.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium">{person.name}</div>
                            <div className="text-xs text-gray-500">{person.email}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter className="flex items-center justify-between sm:justify-between flex-row pt-2">
                <Button 
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => {
                    // Generate Google Calendar link
                    const text = encodeURIComponent(selectedEvent.title);
                    const dates = encodeURIComponent(format(selectedEvent.date, "yyyyMMdd'T'HHmmss'Z'"));
                    const details = encodeURIComponent(selectedEvent.description || '');
                    const location = encodeURIComponent(selectedEvent.location || '');
                    
                    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}/${dates}&details=${details}&location=${location}`;
                    window.open(url, '_blank');
                  }}
                >
                  <CalendarIcon className="h-4 w-4" />
                  Add to Google Calendar
                </Button>
                <Button onClick={() => setIsEventDetailsOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
