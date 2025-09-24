import React, { useState } from "react";
import { ForumCategory } from "@/types/forum";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, MapPin, MessageSquare } from "lucide-react";
import Avatar3d from "boring-avatars";
import { useNavigate } from "react-router-dom";
import { NewMeetupModal } from "../NewMeetupModal";

interface MeetupsContentProps {
  category: ForumCategory;
}

// Mock meetup posts
const meetupPosts = [
  {
    id: 1,
    title: "Sustainable Design Meetup",
    location: "Tech Hub, Downtown",
    date: "2024-07-15",
    time: "18:00",
    organizerName: "Emily Carter",
    organizerAvatar: "",
    description: "Join us for a discussion on sustainable design practices and how to implement them in your projects.",
    attendees: 25,
    comments: 8
  },
  {
    id: 2,
    title: "Innovation in Tech Meetup",
    location: "Innovation Center, Midtown",
    date: "2024-07-22",
    time: "19:00",
    organizerName: "Alex Johnson",
    organizerAvatar: "",
    description: "Explore the latest innovations in technology and network with industry professionals.",
    attendees: 30,
    comments: 12
  },
  {
    id: 3,
    title: "Creative Minds Meetup",
    location: "Art Gallery, Uptown",
    date: "2024-07-29",
    time: "17:30",
    organizerName: "Sophia Lee",
    organizerAvatar: "",
    description: "A gathering for creative minds to share ideas, collaborate, and inspire each other.",
    attendees: 20,
    comments: 5
  }
];

export const MeetupsContent: React.FC<MeetupsContentProps> = ({ category }) => {
  const navigate = useNavigate();
  const [showNewMeetupModal, setShowNewMeetupModal] = useState(false);

  const handleViewDetails = (meetupId: number) => {
    navigate(`/community-forum/meetup/${meetupId}`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Upcoming Meetups</h2>
          <p className="text-muted-foreground">{meetupPosts.length} meetups</p>
        </div>
        <Button onClick={() => setShowNewMeetupModal(true)}>New Meetup</Button>
      </div>

      <div className="space-y-3">
        {meetupPosts.map((meetup) => (
          <Card key={meetup.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar3d
                  size={40}
                  name={meetup.organizerName}
                  variant="marble"
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />
                
                <div className="flex-1">
                  <h3 className="font-semibold">{meetup.title}</h3>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(meetup.date).toLocaleDateString()}</span>
                    <span>{meetup.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{meetup.location}</span>
                  </div>
                  
                  <p className="mt-2 text-sm line-clamp-2">{meetup.description}</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t py-2 px-4">
              <div className="flex justify-between w-full">
                <div className="flex gap-4">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 h-8">
                    <span className="text-xs">{meetup.attendees} going</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1 h-8"
                    onClick={() => handleViewDetails(meetup.id)}
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span className="text-xs">{meetup.comments}</span>
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => handleViewDetails(meetup.id)}
                >
                  View Details
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <NewMeetupModal 
        open={showNewMeetupModal}
        onOpenChange={setShowNewMeetupModal}
      />
    </>
  );
};
