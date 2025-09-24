import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, FileText, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Task {
  id: string;
  label: string;
  completed: boolean;
  dueDate?: string;
  assignedTo?: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
  type: 'redirect' | 'agreement' | 'upload' | 'simple';
  redirectUrl?: string;
}

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onTaskComplete: (taskId: string) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onTaskComplete
}) => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [assignedUser, setAssignedUser] = useState("");
  const [signature, setSignature] = useState("");

  if (!task) return null;

  const handleSubmit = () => {
    if (task.type === 'redirect' && task.redirectUrl) {
      onClose();
      navigate(task.redirectUrl);
      return;
    }
    
    onTaskComplete(task.id);
    onClose();
  };

  const renderModalContent = () => {
    switch (task.type) {
      case 'redirect':
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              You will be redirected to complete this task.
            </p>
            <Button onClick={handleSubmit} className="w-full">
              Continue to {task.label}
            </Button>
          </div>
        );

      case 'agreement':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Booth Agreement Terms</h4>
              <p className="text-sm text-muted-foreground">
                Please review and sign the booth agreement. This includes terms for booth setup, 
                breakdown, equipment usage, and event guidelines. Your signature indicates 
                acceptance of all terms and conditions.
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium">Upload Signed Agreement</label>
              <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drop your file here
                </p>
                <p className="text-xs text-muted-foreground">PDF or DOC format</p>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Digital Signature</label>
              <Input
                placeholder="Type your full name as signature"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                className="mt-2"
              />
            </div>


            <Button 
              onClick={handleSubmit} 
              className="w-full" 
              disabled={!file || !signature}
            >
              Submit Agreement
            </Button>
          </div>
        );

      case 'upload':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Upload Requirements</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• High resolution (300 DPI minimum)</li>
                <li>• Dimensions: 10ft x 8ft (3048 x 2438 pixels)</li>
                <li>• Formats: PNG, JPG, or PDF</li>
                <li>• File size: Maximum 50MB</li>
              </ul>
            </div>
            
            <div>
              <label className="text-sm font-medium">Upload Files</label>
              <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drop your files here
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG, or PDF (max 50MB)</p>
                <Input
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  multiple
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="mt-2"
                />
              </div>
            </div>


            <Button 
              onClick={handleSubmit} 
              className="w-full" 
              disabled={!file}
            >
              Upload Files
            </Button>
          </div>
        );

      case 'simple':
      default:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Mark this task as complete when finished.
            </p>
            <Button onClick={handleSubmit} className="w-full">
              Mark Complete
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {task.label}
          </DialogTitle>
          {task.dueDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Due: {task.dueDate}
            </div>
          )}
        </DialogHeader>
        
        {renderModalContent()}
      </DialogContent>
    </Dialog>
  );
};