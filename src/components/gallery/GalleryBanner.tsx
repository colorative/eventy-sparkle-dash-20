
import React from "react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Upload } from "lucide-react";

interface GalleryBannerProps {
  onUploadClick: () => void;
}

export const GalleryBanner: React.FC<GalleryBannerProps> = ({
  onUploadClick
}) => {
  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow-md mb-6 pr-8">
      <div className="flex items-stretch h-30">
        <div className="flex-shrink-0 overflow-hidden">
          <img 
            alt="Photo Contest" 
            className="h-30 w-auto object-cover" 
            src="/lovable-uploads/97a309bb-ac75-4c60-a3ef-47ffc234efa7.png" 
          />
        </div>
        <div className="flex-1 px-4 py-5 flex items-center justify-between">
          <div className="text-left -ml-24">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Photo Contest</h2>
            <p className="text-sm text-gray-600">Submit your event photos and win exciting prizes!</p>
          </div>
          <div className="flex-shrink-0 ml-4">
            <RainbowButton onClick={onUploadClick} className="flex items-center gap-1.5 text-sm">
              <Upload size={16} />
              Upload Photo
            </RainbowButton>
          </div>
        </div>
      </div>
    </div>
  );
};
