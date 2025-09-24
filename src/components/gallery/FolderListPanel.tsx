
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FolderProps {
  name: string;
  count: number;
  isActive?: boolean;
  onClick: () => void;
}

const Folder: React.FC<FolderProps> = ({
  name,
  count,
  isActive = false,
  onClick
}) => {
  return (
    <div 
      className={`flex items-center p-2.5 mb-1 rounded-md cursor-pointer hover:bg-slate-100 ${isActive ? "bg-slate-100" : ""}`} 
      onClick={onClick}
    >
      <div className="flex items-center">
        <svg height="22" viewBox="0 0 64 64" width="22" xmlns="http://www.w3.org/2000/svg" className="mr-2.5 flex-shrink-0">
          <g>
            <path d="m59 10h-34.6a1 1 0 0 0 -.7808 1.625l4.4 5.5a4.973 4.973 0 0 0 3.9008 1.875h31.08a1 1 0 0 0 1-1v-3a5.0059 5.0059 0 0 0 -5-5z" fill="#ffb125"></path>
            <path d="m64 17h-32.08a2.9949 2.9949 0 0 1 -2.3385-1.1239l-5.0015-6.2521a6.9688 6.9688 0 0 0 -5.46-2.624h-14.12a5 5 0 0 0 -5 5v40a5 5 0 0 0 5 5h54a5 5 0 0 0 5-5z" fill="#fcd354"></path>
          </g>
        </svg>
        <div>
          <div className="font-medium text-sm">{name}</div>
          <div className="text-xs text-slate-500">{count} photos</div>
        </div>
      </div>
    </div>
  );
};

export const FolderListPanel: React.FC = () => {
  const [activeFolder, setActiveFolder] = React.useState("All");
  
  const folders = [
    { name: "All", count: 32 },
    { name: "Keynote Sessions", count: 8 },
    { name: "Networking", count: 12 },
    { name: "Product Demos", count: 5 },
    { name: "Evening Events", count: 7 },
    { name: "Workshops", count: 10 },
    { name: "Team Building", count: 6 },
    { name: "Panel Discussions", count: 9 },
    { name: "Award Ceremonies", count: 4 }
  ];

  return (
    <div className="flex min-w-60 w-[260px] h-full">
      <Card className="bg-white min-w-60 w-full rounded-lg h-full border-0 shadow-none">
        <CardContent className="p-4 h-full">
          <div className="mb-3">
            <h3 className="font-semibold text-base mb-0.5">Gallery Folders</h3>
            <p className="text-xs text-slate-500">Filter photos by folders</p>
          </div>
          
          <ScrollArea className="h-[calc(100%-3rem)]">
            <div className="space-y-0.5 pr-3">
              {folders.map(folder => (
                <Folder 
                  key={folder.name} 
                  name={folder.name} 
                  count={folder.count} 
                  isActive={activeFolder === folder.name} 
                  onClick={() => setActiveFolder(folder.name)} 
                />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
