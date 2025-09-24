
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Building, MapPin, Clock, Briefcase, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import Avatar3d from "boring-avatars";

interface JobDetailsContentProps {
  id: string;
}

// Mock job details
const jobDetails = {
  id: 1,
  companyName: "Coinbit Technologies",
  companyLogo: "",
  location: "New York",
  jobTitle: "Principal Product Designer",
  postedAt: "Today, 12:30 PM",
  jobType: "Full-time",
  description: `Coinbit Technologies is a technology company headquartered in Seattle. We were acquired by Prudential (NYSE: PRU) to further the joint mission of improving financial wellness across the world.

At Coinbit, we simplify the complex world of insurance and financial services into straightforward, valuable solutions to improve people's lives. We start by asking customers a few questions, so our system can learn about their needs; from there, our ground-breaking, proprietary platform takes over and analyzes the thousands of data points that make customers unique to create custom-tailored plans for each customer. Our platform serves as the intersection between customer and seller, technology, and the human touch.

Responsibility:
This position is responsible for delivering high quality product experiences across the Assurance platform. You'll work closely with product managers, engineers, and other designers to create intuitive, delightful experiences that help our customers make informed decisions about their financial future.

Key Responsibilities:
- Lead design efforts for key product initiatives
- Collaborate with product managers to define requirements
- Create wireframes, prototypes, and high-fidelity designs
- Conduct user research and usability testing
- Mentor junior designers and provide feedback

Requirements:
- 5+ years of product design experience
- Strong portfolio demonstrating UX/UI skills
- Experience with design tools (Figma, Sketch)
- Excellent communication skills
- Bachelor's degree in Design, HCI, or related field`,
  postedBy: "Michael Rodriguez",
  likes: 8,
  comments: [
    {
      id: 1,
      authorName: "Sarah Johnson",
      content: "This looks like a great opportunity! Does anyone know if they're open to remote candidates?",
      createdAt: "4 hours ago",
      likes: 3,
      replies: [
        {
          id: 1,
          authorName: "Michael Rodriguez",
          content: "Yes, they are open to remote candidates in the US and Canada!",
          createdAt: "3 hours ago",
          likes: 2
        }
      ]
    },
    {
      id: 2,
      authorName: "David Chen",
      content: "I interviewed with Coinbit last year. The team is fantastic and the product is very innovative.",
      createdAt: "5 hours ago",
      likes: 5,
      replies: []
    }
  ]
};

export const JobDetailsContent: React.FC<JobDetailsContentProps> = ({
  id
}) => {
  const [comment, setComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  
  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    toast({
      description: "Comment added successfully"
    });
    
    setComment("");
  };
  
  const handleAddReply = (commentId: number) => {
    if (!replyContent.trim()) return;
    
    toast({
      description: "Reply added successfully"
    });
    
    setReplyingTo(null);
    setReplyContent("");
  };
  
  const handleLike = (type: string, id: number) => {
    toast({
      description: `${type} liked successfully`
    });
  };

  return (
    <div className="w-full max-w-[1024px] mx-auto px-4 py-8">
      <Link to="/community-forum/job-board" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Jobs
      </Link>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-primary/10 rounded-full p-3">
          <Building className="h-8 w-8 text-primary" />
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-primary">{jobDetails.companyName}</h3>
          <p className="text-sm text-muted-foreground">{jobDetails.postedAt}</p>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">{jobDetails.jobTitle}</h1>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="whitespace-pre-line mb-6">{jobDetails.description}</div>
        </CardContent>
        
        <CardFooter className="border-t p-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => handleLike('Post', jobDetails.id)}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{jobDetails.likes}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{jobDetails.comments.length}</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Job Type</p>
              <p className="font-medium">{jobDetails.jobType}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{jobDetails.location}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Button className="w-full md:w-auto mb-8" size="lg">
        Apply for This Job
      </Button>
      
      {/* Comments Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Discussion</h2>
        
        <div className="flex gap-4 mb-6">
          <Avatar3d
            size={40}
            name="Current User"
            variant="marble"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
          
          <div className="flex-1">
            <Textarea
              placeholder="Ask a question or share your thoughts about this job..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-2 min-h-[80px]"
            />
            
            <div className="flex justify-end">
              <Button onClick={handleAddComment}>
                Post Comment
              </Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {jobDetails.comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex gap-4">
                <Avatar3d
                  size={40}
                  name={comment.authorName}
                  variant="marble"
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{comment.authorName}</span>
                    <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                  </div>
                  
                  <p className="mb-2">{comment.content}</p>
                  
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => handleLike('Comment', comment.id)}
                    >
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      <span className="text-xs">{comment.likes}</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      <span className="text-xs">Reply</span>
                    </Button>
                  </div>
                  
                  {/* Reply form */}
                  {replyingTo === comment.id && (
                    <div className="flex gap-3 mt-3 pl-6">
                      <Avatar3d
                        size={32}
                        name="Current User"
                        variant="marble"
                        colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                      />
                      
                      <div className="flex-1">
                        <Textarea
                          placeholder="Add a reply..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="mb-2 min-h-[60px] text-sm"
                        />
                        
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setReplyingTo(null)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleAddReply(comment.id)}
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="pl-6 mt-3 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="pt-3">
                          <div className="flex gap-3">
                            <Avatar3d
                              size={32}
                              name={reply.authorName}
                              variant="marble"
                              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                            />
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium">{reply.authorName}</span>
                                <span className="text-xs text-muted-foreground">{reply.createdAt}</span>
                              </div>
                              
                              <p className="mb-2 text-sm">{reply.content}</p>
                              
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 px-2"
                                onClick={() => handleLike('Reply', reply.id)}
                              >
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                <span className="text-xs">{reply.likes}</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
