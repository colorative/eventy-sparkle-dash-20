import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, Users, MessageSquare, Lightbulb } from "lucide-react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const suggestedCommunities = [
  {
    id: 1,
    title: "Honoring the artistry",
    description: "Celebrating the essence that defines our community",
    icon: Users,
    newPosts: 3,
    color: "purple"
  },
  {
    id: 2,
    title: "Meetups & Virtual Meets",
    description: "Connect globally, meet locally.",
    icon: MessageSquare,
    newPosts: 2,
    color: "orange"
  },
  {
    id: 3,
    title: "Testing",
    description: "testing purpose",
    icon: Lightbulb,
    newPosts: 1,
    color: "blue"
  },
  {
    id: 4,
    title: "Tech Innovation",
    description: "Discuss cutting-edge technology and innovation trends",
    icon: Users,
    newPosts: 5,
    color: "green"
  },
  {
    id: 5,
    title: "Creative Showcase",
    description: "Share your creative projects and get feedback",
    icon: MessageSquare,
    newPosts: 4,
    color: "pink"
  },
  {
    id: 6,
    title: "Industry Insights",
    description: "Professional discussions and industry knowledge sharing",
    icon: Lightbulb,
    newPosts: 7,
    color: "indigo"
  }
];

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const [neverShowAgain, setNeverShowAgain] = useState(false);

  const handleClose = () => {
    if (neverShowAgain) {
      localStorage.setItem('forum-welcome-dismissed', 'true');
    }
    onClose();
  };

  const handleFollow = (communityId: number) => {
    // Handle follow functionality here
    console.log(`Following community ${communityId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl p-0 bg-white dark:bg-gray-900">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="p-8">
            <DialogHeader className="text-center mb-6">
              <DialogTitle className="text-3xl font-bold dark:text-white mb-2">
                Welcome to Community Forum
              </DialogTitle>
              <p className="text-muted-foreground text-base">
                Discover and connect with like-minded people in our vibrant communities. Follow topics that interest you and join the conversation.
              </p>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {suggestedCommunities.map((community) => {
                const IconComponent = community.icon;
                const colorVariants = {
                  purple: "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
                  orange: "bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400", 
                  blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
                  green: "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400",
                  pink: "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400",
                  indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                };
                
                return (
                  <Card key={community.id} className="overflow-hidden hover:shadow-md transition-all">
                    <div className="flex flex-col h-full">
                      {/* Header with icon and background */}
                      <div className={`p-4 ${colorVariants[community.color as keyof typeof colorVariants]?.split(' text-')[0]} dark:${colorVariants[community.color as keyof typeof colorVariants]?.split('dark:')[1]?.split(' ')[0]}`}>
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorVariants[community.color as keyof typeof colorVariants]?.split(' dark:')[0]?.replace('bg-', 'bg-').replace('-50', '-100')} ${colorVariants[community.color as keyof typeof colorVariants]?.split(' ')[1]}`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <h3 className="font-semibold text-sm text-center">
                            {community.title}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Content section */}
                      <CardContent className="p-4 flex-1 flex flex-col">
                        <p className="text-xs text-muted-foreground text-center mb-3 line-clamp-2">
                          {community.description}
                        </p>
                        
                        <div className="flex items-center justify-center mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {community.newPosts} New
                          </Badge>
                        </div>
                        
                        <Button
                          onClick={() => handleFollow(community.id)}
                          variant="outline"
                          size="sm"
                          className="w-full gap-1 mt-auto"
                        >
                          <Plus className="h-3 w-3" />
                          Follow
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex items-center justify-center space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Checkbox
                id="never-show"
                checked={neverShowAgain}
                onCheckedChange={(checked) => setNeverShowAgain(checked === true)}
              />
              <label
                htmlFor="never-show"
                className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
              >
                Don't show this again
              </label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};