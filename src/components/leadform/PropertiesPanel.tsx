
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PropertiesPanelProps {
  selectedComponent: any;
  onUpdateComponent: (id: string, updates: any) => void;
}

export const PropertiesPanel = ({ selectedComponent, onUpdateComponent }: PropertiesPanelProps) => {
  if (!selectedComponent) {
    return (
      <div className="w-80 border-l bg-white p-6 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-lg mb-2">Select a component</div>
          <div className="text-sm">Select a component to configure its properties</div>
        </div>
      </div>
    );
  }

  const handleUpdate = (field: string, value: any) => {
    onUpdateComponent(selectedComponent.id, { [field]: value });
  };

  return (
    <div className="w-80 border-l bg-white">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Properties</h3>
        <p className="text-sm text-gray-500 mt-1">Configure component settings</p>
      </div>

      <ScrollArea className="h-full">
        <div className="p-4 space-y-6">
          {/* Basic Properties */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="label">Label</Label>
              <Input
                id="label"
                value={selectedComponent.label || ""}
                onChange={(e) => handleUpdate("label", e.target.value)}
                placeholder="Field label"
              />
            </div>

            <div>
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={selectedComponent.placeholder || ""}
                onChange={(e) => handleUpdate("placeholder", e.target.value)}
                placeholder="Placeholder text"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="required">Required</Label>
              <Switch
                id="required"
                checked={selectedComponent.required || false}
                onCheckedChange={(checked) => handleUpdate("required", checked)}
              />
            </div>
          </div>

          {/* Type-specific properties */}
          {(selectedComponent.type === "text" || selectedComponent.type === "email") && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="maxLength">Max Length</Label>
                <Input
                  id="maxLength"
                  type="number"
                  value={selectedComponent.maxLength || ""}
                  onChange={(e) => handleUpdate("maxLength", parseInt(e.target.value) || undefined)}
                  placeholder="Maximum characters"
                />
              </div>
            </div>
          )}

          {selectedComponent.type === "textarea" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="rows">Rows</Label>
                <Input
                  id="rows"
                  type="number"
                  value={selectedComponent.rows || 3}
                  onChange={(e) => handleUpdate("rows", parseInt(e.target.value) || 3)}
                  min="1"
                  max="10"
                />
              </div>

              <div>
                <Label htmlFor="maxLength">Max Length</Label>
                <Input
                  id="maxLength"
                  type="number"
                  value={selectedComponent.maxLength || ""}
                  onChange={(e) => handleUpdate("maxLength", parseInt(e.target.value) || undefined)}
                  placeholder="Maximum characters"
                />
              </div>
            </div>
          )}

          {selectedComponent.type === "number" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="min">Minimum Value</Label>
                <Input
                  id="min"
                  type="number"
                  value={selectedComponent.min || ""}
                  onChange={(e) => handleUpdate("min", parseInt(e.target.value) || undefined)}
                  placeholder="Minimum value"
                />
              </div>

              <div>
                <Label htmlFor="max">Maximum Value</Label>
                <Input
                  id="max"
                  type="number"
                  value={selectedComponent.max || ""}
                  onChange={(e) => handleUpdate("max", parseInt(e.target.value) || undefined)}
                  placeholder="Maximum value"
                />
              </div>

              <div>
                <Label htmlFor="step">Step</Label>
                <Input
                  id="step"
                  type="number"
                  value={selectedComponent.step || 1}
                  onChange={(e) => handleUpdate("step", parseInt(e.target.value) || 1)}
                  min="1"
                />
              </div>
            </div>
          )}

          {(selectedComponent.type === "select" || selectedComponent.type === "radio-group" || selectedComponent.type === "checkbox-group") && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="options">Options</Label>
                <Textarea
                  id="options"
                  value={selectedComponent.options?.join("\n") || "Option 1\nOption 2\nOption 3"}
                  onChange={(e) => handleUpdate("options", e.target.value.split("\n").filter(Boolean))}
                  placeholder="Enter each option on a new line"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">Enter each option on a new line</p>
              </div>
            </div>
          )}

          {selectedComponent.type === "file" && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="accept">Accepted File Types</Label>
                <Input
                  id="accept"
                  value={selectedComponent.accept || ""}
                  onChange={(e) => handleUpdate("accept", e.target.value)}
                  placeholder="e.g., .pdf,.doc,.jpg"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="multiple">Allow Multiple Files</Label>
                <Switch
                  id="multiple"
                  checked={selectedComponent.multiple || false}
                  onCheckedChange={(checked) => handleUpdate("multiple", checked)}
                />
              </div>
            </div>
          )}

          {/* Help Text */}
          <div>
            <Label htmlFor="helpText">Help Text</Label>
            <Textarea
              id="helpText"
              value={selectedComponent.helpText || ""}
              onChange={(e) => handleUpdate("helpText", e.target.value)}
              placeholder="Additional help text for this field"
              rows={2}
            />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
