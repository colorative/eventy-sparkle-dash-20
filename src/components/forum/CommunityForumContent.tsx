
import React, { useState, useEffect } from "react";
import { ForumCategoryGrid } from "@/components/forum/ForumCategoryGrid";
import { ForumHeader } from "@/components/forum/ForumHeader";
import { ForumCategoryList } from "@/components/forum/ForumCategoryList";
import { WelcomeModal } from "@/components/forum/WelcomeModal";
import { List, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CommunityForumContent: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    // Check if welcome modal should be shown
    const dismissed = localStorage.getItem('forum-welcome-dismissed');
    if (!dismissed) {
      setShowWelcomeModal(true);
    }
  }, []);
  
  return (
    <div className="w-full max-w-[1024px] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <ForumHeader />
        <div className="flex items-center gap-2">
          <Button 
            variant={viewMode === "list" ? "default" : "outline"} 
            size="icon" 
            onClick={() => setViewMode("list")}
            className="h-9 w-9"
          >
            <List className="h-5 w-5" />
          </Button>
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            size="icon" 
            onClick={() => setViewMode("grid")}
            className="h-9 w-9"
          >
            <Grid className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {viewMode === "grid" ? (
        <ForumCategoryGrid />
      ) : (
        <ForumCategoryList />
      )}
      
      <WelcomeModal 
        isOpen={showWelcomeModal} 
        onClose={() => setShowWelcomeModal(false)} 
      />
    </div>
  );
};
