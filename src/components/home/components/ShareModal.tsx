
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Instagram, Link2, Download } from "lucide-react";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  open,
  onOpenChange,
  imageUrl,
}) => {
  const shareText = "Check out my event banner! #AISummit2026";
  const shareUrl = window.location.origin;

  const handleShare = (platform: string) => {
    let url = "";
    
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case "instagram":
        // Instagram doesn't support direct web sharing, so we'll copy the link
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert("Text copied to clipboard! You can paste it in your Instagram post.");
        return;
      default:
        break;
    }
    
    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "event-banner.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Share Your Banner</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Preview */}
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gray-300 rounded-lg overflow-hidden">
              {imageUrl && (
                <img 
                  src={imageUrl} 
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Share on Social Media
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 h-10"
                onClick={() => handleShare("facebook")}
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                Facebook
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 h-10"
                onClick={() => handleShare("twitter")}
              >
                <Twitter className="w-4 h-4 text-blue-400" />
                Twitter
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 h-10"
                onClick={() => handleShare("linkedin")}
              >
                <Linkedin className="w-4 h-4 text-blue-700" />
                LinkedIn
              </Button>
              
              <Button
                variant="outline"
                className="flex items-center gap-2 h-10"
                onClick={() => handleShare("instagram")}
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                Instagram
              </Button>
            </div>
          </div>

          {/* Additional Actions */}
          <div className="space-y-2 pt-2 border-t">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 h-10"
              onClick={copyLink}
            >
              <Link2 className="w-4 h-4" />
              Copy Link
            </Button>
            
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 h-10"
              onClick={downloadImage}
            >
              <Download className="w-4 h-4" />
              Download Image
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
