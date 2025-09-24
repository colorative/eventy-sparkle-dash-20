
import React, { useState } from "react";
import { MessageCircle, Heart as HeartIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import Avatar from "boring-avatars";
import Heart from "react-animated-heart";
import { FirstPlaceBadge } from "./FirstPlaceBadge";
import { SecondPlaceBadge } from "./SecondPlaceBadge";
import { ThirdPlaceBadge } from "./ThirdPlaceBadge";

interface PhotoCardProps {
  id: string;
  imageUrl: string;
  likes: number;
  description: string;
  username: string;
  uploadDate: string;
  commentsCount: number;
  onLikeClick: (id: string) => void;
  onCardClick: (id: string) => void;
  badgePosition?: number | null;
  borderColor?: string;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  id,
  imageUrl,
  likes,
  description,
  username,
  uploadDate,
  commentsCount,
  onLikeClick,
  onCardClick,
  badgePosition = null,
  borderColor = ""
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    onLikeClick(id);
  };

  const renderBadge = () => {
    switch (badgePosition) {
      case 1:
        return <FirstPlaceBadge />;
      case 2:
        return <SecondPlaceBadge />;
      case 3:
        return <ThirdPlaceBadge />;
      default:
        return null;
    }
  };

  return (
    <Card 
      className={`overflow-hidden cursor-pointer transition-all hover:shadow-lg ${borderColor ? `border-2` : ''}`}
      style={borderColor ? { borderColor } : {}}
      onClick={() => onCardClick(id)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {badgePosition && (
          <div className="absolute top-0 left-0 z-10">
            {renderBadge()}
          </div>
        )}
        <img 
          src={imageUrl} 
          alt={description} 
          className="w-full h-full object-cover transition-transform hover:scale-105" 
        />
        <div 
          className="absolute top-2 right-2 flex items-center justify-center w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm text-white hover:bg-white/50 transition-colors" 
          onClick={(e) => {
            e.stopPropagation();
            handleLikeClick(e);
          }}
        >
          <div className="scale-[0.5] flex items-center justify-center">
            <Heart isClick={isLiked} onClick={() => {}} />
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Avatar size={28} name={username} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
          <div className="flex-1">
            <p className="text-sm font-medium truncate">{username}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-gray-400">
              <MessageCircle size={16} />
              <span>{commentsCount}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <HeartIcon size={16} />
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
