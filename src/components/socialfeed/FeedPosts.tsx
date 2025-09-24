
import React from "react";
import { PostCard } from "./PostCard";
import { mockPosts } from "./mockData";

export const FeedPosts: React.FC = () => {
  return (
    <div className="space-y-6">
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
