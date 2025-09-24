
import React from "react";
import { useNavigate } from "react-router-dom";
import { forumCategories } from "@/data/forumCategories";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IceBreakerContent } from "./categories/IceBreakerContent";
import { MeetupsContent } from "./categories/MeetupsContent";
import { JobBoardContent } from "./categories/JobBoardContent";
import { StandardForumContent } from "./categories/StandardForumContent";
import { ChatContent } from "./categories/ChatContent";

interface ForumCategoryContentProps {
  slug: string;
}

export const ForumCategoryContent: React.FC<ForumCategoryContentProps> = ({ slug }) => {
  const navigate = useNavigate();
  const category = forumCategories.find(cat => cat.slug === slug);
  
  if (!category) {
    return (
      <div className="w-full max-w-[1024px] mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/community-forum")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  const renderCategoryContent = () => {
    switch (category.type) {
      case "introduction":
        return <IceBreakerContent category={category} />;
      case "meetup":
        return <MeetupsContent category={category} />;
      case "jobBoard":
        return <JobBoardContent category={category} />;
      case "chat":
        return <ChatContent category={category} />;
      default:
        return <StandardForumContent category={category} />;
    }
  };

  return (
    <div className="w-full max-w-[1024px] mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/community-forum")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg text-xl"
            style={{ backgroundColor: category.color }}
          >
            {category.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{category.title}</h1>
            <p className="text-muted-foreground">{category.description}</p>
          </div>
        </div>
      </div>
      
      {renderCategoryContent()}
    </div>
  );
};
