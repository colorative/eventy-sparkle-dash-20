
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Heart, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Avatar3d from "boring-avatars";

interface PostDetailsContentProps {
  categorySlug: string;
}

// Mock post data
const mockPost = {
  id: 1,
  title: "Looking for recommendations on ethical material sourcing",
  content: "I'm working on a new project and want to ensure all materials are ethically sourced. Does anyone have recommendations for suppliers or certification standards to look for? I'd love to hear from anyone who has experience with sustainable sourcing practices.",
  authorName: "Jamie Rodriguez",
  createdAt: "2 days ago",
  likes: 18,
  comments: 7,
  isLiked: false
};

const mockComments = [
  {
    id: 1,
    author: "Alex Johnson",
    content: "I've had great success with EcoSupply Co. They have excellent certifications and transparent supply chains.",
    createdAt: "1 day ago",
    likes: 5
  },
  {
    id: 2,
    author: "Morgan Chen",
    content: "Check out the Fair Trade certification. It's a good starting point for ethical sourcing.",
    createdAt: "1 day ago",
    likes: 3
  }
];

export const PostDetailsContent: React.FC<PostDetailsContentProps> = ({ categorySlug }) => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(mockPost.isLiked);
  const [likes, setLikes] = useState(mockPost.likes);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mockComments);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => liked ? prev - 1 : prev + 1);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: comments.length + 1,
      author: "You",
      content: newComment,
      createdAt: "Just now",
      likes: 0
    };
    
    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="w-full max-w-[1024px] mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Link 
          to={`/community-forum/${categorySlug}`}
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Category
        </Link>

        {/* Post Content */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-4">
              <Avatar3d
                size={48}
                name={mockPost.authorName}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
              <div>
                <h1 className="text-2xl font-semibold mb-2">{mockPost.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-medium">{mockPost.authorName}</span>
                  <span>•</span>
                  <span>{mockPost.createdAt}</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed">{mockPost.content}</p>
          </CardContent>
          
          <CardFooter className="border-t px-6 py-4">
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLike}
                className={`flex items-center gap-2 ${liked ? 'text-red-500' : ''}`}
              >
                <Heart className={`h-4 w-4 ${liked ? 'fill-red-500' : ''}`} />
                <span>{likes}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>{comments.length}</span>
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Add Comment */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar3d
                size={32}
                name="You"
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Comments</h3>
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar3d
                    size={32}
                    name={comment.author}
                    variant="marble"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                    <Button variant="ghost" size="sm" className="mt-2 text-xs">
                      <Heart className="h-3 w-3 mr-1" />
                      {comment.likes}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
