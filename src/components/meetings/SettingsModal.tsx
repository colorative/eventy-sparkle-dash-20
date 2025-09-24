
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Clock } from "lucide-react";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

export const SettingsModal = ({ open, onOpenChange }: SettingsModalProps) => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: "1",
      day: "monday",
      startTime: "10:00",
      endTime: "12:00"
    }
  ]);

  const daysOfWeek = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" }
  ];

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return [
      { value: `${hour}:00`, label: `${hour}:00` },
      { value: `${hour}:30`, label: `${hour}:30` }
    ];
  }).flat();

  const addTimeSlot = () => {
    const newSlot: TimeSlot = {
      id: Date.now().toString(),
      day: "monday",
      startTime: "09:00",
      endTime: "10:00"
    };
    setTimeSlots([...timeSlots, newSlot]);
  };

  const removeTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };

  const updateTimeSlot = (id: string, field: keyof TimeSlot, value: string) => {
    setTimeSlots(timeSlots.map(slot => 
      slot.id === id ? { ...slot, [field]: value } : slot
    ));
  };

  const handleSave = () => {
    // Here you would typically save to your backend/state management
    console.log("Saving availability settings:", { isAvailable, timeSlots });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Availability Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Global Availability Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">General Availability</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="availability">Accept Meeting Requests</Label>
                  <p className="text-sm text-gray-500">
                    Allow others to schedule meetings with you during your available hours
                  </p>
                </div>
                <Switch
                  id="availability"
                  checked={isAvailable}
                  onCheckedChange={setIsAvailable}
                />
              </div>
            </CardContent>
          </Card>

          {/* Weekly Schedule */}
          {isAvailable && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Weekly Schedule</CardTitle>
                <Button onClick={addTimeSlot} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Time Slot
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {timeSlots.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No time slots configured</p>
                    <Button onClick={addTimeSlot} variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Time Slot
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {timeSlots.map((slot) => (
                      <div key={slot.id} className="flex flex-col sm:flex-row gap-3 p-4 border rounded-lg">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              Day
                            </Label>
                            <Select
                              value={slot.day}
                              onValueChange={(value) => updateTimeSlot(slot.id, 'day', value)}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {daysOfWeek.map((day) => (
                                  <SelectItem key={day.value} value={day.value}>
                                    {day.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              Start Time
                            </Label>
                            <Select
                              value={slot.startTime}
                              onValueChange={(value) => updateTimeSlot(slot.id, 'startTime', value)}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time.value} value={time.value}>
                                    {time.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                              End Time
                            </Label>
                            <Select
                              value={slot.endTime}
                              onValueChange={(value) => updateTimeSlot(slot.id, 'endTime', value)}
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time.value} value={time.value}>
                                    {time.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTimeSlot(slot.id)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
