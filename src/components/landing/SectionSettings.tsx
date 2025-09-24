import { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SectionSettingsProps {
  sectionVisibility: Record<string, boolean>;
  onSectionToggle: (sectionId: string, visible: boolean) => void;
}

export const SectionSettings = ({ sectionVisibility, onSectionToggle }: SectionSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sections = [
    { id: 'countdown', label: 'Countdown Timer' },
    { id: 'about', label: 'About Section' },
    { id: 'features', label: 'Event Features' },
    { id: 'speakers', label: 'Speakers' },
    { id: 'agenda', label: 'Agenda' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'sponsors', label: 'Sponsors' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
    { id: 'tickets', label: 'Tickets' },
    { id: 'whyattend', label: 'Why Should You Attend This Event?' },
    { id: 'news', label: 'News' },
    { id: 'location', label: 'Event Location' }
  ];

  return (
    <>
      {/* Floating Settings Button */}
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      >
        <Settings className="h-5 w-5" />
      </Button>

      {/* Settings Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50">
          <Card className="w-80 shadow-2xl border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg">Section Settings</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Toggle sections on or off to customize your landing page view.
              </p>
              {sections.map((section) => (
                <div key={section.id} className="flex items-center justify-between">
                  <Label htmlFor={section.id} className="text-sm font-medium">
                    {section.label}
                  </Label>
                  <Switch
                    id={section.id}
                    checked={sectionVisibility[section.id]}
                    onCheckedChange={(checked) => onSectionToggle(section.id, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};