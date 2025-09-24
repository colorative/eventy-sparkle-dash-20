
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface Person {
  id: string;
  name: string;
  email: string;
}

export interface Event {
  id?: string;
  title: string;
  date: Date;
  time: string;
  description?: string;
  location?: string;
  attendees?: Person[];
  colorClass?: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  event?: Event;
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSave, event }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [attendeeInput, setAttendeeInput] = useState("");
  const [attendees, setAttendees] = useState<Person[]>([]);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setTime(event.time);
      setDescription(event.description || "");
      setLocation(event.location || "");
      setAttendees(event.attendees || []);
    } else {
      // Reset form for new event
      setTitle("");
      setDate(new Date());
      setTime("");
      setDescription("");
      setLocation("");
      setAttendees([]);
    }
  }, [event, isOpen]);

  const handleAddAttendee = () => {
    if (!attendeeInput.trim()) return;
    
    const [name, email] = attendeeInput.split('@');
    
    if (name) {
      const newAttendee: Person = {
        id: Date.now().toString(),
        name: email ? name : attendeeInput,
        email: email ? `${name}@${email}` : ""
      };
      
      setAttendees([...attendees, newAttendee]);
      setAttendeeInput("");
    }
  };

  const handleRemoveAttendee = (id: string) => {
    setAttendees(attendees.filter(a => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent: Event = {
      id: event?.id || Date.now().toString(),
      title,
      date,
      time,
      description,
      location,
      attendees: attendees.length > 0 ? attendees : undefined
    };
    
    onSave(newEvent);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Add New Event"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter event title" 
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      date && setDate(date);
                      setIsCalendarOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="flex">
                <div className="flex items-center bg-gray-100 px-3 rounded-l-md border border-r-0">
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>
                <Input 
                  id="time" 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. 9:00 AM - 10:00 AM" 
                  className="rounded-l-none"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex">
              <div className="flex items-center bg-gray-100 px-3 rounded-l-md border border-r-0">
                <MapPin className="h-4 w-4 text-gray-500" />
              </div>
              <Input 
                id="location" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location" 
                className="rounded-l-none"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description" 
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Attendees</Label>
            <div className="flex gap-2">
              <Input
                value={attendeeInput}
                onChange={(e) => setAttendeeInput(e.target.value)}
                placeholder="Name or email"
              />
              <Button type="button" onClick={handleAddAttendee}>Add</Button>
            </div>
            
            {attendees.length > 0 && (
              <div className="mt-2 space-y-2">
                {attendees.map(attendee => (
                  <div key={attendee.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div>
                      <div className="font-medium">{attendee.name}</div>
                      {attendee.email && <div className="text-xs text-gray-500">{attendee.email}</div>}
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveAttendee(attendee.id)}
                    >
                      &times;
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {event ? "Update Event" : "Save Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
