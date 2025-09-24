import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BoringAvatar from "boring-avatars";
interface TeamMember {
  name: string;
  role: string;
  status: string;
  avatar: string;
}
interface TeamCardProps {
  teamMembers: TeamMember[];
}
export const TeamCard: React.FC<TeamCardProps> = ({
  teamMembers
}) => {
  const navigate = useNavigate();
  const activeMembers = teamMembers.filter(member => member.status === "active");
  return <Card className="h-full border-slate-200 dark:border-gray-700">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-lg font-semibold flex items-center dark:text-white">
            
            Team Representatives
          </h3>
        </div>
        
        <div className="space-y-3 flex-grow">
          {activeMembers.map((member, index) => <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-gray-750 rounded-md">
              <div className="flex items-center">
                <div className="h-8 w-8 mr-3">
                  <BoringAvatar size={32} name={member.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                </div>
                <div>
                  <p className="text-sm font-medium dark:text-white">{member.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{member.role}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Active
                </span>
              </div>
            </div>)}
          
          {activeMembers.length === 0 && <div className="text-center p-4">
              <p className="text-gray-500 dark:text-gray-400">No active team members</p>
            </div>}
        </div>
        
        <div className="pt-4 mt-auto">
          <Button className="w-full" variant="outline" onClick={() => navigate('/activate-team')}>
            Manage Team
          </Button>
        </div>
      </CardContent>
    </Card>;
};