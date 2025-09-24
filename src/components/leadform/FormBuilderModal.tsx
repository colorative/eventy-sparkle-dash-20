import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FormBuilderSidebar } from "./FormBuilderSidebar";
import { FormCanvas } from "./FormCanvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { FormBuilderTopBar } from "./FormBuilderTopBar";
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, closestCorners, DragOverEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { toast } from "sonner";

interface FormBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  onSave: (formData: any) => void;
}

export const FormBuilderModal = ({ isOpen, onClose, formData, onSave }: FormBuilderModalProps) => {
  const [currentFormData, setCurrentFormData] = useState(formData);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [draggedComponent, setDraggedComponent] = useState<any>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPreviewActive, setIsPreviewActive] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [dragOverCanvasId, setDragOverCanvasId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const dragData = active.data.current;
    setDraggedComponent(dragData);
    
    console.log('Drag started:', dragData);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    
    if (over && over.id === "canvas") {
      setDragOverCanvasId("canvas");
    } else {
      setDragOverCanvasId(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    console.log('Drag ended:', { active: active.id, over: over?.id, dragData: active.data.current });
    
    if (!over) {
      setDraggedComponent(null);
      setDragOverCanvasId(null);
      return;
    }

    // If dropping on canvas from sidebar (new component)
    if (over.id === "canvas" && active.data.current?.isFromSidebar) {
      const componentData = active.data.current;
      
      // Create new field with proper defaults
      const newField = {
        id: `field_${Date.now()}`,
        type: componentData?.type || "text",
        label: componentData?.label || "New Field",
        required: false,
        placeholder: componentData?.placeholder || "",
        helpText: componentData?.helpText || "",
        options: componentData?.options || [],
        ...componentData
      };

      console.log('Adding new field:', newField);

      setCurrentFormData((prev: any) => ({
        ...prev,
        fields: [...prev.fields, newField]
      }));

      toast.success(`${componentData?.label || 'Component'} added to form`);
    }
    // If reordering existing fields
    else if (over.id !== "canvas" && !active.data.current?.isFromSidebar) {
      const activeIndex = currentFormData.fields.findIndex((field: any) => field.id === active.id);
      const overIndex = currentFormData.fields.findIndex((field: any) => field.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        console.log('Reordering fields:', { activeIndex, overIndex });
        
        setCurrentFormData((prev: any) => ({
          ...prev,
          fields: arrayMove(prev.fields, activeIndex, overIndex)
        }));
      }
    }

    setDraggedComponent(null);
    setDragOverCanvasId(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate save
      onSave(currentFormData);
      toast.success('Form saved successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to save form');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    setIsPreviewActive(!isPreviewActive);
    toast.info(isPreviewActive ? 'Preview mode disabled' : 'Preview mode enabled');
  };

  const updateComponent = (componentId: string, updates: any) => {
    setCurrentFormData((prev: any) => ({
      ...prev,
      fields: prev.fields.map((field: any) => 
        field.id === componentId ? { ...field, ...updates } : field
      )
    }));
  };

  const deleteComponent = (componentId: string) => {
    setCurrentFormData((prev: any) => ({
      ...prev,
      fields: prev.fields.filter((field: any) => field.id !== componentId)
    }));
    setSelectedComponent(null);
    toast.success('Component deleted');
  };

  const fieldIds = currentFormData.fields.map((field: any) => field.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full max-h-full h-screen w-screen p-0 gap-0 m-0">
        <DndContext
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="h-full flex flex-col">
            <FormBuilderTopBar 
              onSave={handleSave}
              onClose={onClose}
              onPreview={handlePreview}
              formTitle={currentFormData.title}
              previewMode={previewMode}
              setPreviewMode={setPreviewMode}
              isPreviewActive={isPreviewActive}
              isSaving={isSaving}
            />
            
            {/* Scrollable container for the main content */}
            <div className="flex-1 flex overflow-hidden">
              <FormBuilderSidebar />
              
              <div className="flex-1 flex min-w-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto">
                  <SortableContext items={fieldIds} strategy={verticalListSortingStrategy}>
                    <FormCanvas 
                      formData={currentFormData}
                      selectedComponent={selectedComponent}
                      onSelectComponent={setSelectedComponent}
                      onUpdateComponent={updateComponent}
                      onDeleteComponent={deleteComponent}
                      previewMode={previewMode}
                      isPreviewActive={isPreviewActive}
                      isDragOverCanvas={dragOverCanvasId === "canvas"}
                    />
                  </SortableContext>
                </div>
                
                <div className="overflow-y-auto">
                  <PropertiesPanel 
                    selectedComponent={selectedComponent}
                    onUpdateComponent={updateComponent}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DragOverlay>
            {draggedComponent ? (
              <div className="bg-white border-2 border-blue-500 rounded-lg p-4 shadow-lg opacity-90 transform rotate-2">
                <div className="text-sm font-medium">{draggedComponent.label}</div>
                <div className="text-xs text-gray-500">{draggedComponent.description}</div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </DialogContent>
    </Dialog>
  );
};
