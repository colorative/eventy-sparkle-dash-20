
import React from "react";
import { Link } from "react-router-dom";
import { Check, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import BoringAvatar from "boring-avatars";

interface Attendee {
  id: number;
  name: string;
  role: string;
  company: string;
  interests: string[];
  location: string;
  bio: string;
  connections: number;
  isSaved: boolean;
  isConnected: boolean;
}

interface AttendeesListProps {
  attendees: Attendee[];
  viewMode: "grid" | "list";
}

export const AttendeesList: React.FC<AttendeesListProps> = ({ attendees, viewMode }) => {
  const toggleSaved = (id: number) => {
    toast({
      title: "Item saved",
      description: "The item has been added to your saved list.",
    });
  };

  const connectWithAttendee = (id: number) => {
    toast({
      title: "Connection request sent",
      description: "Your connection request has been sent.",
    });
  };

  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {attendees.map((attendee) => (
          <Card key={attendee.id} className="overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700 dark:bg-gray-800">
            <Link to={`/attendees/${attendee.id}`}>
              <CardContent className="p-5">
                <div className="flex justify-end mb-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`h-6 w-6 ${attendee.isSaved ? "text-red-500" : "text-gray-400"}`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSaved(attendee.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={attendee.isSaved ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </Button>
                </div>
                
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="h-16 w-16 mb-3">
                    <BoringAvatar
                      size={64}
                      name={attendee.name}
                      variant="marble"
                      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                    />
                  </div>
                  <h3 className="font-medium dark:text-white">{attendee.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{attendee.role} at {attendee.company}</p>
                  
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {attendee.location}
                  </div>
                </div>
                
                <div className="text-sm text-center text-gray-600 dark:text-gray-300 mb-3">
                  <p>{attendee.bio.substring(0, 80)}...</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {attendee.interests.map((interest, i) => (
                    <Badge key={i} variant="secondary" className="text-xs bg-slate-100 dark:bg-gray-700">{interest}</Badge>
                  ))}
                </div>
                
                <div className="flex justify-center gap-2">
                  {!attendee.isConnected ? (
                    <Button 
                      size="sm" 
                      className="flex-1 max-w-[120px]"
                      onClick={(e) => {
                        e.preventDefault();
                        connectWithAttendee(attendee.id);
                      }}
                    >
                      Connect
                    </Button>
                  ) : (
                    <Badge variant="outline" className="py-1 px-3 flex items-center gap-1 dark:border-green-800 dark:text-green-300 border-green-200 text-green-700">
                      <Check className="h-3 w-3" />
                      Connected
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {attendees.map((attendee) => (
        <Link to={`/attendees/${attendee.id}`} key={attendee.id} className="block">
          <Card className="p-0 overflow-hidden hover:shadow-md transition-all border-gray-200 dark:border-gray-700 dark:bg-gray-800">
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                <div className="flex-shrink-0 h-12 w-12">
                  <BoringAvatar
                    size={48}
                    name={attendee.name}
                    variant="marble"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                  />
                </div>
                
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium dark:text-white">{attendee.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{attendee.role} at {attendee.company}</p>
                      
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {attendee.location}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {attendee.interests.map((interest, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-slate-100 dark:bg-gray-700">{interest}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={attendee.isSaved ? "text-red-500" : "text-gray-500"}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSaved(attendee.id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={attendee.isSaved ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </Button>
                  
                  {!attendee.isConnected ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={(e) => {
                        e.preventDefault();
                        connectWithAttendee(attendee.id);
                      }}
                    >
                      Connect
                    </Button>
                  ) : (
                    <Badge variant="outline" className="flex items-center gap-1 dark:border-green-800 dark:text-green-300 border-green-200 text-green-700">
                      <Check className="h-3 w-3" />
                      Connected
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
