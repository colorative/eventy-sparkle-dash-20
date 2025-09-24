
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ThumbsUp, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import Avatar3d from "boring-avatars";
import { cn } from "@/lib/utils";

interface IceBreakerDetailsContentProps {
  id: string;
}

// Mock post data
const post = {
  id: 1,
  authorName: "Sylvia Persons",
  authorTitle: "Product Designer at SkillTech",
  createdAt: "2 days ago",
  content: "Hi, I'm Sylvia Persons. I'm here today to strengthen my analytical skills for my new company, SkillTech. Happy to meet you all 😊",
  question: "What's your favourite book?",
  answer: "Universal Principles of Design",
  likes: 12,
  comments: [
    {
      id: 1,
      authorName: "James Wilson",
      content: "Welcome Sylvia! I'm also in product design. Looking forward to connecting.",
      createdAt: "1 day ago",
      likes: 3,
      replies: [
        {
          id: 1,
          authorName: "Sylvia Persons",
          content: "Thanks James! Would love to chat about your experiences.",
          createdAt: "1 day ago",
          likes: 1
        }
      ]
    },
    {
      id: 2,
      authorName: "Mei Lin",
      content: "That's one of my favorite books too! Have you read 'Don't Make Me Think' by Steve Krug?",
      createdAt: "1 day ago",
      likes: 4,
      replies: []
    }
  ]
};

export const IceBreakerDetailsContent: React.FC<IceBreakerDetailsContentProps> = ({ id }) => {
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
      <Link 
        to="/community-forum/ice-breaker" 
        className="inline-flex items-center text-primary hover:text-primary/80 mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Introductions
      </Link>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div>
              <Avatar3d
                size={50}
                name={post.authorName}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-xl font-semibold">{post.authorName}</h1>
              <p className="text-sm text-muted-foreground mb-3">{post.authorTitle}</p>
              
              <p className="mb-4">{post.content}</p>
              
              {post.question && (
                <div className="mt-4 bg-primary/10 p-4 rounded-md">
                  <p className="text-lg font-medium text-primary">{post.question}</p>
                  <p className="mt-2">{post.answer}</p>
                </div>
              )}
              
              <div className="flex items-center gap-4 mt-4 text-muted-foreground text-sm">
                <span>{post.createdAt}</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t py-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => handleLike('Post', post.id)}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1 ml-4"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments.length}</span>
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        
        <div className="flex gap-4 mb-6">
          <Avatar3d
            size={40}
            name="Current User"
            variant="marble"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
          
          <div className="flex-1">
            <Textarea
              placeholder="Add a comment..."
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
          {post.comments.map((comment) => (
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
