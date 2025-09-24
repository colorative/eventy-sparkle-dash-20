
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ForumCategory } from "@/types/forum";
import { ChevronRight } from "lucide-react";

interface ForumCategoryCardProps {
  category: ForumCategory;
}

export const ForumCategoryCard: React.FC<ForumCategoryCardProps> = ({ category }) => {
  return (
    <Card className="overflow-hidden group">
      <div className="flex items-stretch">
        <div 
          className="p-4 flex items-center justify-center text-3xl"
          style={{ backgroundColor: category.color, width: "100px" }}
        >
          <div className="bg-white/90 rounded-full p-2 shadow w-12 h-12 flex items-center justify-center">
            {category.icon}
          </div>
        </div>
        
        <CardContent className="flex-1 py-5 px-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1.5">{category.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{category.description}</p>
            
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <span>{category.postCount} posts</span>
                <span className="mx-1">•</span>
                <span>Last reply: {category.lastUpdate}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <div className="flex gap-1.5">
                {category.hasNewPosts && (
                  <Badge variant="destructive" className="text-xs">NEW</Badge>
                )}
                <Badge variant="outline" className="text-xs">{Math.floor(Math.random() * 5) + 1} Replies</Badge>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
