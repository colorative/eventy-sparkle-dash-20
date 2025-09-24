import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Mail, Users, Search, Filter, Clock, Check, AtSign, Briefcase, Building, Smartphone, Plus, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import Avatar from "boring-avatars";
export const ActivateTeamContent: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState([{
    id: 1,
    name: "Sarah Connor",
    role: "Marketing",
    email: "sarah@example.com",
    status: "active",
    avatar: "SC",
    phone: "+1 (555) 123-4567",
    company: "Eventify",
    position: "Marketing Manager"
  }, {
    id: 2,
    name: "John Doe",
    role: "Sales",
    email: "john@example.com",
    status: "pending",
    avatar: "JD",
    phone: "+1 (555) 987-6543",
    company: "Eventify",
    position: "Sales Lead"
  }, {
    id: 3,
    name: "Alex Kim",
    role: "Tech",
    email: "alex@example.com",
    status: "active",
    avatar: "AK",
    phone: "+1 (555) 456-7890",
    company: "Eventify",
    position: "Technical Specialist"
  }]);
  const [newMemberDialogOpen, setNewMemberDialogOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
    position: "",
    phone: ""
  });
  const handleAddTeamMember = () => {
    if (!newMember.name || !newMember.email || !newMember.role) {
      toast({
        variant: "destructive",
        title: "Invalid input",
        description: "Please fill in all required fields (Name, Email, and Role)."
      });
      return;
    }
    const avatar = newMember.name.split(' ').map(name => name[0]).join('').toUpperCase();
    setTeamMembers([...teamMembers, {
      id: Date.now(),
      name: newMember.name,
      role: newMember.role,
      email: newMember.email,
      status: "pending",
      avatar,
      phone: newMember.phone,
      company: "Eventify",
      position: newMember.position
    }]);
    setNewMember({
      name: "",
      email: "",
      role: "",
      position: "",
      phone: ""
    });
    setNewMemberDialogOpen(false);
    toast({
      title: "Team member invited",
      description: `An invitation has been sent to ${newMember.email}.`
    });
  };
  const handleDeleteTeamMember = (id, name) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    toast({
      title: "Team member removed",
      description: `${name} has been removed from your team.`
    });
  };
  const handleResendInvitation = (id, name, email) => {
    toast({
      title: "Invitation resent",
      description: `The invitation to ${name} (${email}) has been resent.`
    });
  };
  return <div className="bg-white dark:bg-gray-900 flex min-w-60 flex-col overflow-auto items-stretch justify-start flex-1 shrink basis-[0%] p-6 max-md:max-w-full">
      <Card className="shadow-sm bg-white dark:bg-gray-800 w-full h-full overflow-auto flex-1 rounded-xl max-md:max-w-full border-0">
        <CardContent className="w-full h-full flex-1 p-6 max-md:max-w-full space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Team Management</h1>
              <p className="text-gray-500 dark:text-gray-400">Invite and manage your team members for AI Summit 2026</p>
            </div>
            
            <Dialog open={newMemberDialogOpen} onOpenChange={setNewMemberDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Team Member
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>
                    Invite a team member to join your booth and collaborate at AI Summit 2026.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name*
                    </Label>
                    <Input id="name" placeholder="Full Name" className="col-span-3" value={newMember.name} onChange={e => setNewMember({
                    ...newMember,
                    name: e.target.value
                  })} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email*
                    </Label>
                    <Input id="email" placeholder="email@company.com" className="col-span-3" value={newMember.email} onChange={e => setNewMember({
                    ...newMember,
                    email: e.target.value
                  })} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role*
                    </Label>
                    <Select value={newMember.role} onValueChange={value => setNewMember({
                    ...newMember,
                    role: value
                  })}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Sales">Sales</SelectItem>
                        <SelectItem value="Tech">Tech</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="position" className="text-right">
                      Position
                    </Label>
                    <Input id="position" placeholder="Job Title" className="col-span-3" value={newMember.position} onChange={e => setNewMember({
                    ...newMember,
                    position: e.target.value
                  })} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Phone
                    </Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" className="col-span-3" value={newMember.phone} onChange={e => setNewMember({
                    ...newMember,
                    phone: e.target.value
                  })} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewMemberDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddTeamMember}>Send Invitation</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex gap-4 flex-wrap mb-4">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Search team members" className="pl-9 border-gray-200 dark:border-gray-700" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Members</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="admins">Admins</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-8">
              <Card className="border-slate-100 dark:border-gray-700">
                <CardContent className="p-0">
                  <div className="rounded-md border dark:border-gray-700">
                    <div className="bg-slate-50 dark:bg-gray-800 px-6 py-4 grid grid-cols-6 font-medium border-b dark:border-gray-700">
                      <div className="col-span-2">Team Member</div>
                      <div className="hidden md:block">Role</div>
                      <div className="hidden md:block">Contact</div>
                      <div className="text-right">Status</div>
                      <div className="text-right">Actions</div>
                    </div>
                    
                    {teamMembers.map(member => <div key={member.id} className="px-6 py-4 grid grid-cols-6 items-center border-b last:border-0 dark:border-gray-700">
                        <div className="col-span-2 flex items-center gap-3">
                          <div className="h-10 w-10">
                            <Avatar size={40} name={member.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                          </div>
                          <div>
                            <div className="font-medium dark:text-white">{member.name}</div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">{member.position}</div>
                          </div>
                        </div>
                        
                        <div className="hidden md:block">
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                            {member.role}
                          </span>
                        </div>
                        
                        <div className="hidden md:block">
                          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                            <AtSign className="h-3 w-3 mr-1" />
                            {member.email}
                          </div>
                          {member.phone && <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-1">
                              <Smartphone className="h-3 w-3 mr-1" />
                              {member.phone}
                            </div>}
                        </div>
                        
                        <div className="text-right">
                          {member.status === "active" ? <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              <Check className="h-3 w-3 mr-1" />
                              Active
                            </span> : <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </span>}
                        </div>
                        
                        <div className="flex justify-end gap-2">
                          {member.status === "pending" && <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleResendInvitation(member.id, member.name, member.email)}>
                              Resend
                            </Button>}
                          <Button variant="outline" size="sm" className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 dark:border-red-800 dark:hover:bg-red-950 dark:text-red-400 dark:hover:text-red-300" onClick={() => handleDeleteTeamMember(member.id, member.name)}>
                            <X className="h-3 w-3 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
              
              
            </TabsContent>
            
            <TabsContent value="active">
              {/* Content for active tab */}
              <div className="grid grid-cols-1 gap-4">
                {teamMembers.filter(member => member.status === "active").map(member => <Card key={member.id}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10">
                          <Avatar size={40} name={member.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                        </div>
                        <div>
                          <div className="font-medium dark:text-white">{member.name}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">{member.position}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 text-red-600 hover:text-red-700">
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>
            
            <TabsContent value="pending">
              {/* Content for pending tab */}
              <div className="grid grid-cols-1 gap-4">
                {teamMembers.filter(member => member.status === "pending").map(member => <Card key={member.id}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10">
                          <Avatar size={40} name={member.name} variant="marble" colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]} />
                        </div>
                        <div>
                          <div className="font-medium dark:text-white">{member.name}</div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                          Resend
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 text-red-600 hover:text-red-700">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>)}
              </div>
            </TabsContent>
            
            <TabsContent value="admins">
              {/* Content for admins tab */}
              <div className="text-center p-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-gray-800 mb-4">
                  <Users className="h-6 w-6 text-slate-500 dark:text-gray-400" />
                </div>
                <h3 className="text-lg font-medium dark:text-white">No Admin Members</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400 mt-1 mb-4">Promote a team member to admin to manage your team</p>
                <Button>Add Admin</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>;
};