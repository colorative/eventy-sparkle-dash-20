
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { useCalendar } from "@/contexts/CalendarContext"

export function DatePicker() {
  const { selectedDate, setSelectedDate } = useCalendar()

  return (
    <div className="px-2 pt-6 pb-2">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => date && setSelectedDate(date)}
        className="w-full pt-0 px-3 pb-3 pointer-events-auto"
        showOutsideDays={false}
      />
    </div>
  )
}
