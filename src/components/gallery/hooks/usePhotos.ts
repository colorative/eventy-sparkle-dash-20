
import { useState, useMemo } from "react";
import { Photo } from "../PhotoGrid";
import { v4 as uuidv4 } from "uuid";

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const handleLikePhoto = (id: string) => {
    setPhotos(photos.map(photo => 
      photo.id === id 
        ? { ...photo, likes: photo.likes > 0 ? photo.likes - 1 : photo.likes + 1 }
        : photo
    ));
  };

  const handleAddComment = (photoId: string, comment: string) => {
    const newComment = {
      id: uuidv4(),
      username: "current_user",
      content: comment,
      timestamp: "Just now"
    };

    setPhotos(photos.map(photo => 
      photo.id === photoId 
        ? { ...photo, comments: [...photo.comments, newComment] }
        : photo
    ));
  };

  const handleUploadPhoto = (image: File, description: string) => {
    const imageUrl = URL.createObjectURL(image);
    
    const newPhoto: Photo = {
      id: uuidv4(),
      imageUrl,
      likes: 0,
      description,
      username: "current_user",
      uploadDate: "Just now",
      comments: []
    };

    setPhotos([newPhoto, ...photos]);
  };

  const sortPhotos = (photos: Photo[], sortBy: string) => {
    const photosCopy = [...photos];
    
    switch (sortBy) {
      case "most-liked":
        return photosCopy.sort((a, b) => b.likes - a.likes);
      case "recently-uploaded":
        return photosCopy.sort((a, b) => {
          return photos.indexOf(b) - photos.indexOf(a);
        });
      case "most-commented":
        return photosCopy.sort((a, b) => b.comments.length - a.comments.length);
      case "oldest":
        return photosCopy.sort((a, b) => {
          return photos.indexOf(a) - photos.indexOf(b);
        });
      default:
        return photosCopy;
    }
  };

  return {
    photos,
    setPhotos,
    handleLikePhoto,
    handleAddComment,
    handleUploadPhoto,
    sortPhotos
  };
};
