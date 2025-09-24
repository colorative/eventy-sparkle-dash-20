
import React from "react";
import { PhotoCard } from "./PhotoCard";

export interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: string;
}

export interface Photo {
  id: string;
  imageUrl: string;
  likes: number;
  description: string;
  username: string;
  uploadDate: string;
  comments: Comment[];
}

interface PhotoGridProps {
  photos: Photo[];
  onLikeClick: (id: string) => void;
  onPhotoClick: (id: string) => void;
  sortBy: string;
  currentPage: number;
  allPhotos: Photo[];
}

export const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  onLikeClick,
  onPhotoClick,
  sortBy,
  currentPage,
  allPhotos,
}) => {
  // Determine which photos should show badges (top 3 when sorted by most liked and on first page only)
  const getTopPhotos = () => {
    if (sortBy === "most-liked" && currentPage === 1) {
      const sortedByLikes = [...allPhotos].sort((a, b) => b.likes - a.likes);
      return {
        first: sortedByLikes[0]?.id || null,
        second: sortedByLikes[1]?.id || null,
        third: sortedByLikes[2]?.id || null,
      };
    }
    return { first: null, second: null, third: null };
  };

  const topPhotos = getTopPhotos();

  const getBadgePosition = (photoId: string) => {
    if (photoId === topPhotos.first) return 1;
    if (photoId === topPhotos.second) return 2;
    if (photoId === topPhotos.third) return 3;
    return null;
  };

  const getBorderColor = (photoId: string) => {
    const position = getBadgePosition(photoId);
    if (position === 1) return "#FFA927";
    if (position === 2 || position === 3) return "#82655B";
    return "";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          id={photo.id}
          imageUrl={photo.imageUrl}
          likes={photo.likes}
          description={photo.description}
          username={photo.username}
          uploadDate={photo.uploadDate}
          commentsCount={photo.comments.length}
          onLikeClick={onLikeClick}
          onCardClick={onPhotoClick}
          badgePosition={getBadgePosition(photo.id)}
          borderColor={getBorderColor(photo.id)}
        />
      ))}
    </div>
  );
};
