
import React from "react";
import { Link } from "react-router-dom";
import { forumCategories } from "@/data/forumCategories";
import { ForumCategoryCard } from "./ForumCategoryCard";

export const ForumCategoryList: React.FC = () => {
  return (
    <div className="space-y-6"> {/* Increased spacing between cards from space-y-5 to space-y-6 */}
      {forumCategories.map((category) => (
        <Link key={category.id} to={`/community-forum/${category.slug}`} className="block">
          <ForumCategoryCard category={category} />
        </Link>
      ))}
    </div>
  );
};
