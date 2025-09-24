
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRightCircle, UserPlus, Mail, Users } from "lucide-react";
import Avatar from "boring-avatars";

export const ActivateTeam: React.FC = () => {
  // Dummy team members data
  const teamMembers = [
    { name: "Sarah Connor", role: "Marketing", status: "active", avatar: "SC" },
    { name: "John Doe", role: "Sales", status: "pending", avatar: "JD" },
    { name: "Alex Kim", role: "Tech", status: "active", avatar: "AK" },
  ];

  return (
    <div className="w-full space-y-6">
      <Card className="bg-blue-50 border-sky-100 border flex w-full items-center gap-3 pl-3 pr-2 py-1.5 rounded-lg border-solid max-md:max-w-full">
        <div className="self-stretch flex min-w-60 gap-2 items-center flex-1 shrink basis-8 my-auto max-md:max-w-full">
          <AlertCircle className="h-[18px] w-[18px] text-blue-500" />
          <div className="min-w-60 text-sm text-slate-950 font-medium tracking-[-0.08px] leading-none flex-1 shrink basis-[0%] max-md:max-w-full">
            Activate Your Team Now
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="self-stretch flex min-h-8 items-center gap-2 text-sm text-blue-600 font-medium whitespace-nowrap tracking-[-0.08px] leading-none justify-center my-auto px-3 py-1 rounded-md"
        >
          <span className="self-stretch my-auto">Activate</span>
          <ArrowRightCircle className="h-4 w-4" />
        </Button>
      </Card>

      <Card className="border-slate-100 shadow-sm">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Team Management</h2>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Team Member
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-slate-100">
              <CardContent className="p-4">
                <h3 className="text-md font-medium mb-3 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-indigo-500" />
                  Active Team Members
                </h3>
                <div className="space-y-3">
                  {teamMembers.map((member, index) => (
                    member.status === "active" && (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-md">
                        <div className="flex items-center">
                          <div className="h-8 w-8 mr-3">
                            <Avatar
                              size={32}
                              name={member.name}
                              variant="marble"
                              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-slate-500">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100">
              <CardContent className="p-4">
                <h3 className="text-md font-medium mb-3 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-amber-500" />
                  Pending Invitations
                </h3>
                <div className="space-y-3">
                  {teamMembers.map((member, index) => (
                    member.status === "pending" && (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-md">
                        <div className="flex items-center">
                          <div className="h-8 w-8 mr-3">
                            <Avatar
                              size={32}
                              name={member.name}
                              variant="marble"
                              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-slate-500">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs">Resend</Button>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                            Pending
                          </span>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-100">
            <h3 className="text-sm font-medium mb-2">Quick Tips</h3>
            <ul className="text-xs space-y-1 text-slate-600">
              <li className="flex items-start">
                <span className="inline-block h-1 w-1 rounded-full bg-slate-500 mt-1.5 mr-2"></span>
                Assign roles to control what your team members can access
              </li>
              <li className="flex items-start">
                <span className="inline-block h-1 w-1 rounded-full bg-slate-500 mt-1.5 mr-2"></span>
                Team members will receive email notifications for meetings
              </li>
              <li className="flex items-start">
                <span className="inline-block h-1 w-1 rounded-full bg-slate-500 mt-1.5 mr-2"></span>
                Export your team's connections after the event
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
