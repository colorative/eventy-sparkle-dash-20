import React from "react";
import { CreatePostCard } from "./CreatePostCard";
import { FeedPosts } from "./FeedPosts";
export const SocialFeedContent: React.FC = () => {
  return <div className="p-6">
      <div className="max-w-2xl mx-auto">
        
        <CreatePostCard />
        <FeedPosts />
      </div>
    </div>;
};