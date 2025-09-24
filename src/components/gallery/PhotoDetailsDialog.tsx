
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Photo } from "./PhotoGrid";
import { Send, X, MessageCircle, ArrowLeft, ArrowRight, Heart } from "lucide-react";
import Avatar from "boring-avatars";

interface PhotoDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photo: Photo | null;
  onLike: (id: string) => void;
  onAddComment: (photoId: string, comment: string) => void;
  onReaction: (photoId: string, emoji: string) => void;
  photos?: Photo[]; // Optional array of all photos for navigation
}

interface EmojiReaction {
  emoji: string;
  count: number;
}

export const PhotoDetailsDialog: React.FC<PhotoDetailsDialogProps> = ({
  open,
  onOpenChange,
  photo,
  onLike,
  onAddComment,
  onReaction,
  photos = [], // Default to empty array if not provided
}) => {
  const [newComment, setNewComment] = useState("");
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(photo);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  
  // Update current photo when the photo prop changes
  useEffect(() => {
    if (photo) {
      setCurrentPhoto(photo);
      // Find the index of the current photo in the photos array
      const index = photos.findIndex(p => p.id === photo.id);
      if (index >= 0) {
        setCurrentPhotoIndex(index);
      }
    }
  }, [photo, photos]);
  
  if (!currentPhoto) return null;

  // Rearrange reactions to put heart first
  const emojis: EmojiReaction[] = [
    { emoji: "❤️", count: 4 },
    { emoji: "🎉", count: 3 },
    { emoji: "😍", count: 7 },
    { emoji: "👏", count: 2 },
    { emoji: "😂", count: 5 },
    { emoji: "🔥", count: 8 },
    { emoji: "👍", count: 6 }
  ];
  
  const totalReactions = emojis.reduce((total, reaction) => total + reaction.count, 0);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(currentPhoto.id, newComment);
      setNewComment("");
    }
  };

  // Navigation handlers
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photos.length > 1 && currentPhotoIndex > 0) {
      const newIndex = currentPhotoIndex - 1;
      setCurrentPhotoIndex(newIndex);
      setCurrentPhoto(photos[newIndex]);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photos.length > 1 && currentPhotoIndex < photos.length - 1) {
      const newIndex = currentPhotoIndex + 1;
      setCurrentPhotoIndex(newIndex);
      setCurrentPhoto(photos[newIndex]);
    }
  };

  const hasPrev = currentPhotoIndex > 0;
  const hasNext = currentPhotoIndex < photos.length - 1;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[80vw] max-h-[85vh] p-0 overflow-hidden w-full">
        <div className="absolute right-4 top-4 z-10">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 h-[85vh]">
          {/* Left: Photo (65%) */}
          <div className="md:col-span-8 bg-black flex items-center justify-center relative">
            <img 
              src={currentPhoto.imageUrl} 
              alt={currentPhoto.description} 
              className="max-h-full max-w-full object-contain transition-all duration-300"
            />
            
            {/* Navigation arrows with improved visibility */}
            {hasPrev && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-sm transition-all"
                onClick={handlePrevImage}
              >
                <ArrowLeft className="h-6 w-6 text-white hover:text-gray-800" />
              </Button>
            )}
            
            {hasNext && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/30 text-white rounded-full h-10 w-10 flex items-center justify-center backdrop-blur-sm transition-all"
                onClick={handleNextImage}
              >
                <ArrowRight className="h-6 w-6 text-white hover:text-gray-800" />
              </Button>
            )}
          </div>
          
          {/* Right: Details, comments (35%) */}
          <div className="md:col-span-4 flex flex-col h-full">
            {/* User info */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar
                  size={36}
                  name={currentPhoto.username}
                  variant="marble"
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />
                <div>
                  <p className="font-medium">{currentPhoto.username}</p>
                  <p className="text-xs text-gray-500">{currentPhoto.uploadDate}</p>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="p-4 pt-0">
              <p className="text-sm">{currentPhoto.description}</p>
            </div>
            
            <Separator />
            
            {/* Emoji reactions */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-gray-500">Reactions ({totalReactions})</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {emojis.map((reaction) => (
                  <Button
                    key={reaction.emoji}
                    variant="outline"
                    size="sm"
                    className="rounded-full px-3 py-1 h-8 text-xs flex items-center gap-1"
                    onClick={() => onReaction(currentPhoto.id, reaction.emoji)}
                  >
                    <span>{reaction.emoji}</span>
                    <span className="text-gray-500">{reaction.count}</span>
                  </Button>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Comments */}
            <div className="flex-1 overflow-y-auto p-4">
              <h4 className="font-medium mb-3">Comments</h4>
              {currentPhoto.comments.length > 0 ? (
                <ul className="space-y-3">
                  {currentPhoto.comments.map((comment) => (
                    <li key={comment.id} className="flex gap-2">
                      <Avatar
                        size={28}
                        name={comment.username}
                        variant="marble"
                        colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <p className="font-medium text-sm">{comment.username}</p>
                          <span className="text-xs text-gray-400">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400">No comments yet</p>
              )}
            </div>
            
            {/* Add comment */}
            <div className="p-4 bg-gray-50">
              <form onSubmit={handleCommentSubmit} className="flex gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!newComment.trim()}>
                  <Send size={18} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
