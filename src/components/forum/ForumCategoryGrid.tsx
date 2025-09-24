
import React from "react";
import { Link } from "react-router-dom";
import { forumCategories } from "@/data/forumCategories";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ForumCategoryGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {forumCategories.map((category) => (
        <Link key={category.id} to={`/community-forum/${category.slug}`} className="block">
          <Card className="overflow-hidden border">
            <div className="flex flex-col h-full">
              {/* Header with icon and background */}
              <div 
                className="p-6"
                style={{ backgroundColor: `${category.color}20` }} // Increased opacity from 10 to 20 (more noticeable)
              >
                <div className="flex flex-col items-start gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{category.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Footer section */}
              <div className="border-t px-4 py-3 flex justify-between items-center mt-auto">
                <div className="flex gap-1 items-center">
                  <div className="text-sm text-muted-foreground">{category.postCount} posts</div>
                  <span className="text-muted-foreground mx-2">•</span>
                  <div className="text-sm text-muted-foreground">Last reply {category.lastUpdate}</div>
                </div>
                
                <div className="flex gap-2">
                  {category.hasNewPosts && (
                    <Badge variant="destructive" className="text-xs">NEW</Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
