
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import BoringAvatar from "boring-avatars";
import { HorizontalScroller } from "@/components/ui/horizontal-scroller";

export const SuggestedContactsSection: React.FC = () => {
  const navigate = useNavigate();
  
  const contacts = [
    {
      name: "Harvey Mcdaniel",
      company: "Startupcon",
      avatar: "Harvey Mcdaniel"
    },
    {
      name: "Eduardo Richards", 
      company: "CloudCamp",
      avatar: "Eduardo Richards"
    },
    {
      name: "Mitchell Fitzgerald",
      company: "Audiotrix", 
      avatar: "Mitchell Fitzgerald"
    },
    {
      name: "Sarah Wilson",
      company: "TechFlow",
      avatar: "Sarah Wilson"
    },
    {
      name: "Marcus Johnson",
      company: "DataSync",
      avatar: "Marcus Johnson"
    },
    {
      name: "Elena Rodriguez",
      company: "AI Labs",
      avatar: "Elena Rodriguez"
    },
    {
      name: "Kevin Park",
      company: "CloudTech",
      avatar: "Kevin Park"
    },
    {
      name: "Diana Chen",
      company: "NextGen",
      avatar: "Diana Chen"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Suggested Contacts</h2>
        <Button 
          variant="ghost" 
          onClick={() => navigate('/attendees')}
          className="text-blue-600 hover:text-blue-700"
        >
          View All
        </Button>
      </div>
      <HorizontalScroller>
        {contacts.map((contact, index) => (
          <Card key={index} className="flex-shrink-0 w-48">
            <CardContent className="p-4 text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                <BoringAvatar
                  size={64}
                  name={contact.avatar}
                  variant="marble"
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />
              </div>
              <h3 className="font-medium text-sm text-slate-900 dark:text-white mb-1">
                {contact.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                {contact.company}
              </p>
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                👋 Say Hi
              </Button>
            </CardContent>
          </Card>
        ))}
      </HorizontalScroller>
    </div>
  );
};
