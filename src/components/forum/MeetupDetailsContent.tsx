
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, MapPin, Calendar, ThumbsUp, MessageSquare, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Comment } from "@/types/forum";
import Avatar3d from "boring-avatars";

interface MeetupDetailsContentProps {
  id: string;
}

// Mock meetup details
const meetupDetails = {
  id: 1,
  title: "UX Design Workshop",
  description: "Join us for a hands-on workshop on creating user-centered design experiences. We'll cover wireframing, prototyping, and usability testing. This interactive session is perfect for designers of all levels who want to improve their UX skills and learn practical techniques they can apply to their projects immediately.\n\nTopics covered:\n- User research methods\n- Creating effective wireframes\n- Prototyping techniques\n- Usability testing best practices\n- Implementing feedback into designs",
  date: "June 15, 2025",
  time: "2:00 PM - 4:00 PM",
  location: "Conference Room A, Main Convention Center",
  locationType: "physical",
  creator: {
    name: "Alex Johnson",
    avatar: "",
    title: "Senior UX Designer at DesignLab"
  },
  attendees: [
    { id: "1", name: "Alex Johnson", avatar: "" },
    { id: "2", name: "Maria Garcia", avatar: "" },
    { id: "3", name: "David Kim", avatar: "" },
    { id: "4", name: "Priya Patel", avatar: "" },
    { id: "5", name: "Sam Liu", avatar: "" },
    { id: "6", name: "Emma Wilson", avatar: "" },
    { id: "7", name: "James Brown", avatar: "" },
    { id: "8", name: "Sarah Miller", avatar: "" }
  ],
  totalAttendees: 20,
  likes: 24,
  isRSVPed: false
};

// Mock comments
const mockComments: Comment[] = [
  {
    id: 1,
    authorId: "user1",
    authorName: "Felix Holt",
    authorAvatar: "",
    content: "Looking forward to this workshop! Will there be any pre-work or materials we should review beforehand?",
    createdAt: "12:30 PM",
    likes: 3
  },
  {
    id: 2,
    authorId: "user2",
    authorName: "Dorothy Walsh",
    authorAvatar: "",
    content: "This is exactly what I've been looking for! I'm particularly interested in the usability testing section.",
    createdAt: "12:30 PM",
    likes: 1
  },
  {
    id: 3,
    authorId: "user3",
    authorName: "Calvin Christensen",
    authorAvatar: "",
    content: "Will there be a recording available for those who can't attend the full session?",
    createdAt: "12:30 PM",
    likes: 0
  }
];

export const MeetupDetailsContent: React.FC<MeetupDetailsContentProps> = ({ id }) => {
  const [attendees, setAttendees] = useState(meetupDetails.attendees);
  const [totalAttendees, setTotalAttendees] = useState(meetupDetails.totalAttendees);
  const [isRSVPed, setIsRSVPed] = useState(meetupDetails.isRSVPed);
  const [likes, setLikes] = useState(meetupDetails.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");

  const handleRSVP = () => {
    if (isRSVPed) {
      toast({
        description: "You have canceled your RSVP"
      });
      setIsRSVPed(false);
      setTotalAttendees(prev => prev - 1);
    } else {
      toast({
        description: "You have successfully RSVP'd to this meetup"
      });
      setIsRSVPed(true);
      setTotalAttendees(prev => prev + 1);
    }
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setHasLiked(!hasLiked);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: comments.length + 1,
      authorId: "currentUser",
      authorName: "You",
      authorAvatar: "",
      content: newComment,
      createdAt: "Just now",
      likes: 0
    };
    
    setComments(prev => [newCommentObj, ...prev]);
    setNewComment("");
    
    toast({
      description: "Comment posted successfully"
    });
  };

  return (
    <div className="w-full max-w-[1024px] mx-auto px-4 py-8">
      <Link 
        to="/community-forum/meetups" 
        className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Meetups
      </Link>
      
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">{meetupDetails.title}</h1>
          
          <div className="flex items-start gap-4 mb-6">
            <Avatar3d
              size={48}
              name={meetupDetails.creator.name}
              variant="marble"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
            
            <div>
              <h3 className="font-semibold">{meetupDetails.creator.name}</h3>
              <p className="text-sm text-muted-foreground">{meetupDetails.creator.title}</p>
              <p className="text-sm text-muted-foreground mt-1">Today, 12:30 PM</p>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardContent className="p-6">
              <p className="whitespace-pre-line mb-6">{meetupDetails.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground text-sm">Time</p>
                    <p>{meetupDetails.date}, {meetupDetails.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-muted-foreground text-sm">Location</p>
                    <p>{meetupDetails.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-8">
            <div>
              <p className="mb-2">Who's coming ({totalAttendees} RSVPs)</p>
              <div className="flex -space-x-2">
                {attendees.slice(0, 5).map((attendee, idx) => (
                  <div key={idx} className="border-2 border-background rounded-full overflow-hidden">
                    <Avatar3d
                      size={38}
                      name={attendee.name}
                      variant="marble"
                      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                    />
                  </div>
                ))}
                {totalAttendees > 5 && (
                  <Avatar className="border-2 border-background">
                    <AvatarFallback className="bg-muted text-muted-foreground">
                      +{totalAttendees - 5}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <Button
                variant={isRSVPed ? "outline" : "default"}
                onClick={handleRSVP}
                className="px-8"
              >
                {isRSVPed ? "Cancel RSVP" : "RSVP"}
              </Button>
              
              <Button 
                variant="ghost"
                className={`flex items-center gap-1 ${hasLiked ? 'text-primary' : ''}`}
                onClick={handleLike}
              >
                <ThumbsUp className="h-5 w-5" />
                <span>{likes}</span>
              </Button>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">{comments.length} Comments</h2>
            
            <form onSubmit={handleSubmitComment} className="flex gap-2 mb-6">
              <Textarea 
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[60px]"
              />
              <Button type="submit" size="icon" className="h-auto">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            
            <div className="space-y-6">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar3d
                    size={40}
                    name={comment.authorName}
                    variant="marble"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                  />
                  
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{comment.authorName}</h4>
                        <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                      </div>
                      <p className="mt-1">{comment.content}</p>
                    </div>
                    
                    <div className="mt-1 ml-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        Like
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
