
import React, { useState } from "react";
import BoringAvatar from "boring-avatars";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart, MessageCircle, Share, MoreHorizontal, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface StoryAvatarProps {
  name: string;
  size?: number;
  avatar?: string;
}

export const StoryAvatar: React.FC<StoryAvatarProps> = ({
  name,
  size = 128,
  avatar,
}) => {
  const [showStory, setShowStory] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const uploadDate = new Date();
  uploadDate.setHours(uploadDate.getHours() - 3); // Mock upload time (3 hours ago)
  
  const formattedDate = uploadDate.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  // Calculate container size to accommodate ring + 2px gap + 2px ring thickness
  const containerSize = size + 8; // 4px gap + 4px ring thickness total
  const avatarSize = size === 64 ? "w-16 h-16" : "w-32 h-32";
  const containerClass = size === 64 ? "w-[72px] h-[72px]" : "w-[136px] h-[136px]";

  return (
    <>
      <div 
        className={`relative ${containerClass} cursor-pointer flex items-center justify-center`}
        onClick={() => setShowStory(true)}
      >
        {/* Spinning ring - positioned absolutely */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{ 
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            padding: '2px',
            animation: 'spin 3s linear infinite'
          }}
        >
          <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full"></div>
        </div>
        
        {/* Stationary avatar - centered with 2px gap from ring */}
        <div 
          className={`relative ${avatarSize} rounded-full overflow-hidden bg-white flex items-center justify-center`}
          style={{ margin: '4px' }}
        >
          {avatar ? (
            <img 
              src={avatar} 
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <BoringAvatar
              size={size}
              name={name}
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          )}
        </div>
      </div>

      {/* Story video modal */}
      <Dialog open={showStory} onOpenChange={setShowStory}>
        <DialogContent className="p-0 bg-black border-none !w-[360px] !max-w-[360px] !h-[640px] flex items-center justify-center rounded-3xl overflow-hidden">
          <div className="relative w-full h-full">
            {/* Video player with proper story aspect ratio */}
            <video 
              className="w-full h-full object-cover" 
              src="https://files.catbox.moe/fxy1b8.mp4" 
              autoPlay 
              controls={false}
              muted
              onEnded={() => setShowStory(false)}
            />
            
            {/* User info overlay */}
            <div className="absolute top-4 left-4 flex items-center">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-white p-0.5 mr-3">
                {avatar ? (
                  <img 
                    src={avatar} 
                    alt={name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <BoringAvatar
                    size={36}
                    name={name}
                    variant="beam"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                  />
                )}
              </div>
              <div className="text-white">
                <p className="font-semibold text-sm">{name}</p>
                <p className="text-xs opacity-80">{formattedDate}</p>
              </div>
            </div>

            {/* Right side action buttons */}
            <div className="absolute right-4 bottom-20 flex flex-col gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 border-none"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`h-6 w-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 border-none"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 border-none"
              >
                <Share className="h-6 w-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 border-none"
              >
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </div>

            {/* Comment input */}
            <div className="absolute bottom-4 left-4 right-20">
              <div 
                className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 cursor-text"
                onClick={() => setShowComments(true)}
              >
                <Input
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="bg-transparent border-none text-white placeholder:text-white/70 focus:outline-none flex-1"
                  onFocus={() => setShowComments(true)}
                />
                {commentText && (
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/10">
                    <Send className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Comments section - slides in from bottom */}
            <div className={`absolute inset-x-0 bottom-0 bg-black/80 backdrop-blur-md transition-transform duration-300 ease-out ${
              showComments ? 'translate-y-0' : 'translate-y-full'
            }`}>
              <div className="p-4 max-h-[300px] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Comments</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                    onClick={() => setShowComments(false)}
                  >
                    Close
                  </Button>
                </div>
                
                {/* Mock comments */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0"></div>
                    <div>
                      <p className="text-white text-sm">
                        <span className="font-semibold">john_doe</span> Amazing story! 🔥
                      </p>
                      <p className="text-white/60 text-xs mt-1">2h</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex-shrink-0"></div>
                    <div>
                      <p className="text-white text-sm">
                        <span className="font-semibold">sarah_wilson</span> Love this content! Keep it up 👏
                      </p>
                      <p className="text-white/60 text-xs mt-1">1h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 text-white opacity-80 hover:opacity-100 z-10"
              onClick={() => setShowStory(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
