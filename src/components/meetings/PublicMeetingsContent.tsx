import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, MapPin, Users, Building, Search, SortAsc, User, UserCheck, DoorOpen } from "lucide-react";
import BoringAvatar from "boring-avatars";

interface PublicMeetingsContentProps {
  onScheduleRoom: (room: any) => void;
}

export const PublicMeetingsContent = ({ onScheduleRoom }: PublicMeetingsContentProps) => {
  const [sortBy, setSortBy] = useState("rooms");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for different browse types
  const attendeesData = [
    {
      id: 1,
      name: "Sarah Johnson",
      designation: "Innovation Director",
      company: "TechCorp",
      availableSlots: ["10:00 AM", "2:00 PM", "4:00 PM"],
      tags: ["AI", "Innovation", "Strategy"]
    },
    {
      id: 2,
      name: "Michael Zhang",
      designation: "AI Research Lead",
      company: "InnovateX",
      availableSlots: ["9:00 AM", "11:00 AM", "3:00 PM"],
      tags: ["Machine Learning", "Research", "AI"]
    },
    {
      id: 3,
      name: "Jessica Lee",
      designation: "Data Science Manager",
      company: "DataVision",
      availableSlots: ["1:00 PM", "3:30 PM", "5:00 PM"],
      tags: ["Data Science", "Analytics", "Insights"]
    }
  ];

  const roomsData = [
    {
      id: 1,
      name: "Innovation Hub",
      capacity: 8,
      availableSlots: ["10:00 AM", "2:00 PM", "4:00 PM"],
      features: ["Projector", "Whiteboard", "Video Conference"],
      location: "Main Hall - Pod 3",
      host: {
        name: "Conference Center",
        company: "Event Venue"
      }
    },
    {
      id: 2,
      name: "AI Solutions Center",
      capacity: 12,
      availableSlots: ["9:00 AM", "11:00 AM", "3:00 PM"],
      features: ["Smart Board", "4K Display", "Recording Equipment"],
      location: "Tech Wing - Room 205",
      host: {
        name: "Tech Center",
        company: "Innovation Hub"
      }
    },
    {
      id: 3,
      name: "Data Analytics Lounge",
      capacity: 6,
      availableSlots: ["1:00 PM", "3:30 PM", "5:00 PM"],
      features: ["Dual Monitors", "Analytics Tools", "Private"],
      location: "Analytics Floor - Suite 12",
      host: {
        name: "Analytics Team",
        company: "Data Center"
      }
    },
    {
      id: 4,
      name: "Security Operations Room",
      capacity: 10,
      availableSlots: ["10:30 AM", "2:30 PM", "4:30 PM"],
      features: ["Secure Network", "Privacy Glass", "Encrypted"],
      location: "Security Wing - Room 101",
      host: {
        name: "Security Operations",
        company: "SecureNet"
      }
    }
  ];

  const exhibitorsData = [
    {
      id: 1,
      name: "TechCorp Solutions",
      boothNumber: "A-101",
      logo: "/placeholder.svg",
      representative: "Sarah Johnson",
      availableSlots: ["10:00 AM", "2:00 PM", "4:00 PM"],
      specialties: ["Enterprise Software", "Cloud Solutions"]
    },
    {
      id: 2,
      name: "InnovateX Labs",
      boothNumber: "B-205",
      logo: "/placeholder.svg",
      representative: "Michael Zhang",
      availableSlots: ["9:00 AM", "11:00 AM", "3:00 PM"],
      specialties: ["AI Technology", "Machine Learning"]
    },
    {
      id: 3,
      name: "DataVision Analytics",
      boothNumber: "C-310",
      logo: "/placeholder.svg",
      representative: "Jessica Lee",
      availableSlots: ["1:00 PM", "3:30 PM", "5:00 PM"],
      specialties: ["Business Intelligence", "Data Analytics"]
    }
  ];

  const getFilteredData = () => {
    let data = [];
    
    switch (sortBy) {
      case "names":
        data = attendeesData;
        break;
      case "rooms":
        data = roomsData;
        break;
      case "companies":
        data = exhibitorsData;
        break;
      default:
        data = roomsData;
    }

    return data.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.company && item.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.designation && item.designation.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const filteredData = getFilteredData();

  const renderAttendeesCard = (attendee: any) => (
    <Card key={attendee.id} className="border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex gap-4">
            <BoringAvatar 
              size={56} 
              name={attendee.name} 
              variant="marble" 
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} 
            />
            
            <div className="space-y-3 flex-1">
              <div>
                <h3 className="text-xl font-semibold">{attendee.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{attendee.designation}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {attendee.company}
                  </Badge>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {attendee.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-between lg:items-end">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Available Today:</p>
              <div className="flex flex-wrap gap-1">
                {attendee.availableSlots.map((slot: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    <Clock className="h-3 w-3 mr-1" />
                    {slot}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button 
              className="w-full lg:w-auto"
              onClick={() => onScheduleRoom(attendee)}
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Schedule Meeting
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderRoomsCard = (room: any) => (
    <Card key={room.id} className="border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
              <DoorOpen className="h-8 w-8 text-blue-600" />
            </div>
            
            <div className="space-y-3 flex-1">
              <div>
                <h3 className="text-xl font-semibold">{room.name}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1.5" />
                    <span>Up to {room.capacity} people</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {room.features.map((feature: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-between lg:items-end">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Available Today:</p>
              <div className="flex flex-wrap gap-1">
                {room.availableSlots.map((slot: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    <Clock className="h-3 w-3 mr-1" />
                    {slot}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button 
              className="w-full lg:w-auto"
              onClick={() => onScheduleRoom(room)}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Room
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderExhibitorsCard = (exhibitor: any) => (
    <Card key={exhibitor.id} className="border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex gap-4">
            <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img 
                src={exhibitor.logo} 
                alt={exhibitor.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<Building class="h-8 w-8 text-gray-600" />';
                }}
              />
              <Building className="h-8 w-8 text-gray-600" />
            </div>
            
            <div className="space-y-3 flex-1">
              <div>
                <h3 className="text-xl font-semibold">{exhibitor.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    Booth {exhibitor.boothNumber}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Rep: {exhibitor.representative}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {exhibitor.specialties.map((specialty: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-between lg:items-end">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Available Today:</p>
              <div className="flex flex-wrap gap-1">
                {exhibitor.availableSlots.map((slot: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    <Clock className="h-3 w-3 mr-1" />
                    {slot}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button 
              className="w-full lg:w-auto"
              onClick={() => onScheduleRoom(exhibitor)}
            >
              <Building className="h-4 w-4 mr-2" />
              Visit Booth
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCard = (item: any) => {
    switch (sortBy) {
      case "names":
        return renderAttendeesCard(item);
      case "rooms":
        return renderRoomsCard(item);
      case "companies":
        return renderExhibitorsCard(item);
      default:
        return renderRoomsCard(item);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SortAsc className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="names">Browse by Names</SelectItem>
            <SelectItem value="rooms">Browse by Rooms</SelectItem>
            <SelectItem value="companies">Browse by Companies</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content Grid */}
      <div className="grid gap-4">
        {filteredData.map(item => renderCard(item))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No results found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};
