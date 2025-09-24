import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, MessageSquare, Bookmark, MoreHorizontal, Share, Flag, Trash2, Timer, Smile, Send, X } from "lucide-react";
import { Post, mockComments, Comment, Reply } from "./mockData";
import { Badge } from "@/components/ui/badge";
import Avatar1 from "boring-avatars";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import EmojiPicker from 'emoji-picker-react';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";

interface PostCardProps {
  post: Post;
}

interface EmojiReaction {
  emoji: string;
  count: number;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.likes);
  const [bookmarked, setBookmarked] = useState(post.isBookmarked || false);
  const [selectedPollOption, setSelectedPollOption] = useState<number | null>(null);
  const [pollVoted, setPollVoted] = useState(post.poll?.voted || false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiReactions, setEmojiReactions] = useState<EmojiReaction[]>(post.emojiReactions || []);
  const [openMediaDialog, setOpenMediaDialog] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mockComments.filter(comment => comment.postId === post.id));
  const [showReplyInput, setShowReplyInput] = useState<string | null>(null);
  const [newReply, setNewReply] = useState("");
  
  const handleCardClick = (e: React.MouseEvent) => {
    // If the click is not on a button or other interactive element
    if (!(e.target as HTMLElement).closest('button') && 
        !(e.target as HTMLElement).closest('input') &&
        !(e.target as HTMLElement).closest('a')) {
      navigate(`/social-feed/${post.id}`);
    }
  };
  
  const handleMediaClick = (e: React.MouseEvent, media: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedMedia(media);
    setOpenMediaDialog(true);
  };
  
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

  const handlePollVote = () => {
    if (selectedPollOption !== null && post.poll && !pollVoted) {
      setPollVoted(true);
      console.log(`Voted for option: ${post.poll.options[selectedPollOption].text}`);
    }
  };

  const handlePollClick = (e: React.MouseEvent) => {
    if (post.poll) {
      e.preventDefault(); // Prevent navigation to detail page when clicking on polls
      e.stopPropagation();
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    const emoji = emojiData.emoji;
    
    // Check if this emoji already exists in reactions
    const existingEmojiIndex = emojiReactions.findIndex(
      reaction => reaction.emoji === emoji
    );
    
    if (existingEmojiIndex > -1) {
      // Increment the count for this emoji
      const updatedReactions = [...emojiReactions];
      updatedReactions[existingEmojiIndex].count += 1;
      setEmojiReactions(updatedReactions);
    } else {
      // Add new emoji reaction
      setEmojiReactions([...emojiReactions, { emoji, count: 1 }]);
    }
    
    setShowEmojiPicker(false);
    toast({
      title: "Reaction added",
      description: `You reacted with ${emoji}`,
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!newComment.trim()) return;
    
    const newCommentObj: Comment = {
      id: `comment-${Date.now()}`,
      postId: post.id,
      author: {
        name: "Me",
        username: "me_user",
        company: "My Company"
      },
      content: newComment,
      createdAt: "Just now",
      likes: 0,
      isLiked: false,
      replies: []
    };
    
    setComments(prev => [newCommentObj, ...prev]);
    setNewComment("");
    
    toast({
      title: "Comment added",
      description: "Your comment has been added successfully",
    });
  };

  const handleAddReply = (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!newReply.trim()) return;
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const newReplyObj: Reply = {
          id: `reply-${Date.now()}`,
          author: {
            name: "Me",
            username: "me_user",
            company: "My Company"
          },
          content: newReply,
          createdAt: "Just now",
          likes: 0,
          isLiked: false
        };
        
        return {
          ...comment,
          replies: [...(comment.replies || []), newReplyObj]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setNewReply("");
    setShowReplyInput(null);
    
    toast({
      title: "Reply added",
      description: "Your reply has been added successfully",
    });
  };

  // Select only the first comment to show in the feed
  const firstComment = comments.length > 0 ? comments[0] : null;

  return (
    <Card className="overflow-hidden mb-4">
      <CardHeader className="p-3 pb-0" onClick={handleCardClick}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <Avatar1 size={32} name={post.author.username} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
            </Avatar>
            <div>
              <div className="font-medium text-sm flex items-center gap-1">
                {post.author.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {post.author.company} · {post.createdAt}
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
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
      
      <CardContent className="p-3">
        {post.poll ? (
          <div onClick={handlePollClick}>
            <p className="whitespace-pre-line text-sm mb-3" onClick={handleCardClick}>{post.content}</p>
            
            <div className="mt-3 space-y-2 p-3">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-sm">Poll: {post.poll.question || "What do you think?"}</h4>
                {!pollVoted && selectedPollOption !== null && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs" 
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
                      <RadioGroupItem value={index.toString()} id={`option-${post.id}-${index}`} />
                      <label 
                        htmlFor={`option-${post.id}-${index}`} 
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
                      <div className="flex items-center justify-between mb-1 text-sm">
                        <span className="truncate max-w-[70%]">{option.text}</span>
                        <span className="text-muted-foreground">{option.percentage}%</span>
                      </div>
                      <div className="overflow-hidden rounded-full bg-muted">
                        <Progress value={option.percentage} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <p className="text-xs text-muted-foreground mt-5 flex items-center">
                <Timer className="h-3 w-3 mr-1" />
                {pollVoted ? `${post.poll.totalVotes} votes · Poll ends in ${post.poll.endsIn}` : `Poll ends in ${post.poll.endsIn}`}
              </p>
            </div>
          </div>
        ) : (
          <>
            <p className="whitespace-pre-line text-sm" onClick={handleCardClick}>{post.content}</p>
            
            {post.images && post.images.length > 0 && <div className={`grid gap-2 mt-2 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {post.images.map((image, index) => (
                <div 
                  key={index} 
                  className="relative group cursor-pointer"
                  onClick={(e) => handleMediaClick(e, image)}
                >
                  <img 
                    src={image} 
                    alt="Post image" 
                    className="rounded-lg w-full h-auto object-cover" 
                    style={{ maxHeight: '180px' }} 
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded-lg"></div>
                </div>
              ))}
            </div>}
            
            {post.video && (
              <div 
                className="relative group mt-2 cursor-pointer"
                onClick={(e) => handleMediaClick(e, post.video || "")}
              >
                <video 
                  className="rounded-lg w-full" 
                  poster="/placeholder.svg"
                >
                  <source src={post.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded-lg"></div>
              </div>
            )}
          </>
        )}
      </CardContent>
      
      <CardFooter className="p-3 pt-0 flex flex-col">
        {emojiReactions.length > 0 && (
          <div className="flex items-center mb-2 py-1 px-2 bg-slate-50 rounded-full self-start">
            {emojiReactions.map((reaction, index) => (
              <div key={index} className="flex items-center mr-2 last:mr-0">
                <span className="mr-1">{reaction.emoji}</span>
                <span className="text-xs text-muted-foreground">{reaction.count}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => { e.stopPropagation(); handleLike(); }} 
              className={`flex items-center gap-1 h-7 px-2 ${liked ? 'text-red-500' : 'text-muted-foreground'}`}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-red-500' : ''}`} />
              <span className="text-xs">{likes}</span>
            </Button>
            
            <Link to={`/social-feed/${post.id}`} onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7 px-2 text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs">{comments.length}</span>
              </Button>
            </Link>

            <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 h-7 px-2 text-muted-foreground"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Smile className="h-4 w-4" />
                  <span className="text-xs">React</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start" onClick={(e) => e.stopPropagation()}>
                <EmojiPicker 
                  onEmojiClick={handleEmojiClick}
                  width="100%"
                  height={350}
                  searchPlaceHolder="Search emoji..."
                  previewConfig={{
                    showPreview: false
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={(e) => { e.stopPropagation(); handleBookmark(); }} 
            className={`h-7 px-2 ${bookmarked ? 'text-blue-500' : 'text-muted-foreground'}`}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-blue-500' : ''}`} />
          </Button>
        </div>

        {/* Display first comment */}
        {firstComment && (
          <div className="w-full mt-3 border-t py-2">
            <div className="flex gap-2">
              <Avatar className="h-6 w-6">
                <Avatar1 size={24} name={firstComment.author.username} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline">
                  <span className="text-xs font-medium mr-1">{firstComment.author.name}</span>
                  <span className="text-xs text-slate-500">{firstComment.createdAt}</span>
                </div>
                <p className="text-xs mb-2">{firstComment.content}</p>
                
                {/* Comment actions */}
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      const updatedComments = comments.map(comment => 
                        comment.id === firstComment.id 
                          ? { 
                              ...comment, 
                              isLiked: !comment.isLiked,
                              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
                            }
                          : comment
                      );
                      setComments(updatedComments);
                    }} 
                    className={`flex items-center gap-1 h-6 px-1 ${firstComment.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
                  >
                    <Heart className={`h-3 w-3 ${firstComment.isLiked ? 'fill-red-500' : ''}`} />
                    <span className="text-xs">{firstComment.likes}</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toast({
                        title: "React to comment",
                        description: "Emoji reactions for comments coming soon!",
                      });
                    }}
                    className="flex items-center gap-1 h-6 px-1 text-muted-foreground"
                  >
                    <Smile className="h-3 w-3" />
                    <span className="text-xs">React</span>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowReplyInput(showReplyInput === firstComment.id ? null : firstComment.id);
                    }}
                    className="flex items-center gap-1 h-6 px-1 text-muted-foreground"
                  >
                    <MessageSquare className="h-3 w-3" />
                    <span className="text-xs">Reply</span>
                  </Button>
                </div>
                
                {/* Reply input form */}
                {showReplyInput === firstComment.id && (
                  <form onSubmit={(e) => handleAddReply(e, firstComment.id)} className="mt-2 flex gap-2" onClick={(e) => e.stopPropagation()}>
                    <Avatar className="h-5 w-5 flex-shrink-0">
                      <Avatar1 size={20} name="me_user" variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                    </Avatar>
                    <div className="flex-1 flex gap-1 items-center">
                      <Input 
                        placeholder={`Reply to ${firstComment.author.name}...`}
                        value={newReply} 
                        onChange={(e) => setNewReply(e.target.value)}
                        className="h-7 text-xs"
                        autoFocus
                      />
                      <Button 
                        type="submit" 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0" 
                        disabled={!newReply.trim()}
                      >
                        <Send className="h-3 w-3" />
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            {comments.length > 1 && (
              <Link to={`/social-feed/${post.id}`} className="text-xs text-blue-500 mt-2 block" onClick={(e) => e.stopPropagation()}>
                View all {comments.length} comments
              </Link>
            )}
          </div>
        )}

        {/* Add comment form */}
        <form onSubmit={handleAddComment} className="w-full mt-2 flex gap-2" onClick={(e) => e.stopPropagation()}>
          <Avatar className="h-6 w-6 flex-shrink-0">
            <Avatar1 size={24} name="me_user" variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
          </Avatar>
          <div className="flex-1 flex gap-1 items-center">
            <Input 
              placeholder="Add a comment..." 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)}
              className="h-8 text-xs"
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              disabled={!newComment.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>

      {/* Media dialog */}
      <Dialog open={openMediaDialog} onOpenChange={setOpenMediaDialog}>
        <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none" onClick={(e) => e.stopPropagation()}>
          <div className="bg-black/90 rounded-lg flex items-center justify-center relative">
            <button 
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 z-10"
              onClick={() => setOpenMediaDialog(false)}
            >
              <X className="h-5 w-5" />
            </button>
            {selectedMedia && selectedMedia.endsWith('.mp4') ? (
              <video controls className="max-h-[80vh] max-w-full">
                <source src={selectedMedia} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img 
                src={selectedMedia || ''} 
                alt="Full size" 
                className="max-h-[80vh] max-w-full object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
