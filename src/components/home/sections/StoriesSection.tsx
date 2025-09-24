import React, { useState } from "react";
import { HorizontalScroller } from "@/components/ui/horizontal-scroller";
import { EnhancedStoryAvatar } from "./EnhancedStoryAvatar";
import { CreateStoryModal, StoryData } from "./CreateStoryModal";

export const StoriesSection: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [stories, setStories] = useState<StoryData[]>([]);

  // Sample stories from other users
  const otherStories = [
    { 
      name: "Sarah Chen", 
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face",
      story: {
        id: "sample-1",
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=711&fit=crop",
        author: {
          name: "Sarah Chen",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=128&h=128&fit=crop&crop=face"
        },
        visibility: "everyone" as const,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        views: 25,
        isOwn: false
      }
    },
    { 
      name: "Michael Rodriguez", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face",
      story: {
        id: "sample-2",
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=711&fit=crop",
        author: {
          name: "Michael Rodriguez",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face"
        },
        visibility: "everyone" as const,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        views: 42,
        isOwn: false
      }
    },
    { 
      name: "Emma Thompson", 
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&crop=face",
      story: {
        id: "sample-3",
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=400&h=711&fit=crop",
        caption: "Beautiful sunset from the conference! 🌅",
        author: {
          name: "Emma Thompson",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&crop=face"
        },
        visibility: "everyone" as const,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        views: 18,
        isOwn: false
      }
    },
    { 
      name: "David Park", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face",
      story: {
        id: "sample-4",
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=711&fit=crop",
        author: {
          name: "David Park",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face"
        },
        visibility: "everyone" as const,
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
        views: 31,
        isOwn: false
      }
    },
    { 
      name: "Alex Turner", 
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face",
      story: {
        id: "sample-6",
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=711&fit=crop",
        caption: "Amazing keynote today! 💡",
        author: {
          name: "Alex Turner",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=128&h=128&fit=crop&crop=face"
        },
        visibility: "everyone" as const,
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
        views: 89,
        isOwn: false
      }
    },
    { 
      name: "Maria Garcia", 
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=128&h=128&fit=crop&crop=face",
      story: {
        id: "sample-7",
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=711&fit=crop",
        author: {
          name: "Maria Garcia",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=128&h=128&fit=crop&crop=face"
        },
        visibility: "everyone" as const,
        createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000), // 14 hours ago
        views: 34,
        isOwn: false
      }
    },
    { 
      name: "James Wilson", 
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=128&h=128&fit=crop&crop=face",
      story: {
        id: "sample-8",
        type: "image" as const,
        url: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=711&fit=crop",
        caption: "Coffee break discussions ☕",
        author: {
          name: "James Wilson",
          avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=128&h=128&fit=crop&crop=face"
        },
        visibility: "everyone" as const,
        createdAt: new Date(Date.now() - 16 * 60 * 60 * 1000), // 16 hours ago
        views: 52,
        isOwn: false
      }
    }
  ];

  const handleCreateStory = () => {
    setShowCreateModal(true);
  };

  const handlePublishStory = (story: StoryData) => {
    setStories(prev => [story, ...prev]);
  };

  const handleDeleteStory = (storyId: string) => {
    setStories(prev => prev.filter(story => story.id !== storyId));
  };

  const handleViewStory = (storyId: string) => {
    // In a real app, this would track analytics
    console.log(`Story ${storyId} viewed`);
  };

  // Combine user stories with other stories
  const allStories = [...stories, ...otherStories];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Stories</h2>
      <HorizontalScroller className="px-1">
        {/* Add Story Button */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <EnhancedStoryAvatar
            name="Your Story"
            size={64}
            isAddButton={true}
            onAddClick={handleCreateStory}
          />
          <p className="text-xs text-center mt-2 text-slate-600 dark:text-slate-400 w-20 truncate">
            Your Story
          </p>
        </div>

        {/* User's Published Stories */}
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0 flex flex-col items-center">
            <EnhancedStoryAvatar
              story={story}
              name={story.author.name}
              size={64}
              avatar={story.author.avatar}
              onDelete={handleDeleteStory}
              onView={handleViewStory}
            />
            <p className="text-xs text-center mt-2 text-slate-600 dark:text-slate-400 w-20 truncate">
              {story.author.name}
            </p>
          </div>
        ))}

        {/* Other Users' Stories */}
        {otherStories.map((storyData, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col items-center">
            <EnhancedStoryAvatar
              story={storyData.story}
              name={storyData.name}
              size={64}
              avatar={storyData.avatar}
              onView={handleViewStory}
            />
            <p className="text-xs text-center mt-2 text-slate-600 dark:text-slate-400 w-20 truncate">
              {storyData.name}
            </p>
          </div>
        ))}
      </HorizontalScroller>

      {/* Create Story Modal */}
      <CreateStoryModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onPublish={handlePublishStory}
      />
    </div>
  );
};
