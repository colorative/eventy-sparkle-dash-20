
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Search, 
  ArrowLeft,
  Building
} from "lucide-react";
import BoringAvatar from "boring-avatars";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Meeting title must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  startTime: z.string({
    required_error: "Please select a start time.",
  }),
  endTime: z.string({
    required_error: "Please select an end time.",
  }),
  location: z.string().min(2, {
    message: "Please select a meeting location.",
  }),
  description: z.string().optional(),
  attendees: z.array(z.string()).min(1, {
    message: "Please add at least one attendee.",
  }),
  sendInvites: z.boolean().default(true),
});

const timeSlots = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", 
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", 
  "5:00 PM", "5:30 PM"
];

const locations = [
  "Main Hall - Meeting Pod 1",
  "Main Hall - Meeting Pod 2",
  "Main Hall - Meeting Pod 3",
  "Main Hall - Meeting Pod 4",
  "Networking Lounge - Table 1",
  "Networking Lounge - Table 2",
  "Networking Lounge - Table 3",
  "Exhibitor Hall - Booth #104",
  "Exhibitor Hall - Booth #237",
  "Virtual Meeting Room",
];

// Mock suggested attendees
const suggestedAttendees = [
  { id: "1", name: "Sarah Johnson", role: "Product Manager", company: "TechCorp" },
  { id: "2", name: "Michael Zhang", role: "CTO", company: "InnovateX" },
  { id: "3", name: "Emily Wong", role: "Director of Sales", company: "AI Solutions" },
  { id: "4", name: "James Wilson", role: "CEO", company: "SecureTech" },
  { id: "5", name: "Alex Rodriguez", role: "VP Engineering", company: "DataVision" },
  { id: "6", name: "Jessica Lee", role: "Marketing Director", company: "CloudTech" },
];

const NewMeeting = () => {
  const navigate = useNavigate();
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAttendees = suggestedAttendees.filter(attendee => 
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      attendees: [],
      sendInvites: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would be sent to an API
    console.log(values);
    
    toast({
      title: "Meeting scheduled",
      description: `Your meeting has been scheduled for ${format(values.date, "MMMM d, yyyy")} at ${values.startTime}`,
    });
    
    // Redirect to meetings page
    setTimeout(() => {
      navigate("/meetings");
    }, 1500);
  };

  // Add/remove attendees
  const toggleAttendee = (attendeeId: string) => {
    setSelectedAttendees(prev => {
      const isSelected = prev.includes(attendeeId);
      const newSelection = isSelected 
        ? prev.filter(id => id !== attendeeId)
        : [...prev, attendeeId];
      
      // Update form value
      form.setValue("attendees", newSelection);
      return newSelection;
    });
  };

  return (
    <PageLayout>
      <div className="container p-6 max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="mr-4"
            onClick={() => navigate("/meetings")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Meetings
          </Button>
          <h1 className="text-2xl font-bold">Schedule New Meeting</h1>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meeting Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter meeting title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full pl-3 text-left font-normal"
                                >
                                {field.value ? (
                                  format(field.value, "MMMM d, yyyy")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter meeting details, agenda, or any additional information" 
                          className="resize-none min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="attendees"
                  render={() => (
                    <FormItem>
                      <FormLabel>Attendees</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                              type="search"
                              placeholder="Search attendees..."
                              className="pl-9"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                          
                          <div className="border rounded-md max-h-[300px] overflow-auto">
                            {filteredAttendees.length > 0 ? (
                              filteredAttendees.map((attendee) => (
                                <div 
                                  key={attendee.id}
                                  className={`flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer ${
                                    selectedAttendees.includes(attendee.id) ? "bg-indigo-50" : ""
                                  }`}
                                  onClick={() => toggleAttendee(attendee.id)}
                                >
                                  <Checkbox 
                                    checked={selectedAttendees.includes(attendee.id)} 
                                    onCheckedChange={() => toggleAttendee(attendee.id)}
                                  />
                                  <div className="flex items-center gap-3 flex-1">
                                    <BoringAvatar
                                      size={40}
                                      name={attendee.name}
                                      variant="marble"
                                      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                                    />
                                    <div>
                                      <p className="font-medium">{attendee.name}</p>
                                      <div className="flex items-center text-sm text-gray-500">
                                        <Building className="h-3 w-3 mr-1" />
                                        <span>{attendee.role} at {attendee.company}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="p-4 text-center text-gray-500">
                                No attendees found matching your search
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="h-4 w-4 mr-2" />
                            <span>{selectedAttendees.length} attendees selected</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sendInvites"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Send calendar invites to all attendees</FormLabel>
                        <FormDescription>
                          Attendees will receive an email with meeting details and calendar file
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/meetings")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Schedule Meeting</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default NewMeeting;
