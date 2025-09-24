
import React, { useState } from "react";
import { ForumCategory } from "@/types/forum";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Avatar3d from "boring-avatars";

interface IceBreakerContentProps {
  category: ForumCategory;
}

// Mock introduction posts
const introductionPosts = [
  {
    id: 1,
    authorName: "Sarah Johnson",
    authorAvatar: "",
    createdAt: "2 days ago",
    content: "Hello everyone! I'm a UX designer from Seattle with 5 years of experience. Looking forward to connecting with fellow designers!",
    question: "What are you hoping to learn from this event?",
    answer: "New design techniques and networking with industry peers",
    likes: 12,
    comments: 5
  },
  {
    id: 2,
    authorName: "David Chen",
    authorAvatar: "",
    createdAt: "4 days ago",
    content: "Hi all! Product manager here with a background in engineering. Excited to be part of this community and learn from all of you!",
    question: "What's your favorite part of your job?",
    answer: "Seeing ideas turn into successful products",
    likes: 8,
    comments: 3
  },
  {
    id: 3,
    authorName: "Priya Patel",
    authorAvatar: "",
    createdAt: "1 week ago",
    content: "Greetings from Chicago! I'm a frontend developer specializing in React. This is my first time at this event, and I can't wait to meet everyone!",
    question: "What brings you to this event?",
    answer: "Meeting other developers and learning about new trends",
    likes: 15,
    comments: 7
  }
];

export const IceBreakerContent: React.FC<IceBreakerContentProps> = ({ category }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [introduction, setIntroduction] = useState("");
  const navigate = useNavigate();

  const cardColors = [
    "bg-purple-500",
    "bg-teal-500", 
    "bg-orange-500"
  ];

  const predefinedQuestions = [
    "What are you hoping to learn from this event?",
    "What's your favorite part of your job?",
    "What brings you to this event?",
    "What's one skill you're looking to develop?",
    "What's a recent project you're proud of?",
    "What's your favourite book?"
  ];

  const handlePostIntroduction = () => {
    if (!introduction) {
      toast({
        title: "Introduction Required",
        description: "Please write an introduction before posting",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Introduction Posted",
      description: "Your introduction has been successfully posted"
    });
    
    setIsDialogOpen(false);
    setIntroduction("");
    setSelectedQuestion("");
    setAnswer("");
  };

  const handleLike = (postId: number) => {
    toast({
      description: "Post liked successfully"
    });
  };

  const handleViewDetails = (postId: number) => {
    navigate(`/community-forum/ice-breaker/${postId}`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Introductions</h2>
          <p className="text-muted-foreground">{introductionPosts.length} posts</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>New Introduction</Button>
      </div>

      <div className="space-y-3">
        {introductionPosts.map((post, index) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar3d
                  size={40}
                  name={post.authorName}
                  variant="marble"
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{post.authorName}</h3>
                    <span className="text-sm text-muted-foreground">• {post.createdAt}</span>
                  </div>
                  <p className="mt-1 text-sm">{post.content}</p>
                  
                  {post.question && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                      <div className={`${cardColors[index % cardColors.length]} text-white p-3`}>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs font-bold">?</span>
                          </div>
                          <p className="text-sm font-medium">{post.question}</p>
                        </div>
                      </div>
                      <div className="bg-white border-t border-gray-200 p-3">
                        <p className="text-sm text-gray-900">{post.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t py-2 px-4">
              <div className="flex justify-between w-full">
                <div className="flex gap-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1 h-8"
                    onClick={() => handleLike(post.id)}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    <span className="text-xs">{post.likes}</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1 h-8"
                    onClick={() => handleViewDetails(post.id)}
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span className="text-xs">{post.comments}</span>
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs"
                  onClick={() => handleViewDetails(post.id)}
                >
                  View Details
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Introduce Yourself</DialogTitle>
            <DialogDescription>
              Share a bit about yourself with the community
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="introduction" className="text-sm font-medium">
                Your Introduction
              </label>
              <Textarea 
                id="introduction" 
                placeholder="Tell us about yourself, your role, interests, etc."
                className="h-24"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium">
                Answer a Quick Question
              </label>
              <Select value={selectedQuestion} onValueChange={setSelectedQuestion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a question to answer" />
                </SelectTrigger>
                <SelectContent>
                  {predefinedQuestions.map((question) => (
                    <SelectItem key={question} value={question}>
                      {question}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedQuestion && (
              <div className="grid gap-2">
                <label htmlFor="answer" className="text-sm font-medium">
                  Your Answer
                </label>
                <Input 
                  id="answer" 
                  placeholder="Your answer to the selected question"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePostIntroduction}>
              Post Introduction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
