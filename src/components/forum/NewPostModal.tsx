
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface NewPostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({ open, onOpenChange }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // In a real app, this would send data to backend
    console.log("Creating post:", { title, description });
    onOpenChange(false);
    // Reset form
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="post-title">Post Title</Label>
            <Input
              id="post-title"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="post-description">Post Description</Label>
            <Textarea
              id="post-description"
              placeholder="Write your post content..."
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title || !description}>
            Create Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
