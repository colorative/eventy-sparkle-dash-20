
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { HorizontalScroller } from "@/components/ui/horizontal-scroller";
import { PostCard } from "@/components/socialfeed/PostCard";
import { mockPosts } from "@/components/socialfeed/mockData";

export const SocialFeedSection: React.FC = () => {
  const navigate = useNavigate();
  
  // Get first 5 posts for the homepage preview
  const previewPosts = mockPosts.slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Social Feed</h2>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/social-feed')}
          className="text-blue-600 hover:text-blue-700"
        >
          View All
        </Button>
      </div>
      <HorizontalScroller>
        {previewPosts.map((post) => (
          <div key={post.id} className="flex-shrink-0 w-96">
            <PostCard post={post} />
          </div>
        ))}
      </HorizontalScroller>
    </div>
  );
};
