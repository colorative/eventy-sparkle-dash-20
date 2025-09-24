import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, ChevronLeft, Heart, MessageSquare, Download, Send, ThumbsUp, Share, FileText, Plus, Bell, Play, Tag, User, ChevronDown, Check, CheckCircle, Link as LinkIcon, Image, CalendarPlus, ClipboardCheck, Mail, MailPlus, Star, ArrowRight, Bookmark, BookmarkCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import BoringAvatar from "boring-avatars";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { SessionMediaGrid } from "./SessionMediaGrid";
import { SessionPoweredBy } from "./SessionPoweredBy";
import { SessionVideoModal } from "./SessionVideoModal";
import { PollsContent } from "./PollsContent";
import { QAContent } from "./QAContent";

interface SessionDetailsContentProps {
  sessionId?: string;
}

export const SessionDetailsContent: React.FC<SessionDetailsContentProps> = ({
  sessionId
}) => {
  const navigate = useNavigate();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isPanelExpanded, setPanelExpanded] = useState(false);
  const [activePanel, setActivePanel] = useState<'polls' | 'qa' | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSurveyCompleted, setIsSurveyCompleted] = useState(false);
  const [isRsvped, setIsRsvped] = useState(false);
  const [hasRated, setHasRated] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=300");
  const [newComment, setNewComment] = useState("");
  const [sessionData, setSessionData] = useState<any>(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [layoutStyle, setLayoutStyle] = useState<'columns'>('columns');
  const [showAllDiscussions, setShowAllDiscussions] = useState(false);
  
  useEffect(() => {
    // In a real application, you would fetch the session data from your API
    // For now, let's simulate loading the data for the selected session
    const mockSession = {
      id: sessionId || "1",
      title: "The Future of Scalable AI-Driven Applications: From Multi-Modal Large Language Models and Real-Time Data Pipelines to Secure Cloud-Native Architectures, Edge Computing Integrations, and Human-Centered Design for Next-Generation Digital Experiences",
      type: "keynote",
      time: "9:00 AM - 10:30 AM",
      date: "Monday, June 10, 2023",
      location: "Main Stage, Hall A, Tech Convention Center",
      speaker: {
        name: "Dr. Emma Chen",
        role: "Chief Technology Officer",
        company: "FutureTech Industries",
        avatar: "EC"
      },
      additionalSpeakers: [{
        name: "James Wilson",
        role: "Principal Cloud Architect",
        company: "CloudSphere",
        avatar: "JW"
      }, {
        name: "Sarah Johnson",
        role: "VP of Engineering",
        company: "TechDiversity",
        avatar: "SJ"
      }],
      host: "Neuvolit Ventures",
      hostLogo: "placeholder.svg",
      sponsors: [{
        name: "TechCorp",
        logo: "https://via.placeholder.com/80x30"
      }, {
        name: "InnovateSoft",
        logo: "https://via.placeholder.com/80x30"
      }, {
        name: "GlobalTech",
        logo: "https://via.placeholder.com/80x30"
      }],
      tags: ["AI", "Future Tech", "Innovation", "Cloud Computing", "Cybersecurity"],
      description: "Join Dr. Emma Chen, CTO of FutureTech Industries, as she explores emerging technologies and their profound impact on our future. This keynote session will cover key innovations in artificial intelligence, quantum computing, and sustainable technology solutions that are reshaping industries worldwide.\n\nThe presentation will begin with an overview of current technological landscapes, followed by predictions for the next decade of innovation. Dr. Chen will share exclusive insights based on FutureTech's latest research initiatives and will demonstrate several cutting-edge prototypes currently under development.\n\nThis session is ideal for technology leaders, innovation specialists, and anyone interested in understanding how emerging technologies will transform business and society in the coming years.",
      videoUrl: "https://example.com/session-video",
      videoThumbnail: "https://i.ytimg.com/vi/0wiuO1kluoU/maxresdefault.jpg",
      files: [{
        name: "Keynote_Presentation.pdf",
        type: "PDF",
        size: "5.2 MB",
        url: "#"
      }, {
        name: "Research_Whitepaper.docx",
        type: "DOC",
        size: "2.8 MB",
        url: "#"
      }, {
        name: "Technology_Roadmap.xlsx",
        type: "XLS",
        size: "1.5 MB",
        url: "#"
      }],
      comments: [{
        id: 1,
        user: {
          name: "Michael Thompson",
          avatar: "MT"
        },
        timestamp: "10 minutes ago",
        content: "Really looking forward to Dr. Chen's insights on quantum computing applications!",
        likes: 5,
        liked: false,
        replies: [{
          id: 101,
          user: {
            name: "Sarah Williams",
            avatar: "SW"
          },
          timestamp: "5 minutes ago",
          content: "Me too! Her last paper on quantum algorithms was groundbreaking.",
          likes: 2,
          liked: false
        }]
      }, {
        id: 2,
        user: {
          name: "Alex Rodriguez",
          avatar: "AR"
        },
        timestamp: "25 minutes ago",
        content: "Will there be a Q&A session after the presentation? I have several questions about the AI ethics portion mentioned in the agenda.",
        likes: 3,
        liked: false,
        replies: []
      }, {
        id: 3,
        user: {
          name: "Jordan Lee",
          avatar: "JL"
        },
        timestamp: "1 hour ago",
        content: "Just finished reading Dr. Chen's latest article. Can't wait to hear more about the practical applications she's been working on!",
        likes: 8,
        liked: false,
        replies: []
      }],
      availableTimes: ["9:00 AM - 9:30 AM", "10:00 AM - 10:30 AM", "11:00 AM - 11:30 AM", "1:00 PM - 1:30 PM", "2:00 PM - 2:30 PM", "3:00 PM - 3:30 PM", "4:00 PM - 4:30 PM"]
    };
    setSessionData(mockSession);

    // Simulating a short loading time
    setTimeout(() => {
      // If you want to handle the case when a session is not found
      if (!mockSession) {
        navigate("/agenda");
      }
    }, 500);
  }, [sessionId, navigate]);
  
  const toggleDescriptionExpanded = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const handlePanelToggle = (panelType: 'polls' | 'qa') => {
    if (isPanelExpanded && activePanel === panelType) {
      // Close panel if same button clicked
      setPanelExpanded(false);
      setActivePanel(null);
    } else {
      // Open panel or switch content
      setPanelExpanded(true);
      setActivePanel(panelType);
    }
  };
  const handleCheckIn = () => {
    setIsCheckedIn(true);
    toast({
      title: "Successfully checked in",
      description: "You have been checked in to this session."
    });
  };
  const handleAddToAgenda = () => {
    setShowScheduler(true);
  };
  const handleScheduleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Unable to schedule",
        description: "Please select both a date and time slot.",
        variant: "destructive"
      });
      return;
    }
    setIsSaved(true);
    setShowScheduler(false);
    toast({
      title: "Added to agenda",
      description: `Session scheduled for ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime}`
    });
  };
  const handleRemoveFromAgenda = () => {
    setIsSaved(false);
    toast({
      title: "Removed from agenda",
      description: "This session has been removed from your personal agenda."
    });
  };
  const handleTakeSurvey = () => {
    setIsSurveyCompleted(true);
    toast({
      title: "Survey completed",
      description: "Thank you for submitting your feedback for this session."
    });
  };
  const handleRsvp = () => {
    setIsRsvped(true);
    toast({
      title: "RSVP confirmed",
      description: "Your attendance has been confirmed for this session."
    });
  };
  const handleRateSession = () => {
    setShowRatingDialog(true);
  };
  const handleRatingSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting.",
        variant: "destructive"
      });
      return;
    }
    setHasRated(true);
    setShowRatingDialog(false);
    toast({
      title: "Rating submitted",
      description: `Thank you for rating this session with ${rating} stars.`
    });
  };
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked ? "Session removed from your bookmarks" : "Session added to your bookmarks"
    });
  };
  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;
    toast({
      title: "Comment posted",
      description: "Your comment has been posted successfully."
    });

    // In a real app, you would send this to your API and update the comments list
    setNewComment("");
  };
  const handleLikeComment = (commentId: number) => {
    // In a real app, you would send this to your API and update the comments list
    toast({
      title: "Comment liked",
      description: "You liked this comment."
    });
  };
  const handleDownloadFile = (fileName: string) => {
    toast({
      title: "Downloading file",
      description: `"${fileName}" will begin downloading shortly.`
    });
  };
  
  // Toggle all discussions dialog
  const toggleAllDiscussions = () => {
    setShowAllDiscussions(!showAllDiscussions);
  };

  // Handle video modal opening
  const handleVideoPlay = () => {
    setShowVideoModal(true);
  };

  // Handle restoration from PIP
  const handleRestoreFromPip = () => {
    setShowVideoModal(true);
  };
  
  if (!sessionData) {
    return <div className="flex-1 p-8 flex items-center justify-center">
        <p className="text-xl text-gray-500">Loading session details...</p>
      </div>;
  }
  
  // Two column layout - UPDATED with bookmark button
  const columnsLayout = (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden mb-6">
      {/* Upper section with two columns */}
      <div className="grid lg:grid-cols-[450px_1fr] md:grid-cols-[450px_1fr] grid-cols-1">
        {/* Left Side - Image */}
        <div className="relative">
          <div className="w-[450px] h-[225px]">
            <img 
              src={coverImageUrl} 
              alt="Session cover" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Bookmark Button */}
          <div className="absolute top-3 right-3">
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white/90 hover:bg-white text-gray-700"
              onClick={handleBookmark}
            >
              {isBookmarked ? 
                <BookmarkCheck className="h-5 w-5 text-indigo-600" /> : 
                <Bookmark className="h-5 w-5" />
              }
            </Button>
          </div>
        </div>
        
        {/* Right Side - Content */}
        <div className="p-6">
          <h1 className="text-lg md:text-xl font-bold mb-3 line-clamp-4 leading-tight">{sessionData.title}</h1>
          <div className="space-y-2">
            <div className="flex items-center gap-6 text-gray-600 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{sessionData.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{sessionData.time}</span>
              </div>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{sessionData.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Actions Row - separate section below the two columns */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          {/* Left Side - Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {!isSaved ? <Button onClick={handleAddToAgenda} variant="outline" size="sm" className="gap-1.5">
                <CalendarPlus className="h-4 w-4" />
                Add to My Schedule
              </Button> : <Button variant="outline" onClick={handleRemoveFromAgenda} size="sm" className="gap-1.5 text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700">
                <CheckCircle className="h-4 w-4" />
                Added to Schedule
              </Button>}
            
            {!isSurveyCompleted ? <Button variant="outline" onClick={handleTakeSurvey} size="sm" className="gap-1.5">
                <ClipboardCheck className="h-4 w-4" />
                Take Survey
              </Button> : <Button variant="outline" size="sm" className="gap-1.5 text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700" disabled>
                <CheckCircle className="h-4 w-4" />
                Survey Completed
              </Button>}
            
            {!isRsvped ? <Button variant="outline" onClick={handleRsvp} size="sm" className="gap-1.5">
                <MailPlus className="h-4 w-4" />
                RSVP
              </Button> : <Button variant="outline" size="sm" className="gap-1.5 text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700" disabled>
                <CheckCircle className="h-4 w-4" />
                RSVP Confirmed
              </Button>}
            
            {!isCheckedIn ? <Button variant="outline" onClick={handleCheckIn} size="sm" className="gap-1.5">
                <Check className="h-4 w-4" />
                Check-in
              </Button> : <Button variant="outline" size="sm" className="gap-1.5 text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700" disabled>
                <CheckCircle className="h-4 w-4" />
                Checked In
              </Button>}
            
            {!hasRated ? <Button variant="outline" onClick={handleRateSession} size="sm" className="gap-1.5">
                <Star className="h-4 w-4" />
                Rate the Session
              </Button> : <Button variant="outline" size="sm" className="gap-1.5 text-green-600 border-green-200 bg-green-50 hover:bg-green-100 hover:text-green-700" disabled>
                <CheckCircle className="h-4 w-4" />
                Session Rated
              </Button>}
          </div>
          
          {/* Right Side - Live Session Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={isPanelExpanded && activePanel === 'polls' ? "secondary" : "default"}
              size="sm" 
              className="gap-1.5 bg-indigo-600 hover:bg-indigo-700"
              onClick={() => handlePanelToggle('polls')}
            >
              <MessageSquare className="h-4 w-4" />
              Polls
            </Button>
            <Button 
              variant={isPanelExpanded && activePanel === 'qa' ? "secondary" : "default"}
              size="sm" 
              className="gap-1.5 bg-purple-600 hover:bg-purple-700"
              onClick={() => handlePanelToggle('qa')}
            >
              <MessageSquare className="h-4 w-4" />
              Live Q&A
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  
  // All Discussion Comments Component for the Dialog
  const AllDiscussionsContent = () => (
    <div className="space-y-6 py-4">
      {sessionData.comments.map(comment => (
        <div key={comment.id} className="space-y-4">
          <div className="space-y-2">
            <div className="flex gap-3">
              <BoringAvatar 
                size={40} 
                name={comment.user.name} 
                variant="marble" 
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} 
              />
              <div className="flex-1">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="font-medium">{comment.user.name}</p>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="mt-2">{comment.content}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 gap-1 text-gray-600 hover:text-indigo-600" 
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <ThumbsUp className="h-4 w-4" fill={comment.liked ? "currentColor" : "none"} /> 
                    Like ({comment.likes})
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 gap-1 text-gray-600 hover:text-indigo-600"
                  >
                    <MessageSquare className="h-4 w-4" /> 
                    Reply
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="ml-14 space-y-4">
                {comment.replies.map(reply => (
                  <div key={reply.id} className="flex gap-3">
                    <BoringAvatar 
                      size={32} 
                      name={reply.user.name} 
                      variant="marble" 
                      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} 
                    />
                    <div className="flex-1">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <p className="font-medium text-sm">{reply.user.name}</p>
                          <span className="text-xs text-gray-500">{reply.timestamp}</span>
                        </div>
                        <p className="text-sm mt-1">{reply.content}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-2 gap-1 text-gray-500 hover:text-indigo-600" 
                          onClick={() => handleLikeComment(reply.id)}
                        >
                          <ThumbsUp className="h-3 w-3" fill={reply.liked ? "currentColor" : "none"} /> 
                          Like ({reply.likes})
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Add a comment section within the dialog */}
      <div className="border-t pt-4 mt-8">
        <div className="flex items-center gap-3">
          <BoringAvatar 
            size={40} 
            name="Current User" 
            variant="marble" 
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} 
          />
          <div className="flex-1 relative">
            <Input 
              placeholder="Add to the discussion..." 
              className="pr-10" 
              value={newComment} 
              onChange={e => setNewComment(e.target.value)} 
              onKeyDown={e => {
                if (e.key === "Enter") {
                  handleCommentSubmit();
                }
              }} 
            />
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 absolute right-1 top-1 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50" 
              onClick={handleCommentSubmit} 
              disabled={newComment.trim() === ""}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  
  return <div className="flex flex-1 overflow-hidden">
      <div className="bg-white flex-1 overflow-auto">
        <div className="w-full max-w-[1024px] mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-4">
            <Button variant="ghost" className="text-gray-500 hover:text-gray-700" onClick={() => navigate("/agenda")}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Agenda
            </Button>
          </div>
          
          {/* Session Header Section with Cover Photo */}
          {columnsLayout}
          
          <div className="space-y-6">
            {/* Powered By Section */}
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-500 mb-3">POWERED BY</h2>
              <SessionPoweredBy />
            </div>
            
            {/* Session Description - MOVED UP */}
            <Card>
              <CardContent className="p-5">
                <h2 className="text-xl font-semibold mb-3">About this Session</h2>
                <div className="text-gray-700 space-y-4">
                  <p className={isDescriptionExpanded ? "" : "line-clamp-4"}>
                    {sessionData?.description}
                  </p>
                  {sessionData?.description && sessionData.description.length > 300 && <Button variant="ghost" onClick={toggleDescriptionExpanded} className="text-indigo-600 px-0 hover:bg-transparent hover:text-indigo-700 -mt-2">
                      {isDescriptionExpanded ? "Show less" : "Read more"}
                      <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isDescriptionExpanded ? "rotate-180" : ""}`} />
                    </Button>}
                </div>
              </CardContent>
            </Card>
            
            {/* Session Speakers - AFTER ABOUT */}
            <Card>
              <CardContent className="p-5">
                <h2 className="text-xl font-semibold mb-4">Speakers</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {/* Main Speaker */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <BoringAvatar size={48} name={sessionData?.speaker?.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{sessionData?.speaker?.name}</h3>
                      <p className="text-xs text-gray-600 truncate">{sessionData?.speaker?.role}</p>
                      <p className="text-xs text-gray-500 truncate">{sessionData?.speaker?.company}</p>
                    </div>
                  </div>
                  
                  {/* Additional Speakers */}
                  {sessionData?.additionalSpeakers?.map((speaker, index) => <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <BoringAvatar size={48} name={speaker.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{speaker.name}</h3>
                        <p className="text-xs text-gray-600 truncate">{speaker.role}</p>
                        <p className="text-xs text-gray-500 truncate">{speaker.company}</p>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>
            
            {/* Live Session Media - AFTER SPEAKERS */}
            <Card>
              <CardContent className="p-5">
                <h2 className="text-xl font-semibold mb-3">Session Recording</h2>
                <div className="relative bg-gray-100 aspect-video rounded-md overflow-hidden">
                  <img src={sessionData?.videoThumbnail} alt="Video thumbnail" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button className="rounded-full h-16 w-16 bg-indigo-600/90 hover:bg-indigo-700 shadow-lg" onClick={handleVideoPlay}>
                      <Play className="h-6 w-6 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Session Media - AFTER RECORDING */}
            <SessionMediaGrid />
            
            {/* Session Files - RENAMED/AFTER MEDIA */}
            <Card>
              <CardContent className="p-5">
                <h2 className="text-xl font-semibold mb-3">Session Materials</h2>
                <div className="space-y-3">
                  {sessionData?.files?.map((file, index) => <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-2 rounded mr-3">
                          <FileText className="h-5 w-5 text-gray-700" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size} • {file.type}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50" onClick={() => handleDownloadFile(file.name)}>
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>)}
                </div>
              </CardContent>
            </Card>
            
            {/* Session Tags */}
            <div className="flex flex-wrap gap-2">
              {sessionData?.tags?.map((tag, index) => <Badge key={index} variant="secondary" className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 cursor-pointer">
                  #{tag}
                </Badge>)}
            </div>

            {/* Session Discussions - Moved to bottom */}
            <Card className="bg-white border rounded-lg shadow-sm">
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Session Discussions
                </h2>
              </div>
              
              <div className="p-4 border-b">
                <div className="flex items-center gap-3">
                  <BoringAvatar size={32} name="Current User" variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                  <div className="flex-1 relative">
                    <Input placeholder="Add to the discussion..." className="pr-10" value={newComment} onChange={e => setNewComment(e.target.value)} onKeyDown={e => {
                    if (e.key === "Enter") {
                      handleCommentSubmit();
                    }
                  }} />
                    <Button size="icon" variant="ghost" className="h-8 w-8 absolute right-1 top-1 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50" onClick={handleCommentSubmit} disabled={newComment.trim() === ""}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-6 max-h-96 overflow-y-auto">
                {sessionData?.comments?.map(comment => <div key={comment.id} className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex gap-3">
                        <BoringAvatar size={40} name={comment.user.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                        <div className="flex-1">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-start">
                              <p className="font-medium text-sm">{comment.user.name}</p>
                              <span className="text-xs text-gray-500">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm mt-1">{comment.content}</p>
                          </div>
                          <div className="flex items-center gap-3 mt-1.5 text-xs">
                            <Button variant="ghost" size="sm" className="h-6 px-2 gap-1 text-gray-500 hover:text-indigo-600" onClick={() => handleLikeComment(comment.id)}>
                              <ThumbsUp className="h-3 w-3" fill={comment.liked ? "currentColor" : "none"} /> 
                              Like ({comment.likes})
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 px-2 gap-1 text-gray-500 hover:text-indigo-600">
                              <MessageSquare className="h-3 w-3" /> 
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Replies */}
                      {comment.replies.length > 0 && <div className="ml-14 space-y-3">
                          {comment.replies.map(reply => <div key={reply.id} className="flex gap-3">
                              <BoringAvatar size={32} name={reply.user.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                              <div className="flex-1">
                                <div className="bg-gray-50 p-2 rounded-lg">
                                  <div className="flex justify-between items-start">
                                    <p className="font-medium text-xs">{reply.user.name}</p>
                                    <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                  </div>
                                  <p className="text-xs mt-0.5">{reply.content}</p>
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-xs">
                                  <Button variant="ghost" size="sm" className="h-5 px-1.5 gap-1 text-gray-500 hover:text-indigo-600 text-xs" onClick={() => handleLikeComment(reply.id)}>
                                    <ThumbsUp className="h-2.5 w-2.5" fill={reply.liked ? "currentColor" : "none"} /> 
                                    Like ({reply.likes})
                                  </Button>
                                </div>
                              </div>
                            </div>)}
                        </div>}
                    </div>
                  </div>)}
              </div>

              <div className="p-3 border-t bg-gray-50 flex justify-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 gap-1 w-full"
                  onClick={toggleAllDiscussions}
                >
                  View All Discussions
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Expandable Panel for Polls & Q&A */}
          {isPanelExpanded && activePanel && (
            <div className={`mt-6 transition-all duration-300 ease-out ${isPanelExpanded ? 'animate-fade-in animate-scale-in' : 'animate-fade-out animate-scale-out'}`}>
              <Card className="border-t-4 border-t-indigo-500">
                <CardContent className="p-6">
                  {activePanel === 'polls' && <PollsContent />}
                  {activePanel === 'qa' && <QAContent />}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>


      {/* Session Video Modal */}
      <SessionVideoModal
        isOpen={showVideoModal} 
        onClose={() => setShowVideoModal(false)}
        sessionData={sessionData}
        onRestoreFromPip={handleRestoreFromPip}
      />

      {/* Meeting Scheduler Dialog */}
      <Dialog open={showScheduler} onOpenChange={setShowScheduler}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule Session</DialogTitle>
            <DialogDescription>
              Select a date and time slot to add this session to your agenda.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Select Date</h3>
              <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate} className="border rounded-md" disabled={date => {
              // Disable past dates
              return date < new Date();
            }} />
            </div>
            
            {selectedDate && <div className="space-y-2">
                <h3 className="text-sm font-medium">Select Time Slot</h3>
                <div className="grid grid-cols-2 gap-2">
                  {sessionData.availableTimes.map((time, index) => <Button key={index} variant={selectedTime === time ? "default" : "outline"} className={`text-sm justify-start ${selectedTime === time ? "bg-indigo-600 hover:bg-indigo-700" : ""}`} onClick={() => setSelectedTime(time)}>
                      {time}
                    </Button>)}
                </div>
              </div>}
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleScheduleConfirm} disabled={!selectedDate || !selectedTime}>
              Confirm Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rate This Session</DialogTitle>
            <DialogDescription>
              Please rate your experience with this session.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map(star => <Button key={star} variant="ghost" size="icon" className={`h-12 w-12 ${rating >= star ? "text-amber-500" : "text-gray-300"}`} onClick={() => setRating(star)}>
                  <Star className="h-8 w-8" fill={rating >= star ? "currentColor" : "none"} />
                </Button>)}
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              {rating === 1 && "Poor"}
              {rating === 2 && "Fair"}
              {rating === 3 && "Good"}
              {rating === 4 && "Very Good"}
              {rating === 5 && "Excellent"}
            </p>
            <textarea className="w-full mt-4 p-3 border rounded-md text-sm" placeholder="Additional comments (optional)" rows={4} />
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleRatingSubmit}>Submit Rating</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* All Discussions Dialog */}
      <Dialog open={showAllDiscussions} onOpenChange={setShowAllDiscussions}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Session Discussions</DialogTitle>
            <DialogDescription>
              View and participate in all discussions about this session.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh] pr-4">
            <AllDiscussionsContent />
          </ScrollArea>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
