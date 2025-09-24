
import React, { useState, useMemo } from "react";
import { GalleryTabs } from "./GalleryTabs";
import { GalleryBanner } from "./GalleryBanner";
import { PhotoGrid, Photo } from "./PhotoGrid";
import { PhotoDetailsDialog } from "./PhotoDetailsDialog";
import { UploadPhotoDialog } from "./UploadPhotoDialog";
import { toast } from "sonner";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { usePhotos } from "./hooks/usePhotos";
import { photosWithComments } from "./data/samplePhotos";

export const GalleryContent = () => {
  const {
    photos,
    setPhotos,
    handleLikePhoto,
    handleAddComment,
    handleUploadPhoto,
    sortPhotos
  } = usePhotos();

  // Initialize photos
  React.useEffect(() => {
    setPhotos(photosWithComments);
  }, [setPhotos]);

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("most-liked");
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 12;
  
  // Sort photos based on selected criteria
  const sortedPhotos = useMemo(() => {
    return sortPhotos(photos, sortBy);
  }, [photos, sortBy, sortPhotos]);
  
  // Calculate paginated photos
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = sortedPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const totalPages = Math.ceil(sortedPhotos.length / photosPerPage);

  const handlePhotoClick = (id: string) => {
    const photo = photos.find(p => p.id === id);
    if (photo) {
      setSelectedPhoto(photo);
      setIsDetailsOpen(true);
    }
  };

  const handleAddCommentWithToast = (photoId: string, comment: string) => {
    handleAddComment(photoId, comment);
    
    // Also update the selected photo if it's the one being commented on
    if (selectedPhoto && selectedPhoto.id === photoId) {
      const newComment = {
        id: crypto.randomUUID(),
        username: "current_user",
        content: comment,
        timestamp: "Just now"
      };
      setSelectedPhoto({
        ...selectedPhoto,
        comments: [...selectedPhoto.comments, newComment]
      });
    }

    toast.success("Comment added");
  };

  const handleAddReaction = (photoId: string, emoji: string) => {
    toast.success(`Added ${emoji} reaction`);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleUploadPhotoWithToast = (image: File, description: string) => {
    handleUploadPhoto(image, description);
    setIsUploadOpen(false);
    toast.success("Photo uploaded successfully");
  };

  const handleLikePhotoWithToast = (id: string) => {
    handleLikePhoto(id);
    toast.success("Added to favorites");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-4 py-6 md:px-6 space-y-6">
      <GalleryBanner onUploadClick={() => setIsUploadOpen(true)} />
      <GalleryTabs 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
      <PhotoGrid 
        photos={currentPhotos}
        onLikeClick={handleLikePhotoWithToast}
        onPhotoClick={handlePhotoClick}
        sortBy={sortBy}
        currentPage={currentPage}
        allPhotos={sortedPhotos}
      />
      
      {/* Pagination */}
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} 
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink 
                onClick={() => handlePageChange(page)} 
                isActive={page === currentPage}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} 
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      <PhotoDetailsDialog
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        photo={selectedPhoto}
        onLike={handleLikePhotoWithToast}
        onAddComment={handleAddCommentWithToast}
        onReaction={handleAddReaction}
        photos={photos}
      />
      <UploadPhotoDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onUpload={handleUploadPhotoWithToast}
      />
    </div>
  );
};
