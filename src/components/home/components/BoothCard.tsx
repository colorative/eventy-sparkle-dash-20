
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BoringAvatar from "boring-avatars";
import { MorphingPopover, MorphingPopoverTrigger, MorphingPopoverContent } from "@/components/ui/morphing-popover";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { BorderBeam } from "@/components/ui/border-beam";

interface TeamMember {
  name: string;
  role: string;
  status: string;
  avatar: string;
}
interface BoothDetails {
  boothNumber: string;
  location: string;
  size: string;
  representatives: number;
}
interface BoothCardProps {
  boothDetails: BoothDetails;
  teamMembers: TeamMember[];
  onGenerateQrCode: () => void;
}

export const BoothCard: React.FC<BoothCardProps> = ({
  boothDetails,
  teamMembers,
  onGenerateQrCode
}) => {
  const navigate = useNavigate();
  const [isQrHovered, setIsQrHovered] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const handleDownloadQr = () => {
    onGenerateQrCode();
    setIsQrModalOpen(false);
  };

  return (
    <Card className="h-full border-slate-200 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center dark:text-white">
            Your Booth
          </h3>
          <Badge variant="outline" className="px-3 py-1 bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-900 dark:text-indigo-300 dark:border-indigo-800">
            <TextShimmer 
              duration={3}
              className="text-sm font-medium [--base-color:theme(colors.indigo.600)] [--base-gradient-color:theme(colors.indigo.200)] dark:[--base-color:theme(colors.indigo.700)] dark:[--base-gradient-color:theme(colors.indigo.400)]"
            >
              {`Booth ${boothDetails.boothNumber}`}
            </TextShimmer>
          </Badge>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:max-w-[160px] flex items-center justify-center rounded-lg sm:w-1/3 flex-shrink-0">
            <div className="flex flex-col items-center space-y-2">
              <MorphingPopover open={isQrModalOpen} onOpenChange={setIsQrModalOpen}>
                <MorphingPopoverTrigger asChild>
                  <div 
                    className="relative cursor-pointer group"
                    onMouseEnter={() => setIsQrHovered(true)}
                    onMouseLeave={() => setIsQrHovered(false)}
                  >
                    <img src="https://scanapp.org/assets/github_assets/qr-code.png" alt="QR Code" className="h-32 w-32 rounded-lg" />
                    <div className={`absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center transition-opacity duration-300 ${isQrHovered ? 'opacity-100' : 'opacity-0'}`}>
                      <Eye className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </MorphingPopoverTrigger>
                <MorphingPopoverContent className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col items-center space-y-4">
                    <img src="https://scanapp.org/assets/github_assets/qr-code.png" alt="QR Code" className="h-48 w-48" />
                    <Button onClick={handleDownloadQr} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download QR Code
                    </Button>
                  </div>
                </MorphingPopoverContent>
              </MorphingPopover>
            </div>
          </div>
          
          <div className="space-y-4 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                <p className="font-medium dark:text-white">{boothDetails.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Size</p>
                <p className="font-medium dark:text-white">{boothDetails.size}</p>
              </div>
            </div>
            
            <div className="relative mt-2 rounded-lg border border-indigo-200 dark:border-indigo-800 p-4 bg-indigo-50/50 dark:bg-indigo-950/30 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors cursor-pointer" onClick={() => navigate('/exhibitors/eventify')}>
              <BorderBeam 
                size={250} 
                duration={12} 
                delay={0}
                anchor={0}
                colorFrom="#6366f1"
                colorTo="#8b5cf6"
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-indigo-600 h-10 w-10 rounded flex items-center justify-center text-white font-bold">
                    E
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">Eventify</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">AI-Powered Event Management</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-indigo-600 dark:text-indigo-400">
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
