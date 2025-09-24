import React, { useState, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Video, Send, BarChart3, Upload, X, Timer } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { mockPosts } from "./mockData";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export const CreatePostCard: React.FC = () => {
  const [postContent, setPostContent] = useState("");
  const [attachments, setAttachments] = useState<{ type: "image" | "video"; file: File; preview: string }[]>([]);
  const [showPollDialog, setShowPollDialog] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  // Handle file selection for images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const newAttachments = Array.from(files).map((file) => ({
      type,
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setAttachments([...attachments, ...newAttachments]);
    e.target.value = ""; // Reset input value for future selections
  };
  
  // Remove an attachment
  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    URL.revokeObjectURL(newAttachments[index].preview); // Clean up the URL object
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };
  
  const handlePostSubmit = () => {
    if (postContent.trim() || attachments.length > 0) {
      // In a real app, this would send the post to a backend
      console.log("Posting:", postContent);
      console.log("Attachments:", attachments);
      
      // Simulate adding the post to the feed
      const newPost = {
        id: uuid(),
        author: {
          name: "You",
          username: "currentuser",
          company: "Your Company"
        },
        content: postContent,
        images: attachments.filter(a => a.type === "image").map(a => a.preview),
        video: attachments.find(a => a.type === "video")?.preview,
        createdAt: "Just now",
        likes: 0,
        comments: 0,
        isLiked: false,
        isBookmarked: false
      };
      
      // In a real app, you would add this to your state or database
      mockPosts.unshift(newPost);
      
      // Reset the form
      setPostContent("");
      setAttachments([]);
      
      toast.success("Post created successfully!");
      
      // Force refresh the component in a real app
      // This is a workaround for demonstration purposes
      window.location.reload();
    }
  };
  
  return (
    <>
      <Card className="mb-4">
        <CardContent className="pt-3 pb-1">
          <textarea
            className="w-full h-16 resize-none focus:outline-none focus:ring-0 text-sm"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          ></textarea>
          
          {attachments.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {attachments.map((attachment, index) => (
                <div key={index} className="relative">
                  {attachment.type === "image" && (
                    <img 
                      src={attachment.preview} 
                      alt="Upload preview" 
                      className="h-20 w-20 object-cover rounded"
                    />
                  )}
                  {attachment.type === "video" && (
                    <div className="h-20 w-20 bg-gray-100 flex items-center justify-center rounded">
                      <Video className="h-8 w-8 text-primary/60" />
                    </div>
                  )}
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0"
                    onClick={() => removeAttachment(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-2 pb-2">
          <div className="flex gap-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={(e) => handleFileChange(e, "image")} 
              multiple
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground h-7 px-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Image className="h-3 w-3 mr-1" />
              Photo
            </Button>
            
            <input 
              type="file" 
              ref={videoInputRef} 
              className="hidden" 
              accept="video/*" 
              onChange={(e) => handleFileChange(e, "video")} 
            />
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground h-7 px-2"
              onClick={() => videoInputRef.current?.click()}
            >
              <Video className="h-3 w-3 mr-1" />
              Video
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground h-7 px-2"
              onClick={() => setShowPollDialog(true)}
            >
              <BarChart3 className="h-3 w-3 mr-1" />
              Poll
            </Button>
          </div>
          <Button 
            onClick={handlePostSubmit} 
            disabled={!postContent.trim() && attachments.length === 0}
            size="sm"
            className="bg-primary h-7 px-3"
          >
            <Send className="h-3 w-3 mr-1" />
            Post
          </Button>
        </CardFooter>
      </Card>
      
      <PollCreationDialog 
        open={showPollDialog} 
        onClose={() => setShowPollDialog(false)}
        onCreatePoll={(question, options, duration) => {
          console.log("Creating poll:", question, options, duration);
          // Create a new poll post
          const newPoll = {
            id: uuid(),
            author: {
              name: "You",
              username: "currentuser",
              company: "Your Company"
            },
            content: question,
            poll: {
              question,
              options: options.map(opt => ({ text: opt, percentage: 0 })),
              voted: false,
              totalVotes: 0,
              endsIn: duration
            },
            createdAt: "Just now",
            likes: 0,
            comments: 0,
            isLiked: false,
            isBookmarked: false
          };
          
          // In a real app, you would add this to your state or database
          mockPosts.unshift(newPoll);
          setShowPollDialog(false);
          
          toast.success("Poll created successfully!");
          
          // Force refresh the component in a real app
          window.location.reload();
        }}
      />
    </>
  );
};

interface PollCreationDialogProps {
  open: boolean;
  onClose: () => void;
  onCreatePoll: (question: string, options: string[], duration: string) => void;
}

const PollCreationDialog: React.FC<PollCreationDialogProps> = ({ open, onClose, onCreatePoll }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [duration, setDuration] = useState("1 day");
  
  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    } else {
      toast.error("Maximum 5 options allowed");
    }
  };
  
  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    } else {
      toast.error("Minimum 2 options required");
    }
  };
  
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  
  const handleSubmit = () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    if (options.some(opt => !opt.trim())) {
      toast.error("Please fill all options");
      return;
    }
    
    onCreatePoll(question, options, duration);
    
    // Reset form
    setQuestion("");
    setOptions(["", ""]);
    setDuration("1 day");
  };

  return (
    <Dialog open={open} onOpenChange={open => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a Poll</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question..."
              className="w-full p-2 h-20 border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {options.length > 2 && (
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => handleRemoveOption(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            {options.length < 5 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAddOption}
                className="w-full"
              >
                + Add Option
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Poll Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="1 day">1 day</option>
              <option value="2 days">2 days</option>
              <option value="3 days">3 days</option>
              <option value="1 week">1 week</option>
              <option value="2 weeks">2 weeks</option>
            </select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create Poll</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
