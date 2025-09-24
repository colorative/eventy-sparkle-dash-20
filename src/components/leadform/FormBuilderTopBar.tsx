
import React from "react";
import { Button } from "@/components/ui/button";
import { X, Eye, Monitor, Tablet, Smartphone, Loader } from "lucide-react";

interface FormBuilderTopBarProps {
  onSave: () => void;
  onClose: () => void;
  onPreview: () => void;
  formTitle: string;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  isPreviewActive?: boolean;
  isSaving?: boolean;
}

export const FormBuilderTopBar = ({ 
  onSave, 
  onClose, 
  onPreview, 
  formTitle, 
  previewMode, 
  setPreviewMode,
  isPreviewActive = false,
  isSaving = false
}: FormBuilderTopBarProps) => {
  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-semibold">{formTitle}.tsx</h1>
      </div>

      <div className="flex items-center gap-8">
        {/* Responsive Preview Icons */}
        <div className="flex items-center gap-1 border rounded-md bg-gray-50">
          <Button 
            variant={previewMode === 'desktop' ? 'default' : 'ghost'} 
            size="sm" 
            className="px-3 h-8"
            onClick={() => setPreviewMode('desktop')}
          >
            <Monitor className="h-4 w-4" />
          </Button>
          <Button 
            variant={previewMode === 'tablet' ? 'default' : 'ghost'} 
            size="sm" 
            className="px-3 h-8"
            onClick={() => setPreviewMode('tablet')}
          >
            <Tablet className="h-4 w-4" />
          </Button>
          <Button 
            variant={previewMode === 'mobile' ? 'default' : 'ghost'} 
            size="sm" 
            className="px-3 h-8"
            onClick={() => setPreviewMode('mobile')}
          >
            <Smartphone className="h-4 w-4" />
          </Button>
        </div>

        <Button 
          variant={isPreviewActive ? "default" : "outline"} 
          className="flex items-center gap-2" 
          onClick={onPreview}
        >
          <Eye className="h-4 w-4" />
          {isPreviewActive ? 'Exit Preview' : 'Preview'}
        </Button>

        <Button 
          onClick={onSave} 
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save'
          )}
        </Button>
      </div>
    </div>
  );
};
