
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { ShareModal } from "./ShareModal";

interface BannerGeneratorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const templateImages = [
  "https://colorative.sirv.com/Image.png",
  "https://colorative.sirv.com/Image-1.png",
  "https://colorative.sirv.com/Image-3.png",
  "https://colorative.sirv.com/Image-2.png",
];

const templates = [
  { id: 1, name: "Template 1", image: templateImages[0] },
  { id: 2, name: "Template 2", image: templateImages[1] },
  { id: 3, name: "Template 3", image: templateImages[2] },
  { id: 4, name: "Template 4", image: templateImages[3] },
  { id: 5, name: "Template 5", image: templateImages[0] },
  { id: 6, name: "Template 6", image: templateImages[1] },
];

export const BannerGeneratorModal: React.FC<BannerGeneratorModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [showName, setShowName] = useState(true);
  const [showDesignation, setShowDesignation] = useState(false);
  const [showProfilePicture, setShowProfilePicture] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl w-full h-[80vh] overflow-hidden p-0 gap-0">
          <DialogHeader className="p-4 pb-3 border-b">
            <DialogTitle className="text-lg font-medium">Create Your Event Banner</DialogTitle>
          </DialogHeader>
          
          <div className="flex h-full">
            {/* Left Panel - Templates */}
            <div className="w-40 border-r bg-gray-50 dark:bg-gray-800 p-3">
              <h3 className="text-sm font-medium mb-3 text-gray-900 dark:text-white">
                Templates
              </h3>
              <div 
                className="space-y-2 overflow-y-auto pr-1 scrollbar-hide"
                style={{
                  maxHeight: 'calc(80vh - 120px)',
                }}
              >
                {templates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all border ${
                      selectedTemplate === template.id 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-200 hover:border-gray-300'
                    } p-2`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="aspect-square bg-gray-300 rounded-sm mb-1 overflow-hidden">
                      <img 
                        src={template.image} 
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedTemplate === template.id && (
                      <p className="text-xs text-center text-blue-600 dark:text-blue-400 font-medium">Selected</p>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Right Panel - Preview and Controls */}
            <div className="flex-1 flex">
              {/* Preview Area */}
              <div className="flex-1 p-4 flex items-center justify-center">
                <div className="aspect-square w-96 bg-gray-300 rounded shadow-md overflow-hidden">
                  {selectedTemplateData && (
                    <img 
                      src={selectedTemplateData.image} 
                      alt={selectedTemplateData.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Customize Panel */}
              <div className="w-56 border-l bg-white dark:bg-gray-900 p-4 flex flex-col h-full">
                <h3 className="text-sm font-medium mb-4 text-gray-900 dark:text-white">
                  Customize Elements
                </h3>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-900 dark:text-white">
                      Show Name
                    </label>
                    <Switch 
                      checked={showName}
                      onCheckedChange={setShowName}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-900 dark:text-white">
                      Show Designation
                    </label>
                    <Switch 
                      checked={showDesignation}
                      onCheckedChange={setShowDesignation}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-900 dark:text-white">
                      Show Profile Picture
                    </label>
                    <Switch 
                      checked={showProfilePicture}
                      onCheckedChange={setShowProfilePicture}
                    />
                  </div>
                </div>

                {/* Action Buttons - Always at bottom */}
                <div className="space-y-2 mt-auto pt-4">
                  <Button 
                    variant="outline" 
                    className="w-full h-9 text-sm"
                  >
                    Download
                  </Button>
                  <Button 
                    className="w-full h-9 text-sm bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowShareModal(true)}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ShareModal 
        open={showShareModal}
        onOpenChange={setShowShareModal}
        imageUrl={selectedTemplateData?.image || ""}
      />
    </>
  );
};
