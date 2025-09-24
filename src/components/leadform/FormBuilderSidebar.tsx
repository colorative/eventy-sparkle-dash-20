
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDraggable } from "@dnd-kit/core";
import { 
  Type, 
  TextIcon,
  Hash, 
  Mail, 
  Lock, 
  Upload, 
  Phone, 
  Link, 
  ChevronDown, 
  CheckSquare, 
  RadioIcon as Radio,
  ToggleLeft,
  Calendar,
  MousePointer,
  RotateCcw,
  Send,
  Github,
  Linkedin,
  Twitter,
  Instagram
} from "lucide-react";

const DraggableComponent = ({ id, type, label, icon: Icon, description }: any) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { type, label, description, isFromSidebar: true }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 1000,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-3 p-3 border rounded-lg cursor-grab hover:bg-gray-50 transition-colors select-none ${
        isDragging ? 'opacity-50 shadow-lg' : ''
      }`}
    >
      <Icon className="h-4 w-4 text-gray-500 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{label}</div>
        <div className="text-xs text-gray-500 truncate">{description}</div>
      </div>
    </div>
  );
};

export const FormBuilderSidebar = () => {
  const typographyComponents = [
    { id: "text-block", type: "text-block", label: "Text block", icon: Type, description: "WYSIWYG Editor" }
  ];

  const inputFields = [
    { id: "text", type: "text", label: "Text", icon: TextIcon, description: "Single line text input" },
    { id: "textarea", type: "textarea", label: "Text Area", icon: TextIcon, description: "Multi-line text input" },
    { id: "number", type: "number", label: "Number", icon: Hash, description: "Input field for numeric values" },
    { id: "email", type: "email", label: "Email", icon: Mail, description: "Input field for email addresses" },
    { id: "password", type: "password", label: "Password", icon: Lock, description: "Input field for passwords" },
    { id: "file", type: "file", label: "File upload", icon: Upload, description: "Input field for file uploads" },
    { id: "tel", type: "tel", label: "Telephone", icon: Phone, description: "Input field for telephone numbers" },
    { id: "url", type: "url", label: "URL", icon: Link, description: "Input field for URLs" }
  ];

  const selectionFields = [
    { id: "select", type: "select", label: "Select", icon: ChevronDown, description: "Dropdown select" },
    { id: "checkbox", type: "checkbox", label: "Checkbox", icon: CheckSquare, description: "Checkbox input" },
    { id: "checkbox-group", type: "checkbox-group", label: "Checkbox Group", icon: CheckSquare, description: "Group of checkboxes for multiple selections" },
    { id: "radio-group", type: "radio-group", label: "Radio Group", icon: Radio, description: "Group of radio buttons for single selection" }
  ];

  const switchesAndDates = [
    { id: "switch", type: "switch", label: "Switch", icon: ToggleLeft, description: "Toggle switch" },
    { id: "date", type: "date", label: "Date Picker", icon: Calendar, description: "Calendar date input" }
  ];

  const buttons = [
    { id: "button", type: "button", label: "Button", icon: MousePointer, description: "Generic button" },
    { id: "submit", type: "submit", label: "Submit", icon: Send, description: "Button to submit form" },
    { id: "reset", type: "reset", label: "Reset", icon: RotateCcw, description: "Button to clear all inputs" }
  ];

  return (
    <div className="w-80 border-r bg-gray-50 flex flex-col flex-shrink-0">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* Typography */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-700">Typography</h3>
            <div className="space-y-2">
              {typographyComponents.map((component) => (
                <DraggableComponent key={component.id} {...component} />
              ))}
            </div>
          </div>

          {/* Input Fields */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-700">Input Fields</h3>
            <div className="space-y-2">
              {inputFields.map((component) => (
                <DraggableComponent key={component.id} {...component} />
              ))}
            </div>
          </div>

          {/* Selection Fields */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-700">Selection Fields</h3>
            <div className="space-y-2">
              {selectionFields.map((component) => (
                <DraggableComponent key={component.id} {...component} />
              ))}
            </div>
          </div>

          {/* Switches & Dates */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-700">Switches & Dates</h3>
            <div className="space-y-2">
              {switchesAndDates.map((component) => (
                <DraggableComponent key={component.id} {...component} />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div>
            <h3 className="font-semibold text-sm mb-3 text-gray-700">Buttons</h3>
            <div className="space-y-2">
              {buttons.map((component) => (
                <DraggableComponent key={component.id} {...component} />
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer Icons */}
      <div className="p-4 border-t bg-white flex-shrink-0">
        <div className="flex justify-center gap-4">
          <Github className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
          <Linkedin className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
          <Twitter className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
          <Instagram className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
        </div>
      </div>
    </div>
  );
};
