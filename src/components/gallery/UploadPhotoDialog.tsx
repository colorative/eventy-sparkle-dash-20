
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface UploadPhotoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (image: File, description: string) => void;
}

export const UploadPhotoDialog: React.FC<UploadPhotoDialogProps> = ({
  open,
  onOpenChange,
  onUpload,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("All");
  const [step, setStep] = useState(1); // 1 for rules, 2 for upload form
  const { toast } = useToast();

  const folders = [
    { name: "All", count: 32 },
    { name: "Keynote Sessions", count: 8 },
    { name: "Networking", count: 12 },
    { name: "Product Demos", count: 5 },
    { name: "Evening Events", count: 7 },
    { name: "Workshops", count: 10 },
    { name: "Team Building", count: 6 },
    { name: "Panel Discussions", count: 9 },
    { name: "Award Ceremonies", count: 4 },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please select an image to upload",
        variant: "destructive",
      });
      return;
    }
    
    onUpload(selectedImage, description);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDescription("");
    setSelectedFolder("All");
    setStep(1);
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  const proceedToUpload = () => {
    setStep(2);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload a photo</DialogTitle>
          <DialogDescription>
            Share your event memories with others
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 ? (
          <div className="space-y-4 py-4">
            <div className="rounded-lg overflow-hidden mb-4">
              <img 
                src="https://hopeevent.eventify.io/p/e707c5f66d63d38225e80d060cc1fa0a.png" 
                alt="Photo Contest Banner" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Photo Upload Guidelines:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                <li>Photos must be related to the event</li>
                <li>Maximum file size: 10MB</li>
                <li>Supported formats: JPG, PNG, GIF</li>
                <li>No inappropriate or offensive content</li>
                <li>By uploading, you grant permission to share your photo</li>
              </ul>
            </div>
            
            <div className="mt-6">
              <Button onClick={proceedToUpload} className="w-full">
                Continue to Upload
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {!imagePreview ? (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer" onClick={() => document.getElementById("photo-upload")?.click()}>
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            ) : (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-64 mx-auto rounded-lg object-contain" 
                />
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="absolute top-0 right-0 rounded-full" 
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            <div className="space-y-3">
              <div className="space-y-2">
                <label htmlFor="folder-select" className="text-sm font-medium">
                  Select Folder
                </label>
                <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a folder" />
                  </SelectTrigger>
                  <SelectContent>
                    {folders.map((folder) => (
                      <SelectItem key={folder.name} value={folder.name}>
                        {folder.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Caption
                </label>
                <Textarea
                  id="description"
                  placeholder="Add a description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="resize-none"
                />
              </div>
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancel</Button>
          {step === 2 && (
            <Button onClick={handleSubmit}>Upload</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
