
import React, { useEffect, useRef } from "react";
import { useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SortableFieldProps {
  field: any;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  isPreviewActive: boolean;
}

const SortableField = ({ field, isSelected, onSelect, onDelete, isPreviewActive }: SortableFieldProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderField = () => {
    switch (field.type) {
      case "text-block":
        return (
          <div className="w-full p-4 border border-gray-200 rounded-md bg-gray-50">
            <div className="text-sm text-gray-600">Rich text content will appear here</div>
          </div>
        );
      case "textarea":
        return (
          <textarea 
            className="w-full p-3 border border-gray-300 rounded-md resize-none"
            rows={field.rows || 3}
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            value=""
            readOnly
          />
        );
      case "select":
        return (
          <select className="w-full p-3 border border-gray-300 rounded-md">
            <option>Select an option</option>
            {field.options?.map((option: string, idx: number) => (
              <option key={idx} value={option}>{option}</option>
            )) || <option>Option 1</option>}
          </select>
        );
      case "checkbox":
        return (
          <div className="flex items-center gap-3">
            <Checkbox id={field.id} />
            <label htmlFor={field.id} className="text-sm">
              {field.helpText || "I agree to the terms and conditions"}
            </label>
          </div>
        );
      case "checkbox-group":
        return (
          <div className="space-y-2">
            {(field.options || ["Option 1", "Option 2", "Option 3"]).map((option: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <Checkbox id={`${field.id}-${idx}`} />
                <label htmlFor={`${field.id}-${idx}`} className="text-sm">{option}</label>
              </div>
            ))}
          </div>
        );
      case "radio-group":
        return (
          <RadioGroup>
            {(field.options || ["Option 1", "Option 2", "Option 3"]).map((option: string, idx: number) => (
              <div key={idx} className="flex items-center gap-3">
                <RadioGroupItem value={option} id={`${field.id}-${idx}`} />
                <label htmlFor={`${field.id}-${idx}`} className="text-sm">{option}</label>
              </div>
            ))}
          </RadioGroup>
        );
      case "switch":
        return (
          <div className="flex items-center gap-3">
            <Switch id={field.id} />
            <label htmlFor={field.id} className="text-sm">
              {field.helpText || "Enable notifications"}
            </label>
          </div>
        );
      case "date":
        return (
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-md"
            readOnly
          />
        );
      case "file":
        return (
          <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-md bg-gray-50 text-center">
            <div className="text-gray-500">
              <p className="text-sm">Click to upload or drag and drop</p>
              <p className="text-xs mt-1">
                {field.accept || "PDF, DOC, JPG"} up to 10MB
              </p>
            </div>
          </div>
        );
      case "button":
      case "submit":
      case "reset":
        return (
          <Button 
            type={field.type === "submit" ? "submit" : field.type === "reset" ? "reset" : "button"}
            className="w-full"
          >
            {field.label}
          </Button>
        );
      default:
        return (
          <input
            type={field.type}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
            value=""
            readOnly
          />
        );
    }
  };

  if (isPreviewActive) {
    return (
      <div className="space-y-2">
        {field.type !== "button" && field.type !== "submit" && field.type !== "reset" && field.type !== "text-block" && (
          <label className="text-sm font-medium block">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {renderField()}
        {field.helpText && field.type !== "checkbox" && field.type !== "switch" && (
          <p className="text-xs text-gray-500">{field.helpText}</p>
        )}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group p-4 border-2 rounded-lg cursor-pointer transition-all ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onSelect}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab z-10"
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>

      <div className="space-y-2 pl-6">
        {field.type !== "button" && field.type !== "submit" && field.type !== "reset" && field.type !== "text-block" && (
          <label className="text-sm font-medium block">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        {renderField()}
        {field.helpText && field.type !== "checkbox" && field.type !== "switch" && (
          <p className="text-xs text-gray-500">{field.helpText}</p>
        )}
      </div>

      {/* Delete button */}
      {isSelected && !isPreviewActive && (
        <Button
          variant="destructive"
          size="sm"
          className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

interface FormCanvasProps {
  formData: any;
  selectedComponent: any;
  onSelectComponent: (component: any) => void;
  onUpdateComponent: (id: string, updates: any) => void;
  onDeleteComponent: (id: string) => void;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  isPreviewActive?: boolean;
  isDragOverCanvas?: boolean;
}

export const FormCanvas = ({ 
  formData, 
  selectedComponent, 
  onSelectComponent, 
  onUpdateComponent,
  onDeleteComponent,
  previewMode,
  isPreviewActive = false,
  isDragOverCanvas = false
}: FormCanvasProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas"
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced auto-scroll functionality during drag
  useEffect(() => {
    const handleDragScroll = (e: DragEvent) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const scrollZone = 80; // Increased scroll zone
      
      const mouseY = e.clientY - rect.top;
      const containerHeight = rect.height;

      // More responsive scrolling
      if (mouseY < scrollZone && mouseY > 0) {
        const scrollSpeed = Math.max(1, (scrollZone - mouseY) / 4);
        container.scrollTop -= scrollSpeed;
      } else if (mouseY > containerHeight - scrollZone && mouseY < containerHeight) {
        const scrollSpeed = Math.max(1, (mouseY - (containerHeight - scrollZone)) / 4);
        container.scrollTop += scrollSpeed;
      }
    };

    // Add multiple event listeners for better drag detection
    const events = ['drag', 'dragover'];
    events.forEach(event => {
      document.addEventListener(event, handleDragScroll);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleDragScroll);
      });
    };
  }, []);

  const getCanvasWidth = () => {
    switch (previewMode) {
      case 'mobile': return 'max-w-sm mx-auto';
      case 'tablet': return 'max-w-md mx-auto';
      default: return 'max-w-2xl mx-auto';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="flex-1 bg-gray-100 overflow-auto" 
      style={{
        backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }}
    >
      <div className="p-8 min-h-full">
        <div
          ref={setNodeRef}
          className={`w-full ${getCanvasWidth()} bg-white rounded-lg shadow-sm p-8 min-h-[600px] transition-all duration-300 ${
            (isOver || isDragOverCanvas) ? 'ring-2 ring-blue-500 ring-opacity-50 bg-blue-50' : ''
          }`}
        >
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">{formData.title}</h2>
              <p className="text-gray-600 text-sm">Fill out the form below</p>
            </div>

            {formData.fields.length === 0 ? (
              <div className={`text-center py-12 text-gray-500 border-2 border-dashed rounded-lg transition-colors ${
                (isOver || isDragOverCanvas) ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-300'
              }`}>
                <div className="text-lg mb-2">
                  {(isOver || isDragOverCanvas) ? 'Drop component here' : 'Drop components here'}
                </div>
                <div className="text-sm">
                  {(isOver || isDragOverCanvas) 
                    ? 'Release to add this component to your form' 
                    : 'Drag components from the sidebar to build your form'
                  }
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.fields.map((field: any) => (
                  <SortableField
                    key={field.id}
                    field={field}
                    isSelected={selectedComponent?.id === field.id}
                    onSelect={() => !isPreviewActive && onSelectComponent(field)}
                    onDelete={() => onDeleteComponent(field.id)}
                    isPreviewActive={isPreviewActive}
                  />
                ))}
                
                {/* Drop zone indicator for existing fields */}
                {(isOver || isDragOverCanvas) && (
                  <div className="text-center py-6 text-blue-500 border-2 border-dashed border-blue-500 rounded-lg bg-blue-50">
                    <div className="text-sm">Drop new component here</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
