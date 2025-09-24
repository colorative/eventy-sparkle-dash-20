
import React from "react";
import { FileText, Paperclip, Link } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

interface GuideProps {
  guide: {
    id: string;
    type: "text" | "attachment" | "webview";
    title: string;
    category: string;
    content?: string;
    attachmentUrl?: string;
    webUrl?: string;
    iconColor?: string;
  };
  onClick: () => void;
}

export const GuideList: React.FC<GuideProps> = ({ guide, onClick }) => {
  const renderGuideIcon = (type: string, colorClass: string = "") => {
    const iconClass = `h-5 w-5 ${colorClass}`;
    
    switch(type) {
      case "text":
        return <FileText className={iconClass} />;
      case "attachment":
        return <Paperclip className={iconClass} />;
      case "webview":
        return <Link className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <Card 
      key={guide.id} 
      className="overflow-hidden hover:shadow-md transition-all cursor-pointer mb-2"
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 border border-gray-200 rounded-md flex items-center justify-center bg-gray-50 mr-4">
            {renderGuideIcon(guide.type, guide.iconColor)}
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 line-clamp-1">{guide.title}</h3>
          </div>
          <div className="ml-2">
            {guide.type === "attachment" && (
              <Button variant="ghost" size="sm" className="text-xs text-green-600 hover:text-green-700 px-4 py-1 h-8 hover:bg-green-50">
                Download
              </Button>
            )}
            {guide.type === "webview" && (
              <Button variant="ghost" size="sm" className="text-xs text-blue-600 hover:text-blue-700 px-4 py-1 h-8 hover:bg-blue-50">
                Open Link
              </Button>
            )}
            {guide.type === "text" && (
              <Button variant="ghost" size="sm" className="text-xs text-indigo-600 hover:text-indigo-700 px-4 py-1 h-8 hover:bg-indigo-50">
                Read More
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
