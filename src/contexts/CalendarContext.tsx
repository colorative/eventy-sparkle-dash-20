
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CalendarFilter = 'Sessions' | 'Networking' | 'Meetings';

interface CalendarContextType {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  activeFilters: CalendarFilter[];
  toggleFilter: (filter: CalendarFilter) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeFilters, setActiveFilters] = useState<CalendarFilter[]>(['Sessions', 'Networking', 'Meetings']);

  const toggleFilter = (filter: CalendarFilter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <CalendarContext.Provider value={{ 
      selectedDate, 
      setSelectedDate, 
      activeFilters, 
      toggleFilter 
    }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
