
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar, 
  Mic, 
  Users, 
  Building2, 
  MessagesSquare, 
  Map, 
  Camera, 
  Newspaper, 
  Trophy, 
  ClipboardList, 
  BookOpen, 
  StickyNote,
  MessageCircle,
  Video,
  Bookmark,
  ExternalLink,
  Bell,
  Mail,
  Settings2,
  Palette,
  Image as ImageIcon
} from "lucide-react";

export interface QuicklinkSettings {
  layout: "list" | "2-column" | "3-column" | "4-column" | "6-column";
  showLabels: boolean;
  displayMode: "icon-with-title" | "only-icon" | "only-title" | "background-image";
  customizations: {
    [key: string]: {
      backgroundColor?: string;
      backgroundImage?: string;
      iconName?: string;
    };
  };
}

interface QuicklinksSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: QuicklinkSettings;
  onSettingsChange: (settings: QuicklinkSettings) => void;
  quicklinks: Array<{
    title: string;
    icon: React.ReactNode;
    path: string;
  }>;
}

const availableIcons = {
  Calendar, Mic, Users, Building2, MessagesSquare, Map, Camera,
  Newspaper, Trophy, ClipboardList, BookOpen, StickyNote,
  MessageCircle, Video, Bookmark, ExternalLink, Bell, Mail,
  Settings2, Palette, ImageIcon
};

const iconNames = Object.keys(availableIcons);

const presetColors = [
  "#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", 
  "#06b6d4", "#f97316", "#84cc16", "#ec4899", "#6366f1"
];

export const QuicklinksSettingsModal: React.FC<QuicklinksSettingsModalProps> = ({
  open,
  onOpenChange,
  settings,
  onSettingsChange,
  quicklinks
}) => {
  const [tempSettings, setTempSettings] = useState<QuicklinkSettings>(settings);
  const [selectedQuicklink, setSelectedQuicklink] = useState<string>("");

  const handleSave = () => {
    onSettingsChange(tempSettings);
    onOpenChange(false);
  };

  const handleCustomizationChange = (title: string, key: string, value: string) => {
    setTempSettings(prev => ({
      ...prev,
      customizations: {
        ...prev.customizations,
        [title]: {
          ...prev.customizations[title],
          [key]: value
        }
      }
    }));
  };

  const renderIconOption = (iconName: string) => {
    const IconComponent = availableIcons[iconName as keyof typeof availableIcons];
    return (
      <div
        key={iconName}
        className="flex items-center justify-center p-2 border rounded cursor-pointer hover:bg-gray-50"
        onClick={() => handleCustomizationChange(selectedQuicklink, "iconName", iconName)}
      >
        <IconComponent className="h-4 w-4" />
      </div>
    );
  };

  const shouldShowIconCustomization = tempSettings.displayMode === "icon-with-title" || tempSettings.displayMode === "only-icon";
  const shouldShowTitleCustomization = tempSettings.displayMode === "icon-with-title" || tempSettings.displayMode === "only-title";
  const shouldShowBackgroundCustomization = tempSettings.displayMode === "background-image";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Quick Links Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="layout" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="customize">Customize Items</TabsTrigger>
          </TabsList>

          <TabsContent value="layout" className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">Grid Layout</Label>
              <RadioGroup
                value={tempSettings.layout}
                onValueChange={(value) => setTempSettings(prev => ({ ...prev, layout: value as any }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="list" id="list" />
                  <Label htmlFor="list">List View (Single Column)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2-column" id="2-column" />
                  <Label htmlFor="2-column">2 Columns</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3-column" id="3-column" />
                  <Label htmlFor="3-column">3 Columns (Default)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4-column" id="4-column" />
                  <Label htmlFor="4-column">4 Columns</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6-column" id="6-column" />
                  <Label htmlFor="6-column">6 Columns</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Display Quick Links as</Label>
              <Select
                value={tempSettings.displayMode}
                onValueChange={(value) => setTempSettings(prev => ({ ...prev, displayMode: value as any }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select display mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="icon-with-title">Icon with Title</SelectItem>
                  <SelectItem value="only-icon">Only Icon</SelectItem>
                  <SelectItem value="only-title">Only Title</SelectItem>
                  <SelectItem value="background-image">Background Image</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-labels" className="text-base font-medium">
                Show Labels
              </Label>
              <Switch
                id="show-labels"
                checked={tempSettings.showLabels}
                onCheckedChange={(checked) => setTempSettings(prev => ({ ...prev, showLabels: checked }))}
              />
            </div>
          </TabsContent>

          <TabsContent value="customize" className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">Select Item to Customize</Label>
              <div className="grid grid-cols-2 gap-2">
                {quicklinks.map((link) => (
                  <Button
                    key={link.title}
                    variant={selectedQuicklink === link.title ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSelectedQuicklink(link.title)}
                  >
                    {link.icon}
                    <span className="ml-2">{link.title}</span>
                  </Button>
                ))}
              </div>
            </div>

            {selectedQuicklink && (
              <Card className="p-4 space-y-4">
                <h3 className="font-medium">Customizing: {selectedQuicklink}</h3>
                
                {/* Icon Selection - Show only for icon-with-title and only-icon modes */}
                {shouldShowIconCustomization && (
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <div className="grid grid-cols-10 gap-2 max-h-32 overflow-y-auto">
                      {iconNames.map(renderIconOption)}
                    </div>
                  </div>
                )}

                {/* Background Color - Show for all modes except background-image */}
                {!shouldShowBackgroundCustomization && (
                  <div className="space-y-2">
                    <Label>Background Color</Label>
                    <div className="flex gap-2 flex-wrap">
                      {presetColors.map((color) => (
                        <div
                          key={color}
                          className="w-8 h-8 rounded cursor-pointer border-2 border-gray-200"
                          style={{ backgroundColor: color }}
                          onClick={() => handleCustomizationChange(selectedQuicklink, "backgroundColor", color)}
                        />
                      ))}
                      <Input
                        type="color"
                        className="w-8 h-8 p-0 border-2"
                        value={tempSettings.customizations[selectedQuicklink]?.backgroundColor || "#ffffff"}
                        onChange={(e) => handleCustomizationChange(selectedQuicklink, "backgroundColor", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Background Image - Show for background-image mode or as additional option for others */}
                {(shouldShowBackgroundCustomization || !shouldShowBackgroundCustomization) && (
                  <div className="space-y-2">
                    <Label>Background Image URL</Label>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={tempSettings.customizations[selectedQuicklink]?.backgroundImage || ""}
                      onChange={(e) => handleCustomizationChange(selectedQuicklink, "backgroundImage", e.target.value)}
                    />
                  </div>
                )}
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
