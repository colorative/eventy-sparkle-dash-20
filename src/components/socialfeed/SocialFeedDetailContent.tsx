import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronLeft, Heart, MessageSquare, Bookmark, MoreHorizontal, Share, Flag, Trash2, Send } from "lucide-react";
import { mockPosts, mockComments, Comment, Reply } from "./mockData";
import { Badge } from "@/components/ui/badge";
import Avatar1 from "boring-avatars";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";

export const SocialFeedDetailContent: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [commentText, setCommentText] = useState("");
  const post = mockPosts.find(p => p.id === postId);
  
  if (!post) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <Link to="/social-feed" className="flex items-center mb-6 text-sm text-muted-foreground hover:text-primary">
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Social Feed
          </Link>
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold">Post not found</h2>
            <p className="text-muted-foreground mt-2">The post you're looking for doesn't exist or has been removed.</p>
            <Button className="mt-4" asChild>
              <Link to="/social-feed">Return to Social Feed</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Find comments for this post
  const postComments = mockComments.filter(comment => comment.postId === postId);
  
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.likes);
  const [bookmarked, setBookmarked] = useState(post.isBookmarked || false);
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);
  const [pollVoted, setPollVoted] = useState(post.poll?.voted || false);
  
  const handleLike = () => {
    if (liked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  
  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      // In a real app, this would send the comment to a backend
      console.log("Commenting:", commentText);
      setCommentText("");
    }
  };

  const handlePollVote = () => {
    if (selectedPollOption !== null && post.poll && !pollVoted) {
      setPollVoted(true);
      console.log(`Voted for option: ${post.poll.options[selectedPollOption].text}`);
    }
  };
  
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  
  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
    setReplyText("");
  };
  
  const submitReply = () => {
    if (replyText.trim() && replyingTo) {
      // In a real app, this would send the reply to a backend
      console.log("Replying to comment", replyingTo, "with:", replyText);
      setReplyText("");
      setReplyingTo(null);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/social-feed" className="flex items-center mb-6 text-sm text-muted-foreground hover:text-primary">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Social Feed
        </Link>
        
        {/* Post Card */}
        <Card className="mb-6 overflow-hidden">
          <CardHeader className="p-4 pb-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <Avatar1 size={40} name={post.author.username} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                </Avatar>
                <div>
                  <div className="font-semibold flex items-center gap-1">
                    {post.author.name}
                    {post.author.name === "Francium" && <Badge variant="outline" className="text-xs px-1 py-0 h-4 ml-1">
                        <span className="text-blue-500">✓</span>
                      </Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {post.author.company} · {post.createdAt}
                  </div>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          
          <CardContent className="p-4">
            <p className="whitespace-pre-line">{post.content}</p>
            
            {post.images && post.images.length > 0 && (
              <div className={`grid gap-2 mt-3 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {post.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={image} 
                    alt="Post image" 
                    className="rounded-lg w-full h-auto object-cover" 
                    style={{maxHeight: '200px'}} 
                  />
                ))}
              </div>
            )}
            
            {post.video && (
              <video controls className="rounded-lg w-full mt-3" poster="/placeholder.svg">
                <source src={post.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {post.poll && (
              <div className="mt-3 space-y-2 border border-gray-100 rounded-md p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Poll: {post.poll.question || "What do you think?"}</h4>
                  {!pollVoted && selectedPollOption !== null && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePollVote}
                    >
                      Submit
                    </Button>
                  )}
                </div>
                
                {!pollVoted ? (
                  <RadioGroup 
                    value={selectedPollOption?.toString()} 
                    onValueChange={(value) => setSelectedPollOption(parseInt(value))}
                    className="space-y-2"
                  >
                    {post.poll.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`detail-option-${post.id}-${index}`} />
                        <label 
                          htmlFor={`detail-option-${post.id}-${index}`} 
                          className="text-sm cursor-pointer flex-grow"
                        >
                          {option.text}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <div className="space-y-3">
                    {post.poll.options.map((option, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center justify-between mb-1">
                          <span>{option.text}</span>
                          <span className="text-muted-foreground">{option.percentage}%</span>
                        </div>
                        <Progress value={option.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground mt-2">
                  {pollVoted ? `${post.poll.totalVotes} votes · Poll ends in ${post.poll.endsIn}` : `Poll ends in ${post.poll.endsIn}`}
                </p>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="p-4 pt-0 flex justify-between">
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="sm" onClick={handleLike} className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'text-muted-foreground'}`}>
                <Heart className={`h-4 w-4 ${liked ? 'fill-red-500' : ''}`} />
                <span>{likes}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center gap-1 text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>{post.comments}</span>
              </Button>
            </div>
            
            <Button variant="ghost" size="sm" onClick={handleBookmark} className={bookmarked ? 'text-blue-500' : 'text-muted-foreground'}>
              <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-blue-500' : ''}`} />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Comments Section */}
        <h2 className="font-semibold text-xl mb-4">Comments</h2>
        
        {/* Add Comment */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 flex gap-2">
            <input 
              type="text" 
              placeholder="Write a comment..." 
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" 
              value={commentText} 
              onChange={e => setCommentText(e.target.value)} 
            />
            <Button size="sm" onClick={handleCommentSubmit} disabled={!commentText.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Comments List */}
        <div className="space-y-4">
          {postComments.length > 0 ? postComments.map(comment => (
            <div key={comment.id}>
              <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  <Avatar1 
                    size={32} 
                    name={comment.author.username} 
                    variant="marble" 
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} 
                  />
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <div className="font-medium text-sm">
                      {comment.author.name}
                      <span className="text-xs text-muted-foreground ml-2">{comment.createdAt}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`text-xs h-6 px-2 ${comment.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                    >
                      <Heart className={`h-3 w-3 mr-1 ${comment.isLiked ? 'fill-red-500' : ''}`} />
                      <span>{comment.likes}</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleReply(comment.id)} 
                      className="text-xs h-6 px-2 text-muted-foreground"
                    >
                      Reply
                    </Button>
                  </div>
                  
                  {/* Reply input */}
                  {replyingTo === comment.id && (
                    <div className="mt-2 pl-4 flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Write a reply..." 
                        className="flex-1 border rounded-lg px-3 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary" 
                        value={replyText} 
                        onChange={e => setReplyText(e.target.value)} 
                      />
                      <Button 
                        size="sm" 
                        className="h-7 text-xs" 
                        onClick={submitReply} 
                        disabled={!replyText.trim()}
                      >
                        <Send className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-2 pl-6 border-l-2 border-muted space-y-2">
                      {comment.replies.map(reply => (
                        <div key={reply.id} className="pt-2">
                          <div className="flex items-start gap-2">
                            <Avatar className="h-6 w-6">
                              <Avatar1 
                                size={24} 
                                name={reply.author.username} 
                                variant="marble" 
                                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} 
                              />
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-baseline justify-between">
                                <div className="font-medium text-sm">
                                  {reply.author.name}
                                  <span className="text-xs text-muted-foreground ml-2">{reply.createdAt}</span>
                                </div>
                              </div>
                              <p className="text-sm mt-1">{reply.content}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className={`text-xs h-6 px-2 ${reply.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                                >
                                  <Heart className={`h-3 w-3 mr-1 ${reply.isLiked ? 'fill-red-500' : ''}`} />
                                  <span>{reply.likes}</span>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )) : (
            <p className="text-center text-muted-foreground py-4">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </div>
    </div>
  );
};
