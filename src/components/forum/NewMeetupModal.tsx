
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface NewMeetupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewMeetupModal: React.FC<NewMeetupModalProps> = ({ open, onOpenChange }) => {
  const [meetupType, setMeetupType] = useState<"in-person" | "virtual">("in-person");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("10:30");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    // In a real app, this would send data to backend
    console.log("Creating meetup:", { meetupType, title, date, time, location });
    onOpenChange(false);
    // Reset form
    setTitle("");
    setDate(undefined);
    setTime("10:30");
    setLocation("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Meetup</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Tabs value={meetupType} onValueChange={(value) => setMeetupType(value as "in-person" | "virtual")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="in-person">In-person</TabsTrigger>
              <TabsTrigger value="virtual">Virtual</TabsTrigger>
            </TabsList>
            <TabsContent value="in-person" className="mt-4">
              <p className="text-sm text-muted-foreground">Physical meetup location required</p>
            </TabsContent>
            <TabsContent value="virtual" className="mt-4">
              <p className="text-sm text-muted-foreground">Meeting link will be provided</p>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="meetup-title">Meetup Title</Label>
            <Input
              id="meetup-title"
              placeholder="Enter meetup title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetup-time">Time</Label>
              <Input
                type="time"
                id="meetup-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meetup-location">
              {meetupType === "in-person" ? "Location" : "Meeting Link"}
            </Label>
            <Input
              id="meetup-location"
              placeholder={meetupType === "in-person" ? "Enter location" : "Enter meeting link"}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title || !date || !time || !location}>
            Create Meetup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
