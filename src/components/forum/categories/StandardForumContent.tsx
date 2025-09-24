import React, { useState } from "react";
import { ForumCategory } from "@/types/forum";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ThumbsUp, MessageSquare } from "lucide-react";
import Avatar3d from "boring-avatars";
import { useNavigate } from "react-router-dom";
import { NewPostModal } from "../NewPostModal";

interface StandardForumContentProps {
  category: ForumCategory;
}

// Mock forum posts based on category
const getMockPosts = (categoryId: number) => {
  const basePosts = [
    {
      id: 1,
      title: "Looking for recommendations on ethical material sourcing",
      content: "I'm working on a new project and want to ensure all materials are ethically sourced. Does anyone have recommendations for suppliers or certification standards to look for?",
      authorName: "Jamie Rodriguez",
      authorAvatar: "",
      createdAt: "2 days ago",
      likes: 18,
      comments: 7
    },
    {
      id: 2,
      title: "Implementing sustainable practices in daily operations",
      content: "Our studio is trying to reduce our environmental footprint. What are some practical steps you've taken that have made a difference without significantly increasing costs?",
      authorName: "Morgan Chen",
      authorAvatar: "",
      createdAt: "5 days ago",
      likes: 24,
      comments: 12
    },
    {
      id: 3,
      title: "Question about traditional vs. modern techniques",
      content: "I'm exploring the balance between traditional craftsmanship and modern methods. Would love to hear thoughts on when to stick with tradition and when to embrace new technology.",
      authorName: "Alex Johnson",
      authorAvatar: "",
      createdAt: "1 week ago",
      likes: 15,
      comments: 9
    }
  ];
  
  // Return modified content based on category to make it more relevant
  return basePosts.map(post => ({
    ...post,
    id: post.id + (categoryId * 10) // ensure unique IDs across categories
  }));
};

export const StandardForumContent: React.FC<StandardForumContentProps> = ({ category }) => {
  const posts = getMockPosts(category.id);
  const navigate = useNavigate();
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  
  const handleViewPost = (postId: number) => {
    navigate(`/community-forum/${category.slug}/${postId}`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Discussions</h2>
        <Button onClick={() => setShowNewPostModal(true)}>New Post</Button>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewPost(post.id)}>
            <CardContent className="p-3">
              <div className="flex items-start gap-3">
                <Avatar3d
                  size={40}
                  name={post.authorName}
                  variant="marble"
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-0.5">{post.title}</h3>
                  
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <span className="font-medium">{post.authorName}</span>
                    <span className="text-xs text-muted-foreground">• {post.createdAt}</span>
                  </div>
                  
                  <p className="text-sm line-clamp-2">{post.content}</p>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t py-2 px-3">
              <div className="flex gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  <span className="text-xs">{post.likes}</span>
                </Button>
                
                <Button variant="ghost" size="sm" className="flex items-center gap-1 h-7">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span className="text-xs">{post.comments}</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <NewPostModal 
        open={showNewPostModal}
        onOpenChange={setShowNewPostModal}
      />
    </>
  );
};
