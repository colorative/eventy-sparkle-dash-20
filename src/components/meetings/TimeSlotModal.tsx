
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Clock, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";
import BoringAvatar from "boring-avatars";

interface TimeSlotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRoom: any;
  selectedDate: Date;
}

export const TimeSlotModal = ({ open, onOpenChange, selectedRoom, selectedDate }: TimeSlotModalProps) => {
  const [calendarDate, setCalendarDate] = useState<Date>(selectedDate);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [step, setStep] = useState<'date' | 'time' | 'confirm'>('date');

  // Mock available time slots for the selected date
  const getAvailableTimeSlots = (date: Date) => {
    // This would typically come from your backend
    const baseSlots = [
      "09:00 AM - 09:30 AM",
      "10:00 AM - 10:30 AM", 
      "11:00 AM - 11:30 AM",
      "01:00 PM - 01:30 PM",
      "02:00 PM - 02:30 PM",
      "03:00 PM - 03:30 PM",
      "04:00 PM - 04:30 PM"
    ];
    
    // Simulate some slots being unavailable
    if (isSameDay(date, new Date())) {
      return baseSlots.slice(2); // Remove morning slots for today
    }
    
    return baseSlots;
  };

  const availableSlots = selectedRoom ? getAvailableTimeSlots(calendarDate) : [];

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setCalendarDate(date);
      setStep('time');
      setSelectedTimeSlot(""); // Reset time slot when date changes
    }
  };

  const handleTimeSlotSelect = (slot: string) => {
    setSelectedTimeSlot(slot);
    setStep('confirm');
  };

  const handleConfirmBooking = () => {
    // Here you would typically make an API call to book the meeting
    console.log("Booking meeting:", {
      room: selectedRoom,
      date: format(calendarDate, 'yyyy-MM-dd'),
      timeSlot: selectedTimeSlot
    });
    
    onOpenChange(false);
    // Reset state
    setStep('date');
    setSelectedTimeSlot("");
  };

  const handleBack = () => {
    if (step === 'time') {
      setStep('date');
    } else if (step === 'confirm') {
      setStep('time');
    }
  };

  if (!selectedRoom) return null;

  // Safely access room properties with fallbacks
  const roomName = selectedRoom.name || "Room";
  const hostName = selectedRoom.host?.name || selectedRoom.representative || "Host";
  const hostCompany = selectedRoom.host?.company || selectedRoom.company || "Company";
  const roomLocation = selectedRoom.location || `Booth ${selectedRoom.boothNumber}` || "Location TBD";
  const roomCapacity = selectedRoom.capacity || "TBD";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Schedule Meeting - {roomName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Room Info */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <BoringAvatar 
                  size={48} 
                  name={hostName} 
                  variant="marble" 
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} 
                />
                <div>
                  <h3 className="font-semibold">{roomName}</h3>
                  <p className="text-sm text-gray-600">{hostCompany}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {roomLocation}
                    </div>
                    {roomCapacity && (
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        Up to {roomCapacity} people
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4">
            {['date', 'time', 'confirm'].map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === stepName 
                    ? 'bg-primary text-primary-foreground' 
                    : ['date', 'time', 'confirm'].indexOf(step) > index
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                {index < 2 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    ['date', 'time', 'confirm'].indexOf(step) > index ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          {step === 'date' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Select a Date</h3>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={calendarDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border p-3 pointer-events-auto"
                />
              </div>
            </div>
          )}

          {step === 'time' && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Select a Time</h3>
                <p className="text-gray-600">
                  {format(calendarDate, 'EEEE, MMMM do, yyyy')}
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant="outline"
                    className={`p-4 h-auto flex flex-col items-center ${
                      selectedTimeSlot === slot ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => handleTimeSlotSelect(slot)}
                  >
                    <Clock className="h-4 w-4 mb-1" />
                    <span className="text-sm font-medium">{slot}</span>
                  </Button>
                ))}
              </div>

              {availableSlots.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No available time slots for this date.</p>
                  <p className="text-sm text-gray-400 mt-1">Please select a different date.</p>
                </div>
              )}
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold">Confirm Your Meeting</h3>
                <p className="text-gray-600">Please review the details below</p>
              </div>
              
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Room:</span>
                    <span>{roomName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{format(calendarDate, 'EEEE, MMMM do, yyyy')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Time:</span>
                    <Badge variant="outline">{selectedTimeSlot}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Location:</span>
                    <span>{roomLocation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Host:</span>
                    <span>{hostName}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <div>
            {step !== 'date' && (
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {step === 'confirm' && (
              <Button onClick={handleConfirmBooking}>
                Confirm Booking
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
