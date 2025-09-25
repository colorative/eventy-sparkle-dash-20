import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, UserPlus, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskModal } from "@/components/home/components/TaskModal";
import { useToast } from "@/hooks/use-toast";
import BoringAvatar from "boring-avatars";

interface Task {
  id: string;
  label: string;
  completed: boolean;
  dueDate?: string;
  assignedTo?: Array<{
    id: string;
    name: string;
  }>;
  type: 'redirect' | 'agreement' | 'upload' | 'simple';
  redirectUrl?: string;
}

interface TaskListSidebarProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

export const TaskListSidebar: React.FC<TaskListSidebarProps> = ({
  tasks,
  onToggleTask
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTaskForAssign, setSelectedTaskForAssign] = useState<Task | null>(null);
  const [assignedUsers, setAssignedUsers] = useState<string[]>([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const { toast } = useToast();

  const availableAdmins = [
    { id: "admin1", name: "Sarah Connor" },
    { id: "admin2", name: "John Doe" },
    { id: "admin3", name: "Alex Kim" },
    { id: "admin4", name: "Maria Garcia" }
  ];

  const handleTaskClick = (task: Task) => {
    if (task.type === 'agreement' || task.type === 'upload') {
      setSelectedTask(task);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleAssignClick = (e: React.MouseEvent, task: Task) => {
    e.stopPropagation();
    setSelectedTaskForAssign(task);
    setAssignedUsers(task.assignedTo?.map(u => u.id) || []);
    setIsAssignModalOpen(true);
  };

  const handleAssignUser = (userId: string) => {
    setAssignedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSaveAssignments = () => {
    console.log('Saving assignments:', assignedUsers);
    setIsAssignModalOpen(false);
    setSelectedTaskForAssign(null);
  };

  const handleInviteAdmin = () => {
    setIsInviteModalOpen(true);
  };

  const handleSendInvite = () => {
    console.log('Sending invite to:', inviteEmail);
    toast({
      title: "Invitation sent!",
      description: `Invitation has been sent to ${inviteEmail}`,
    });
    setInviteEmail("");
    setIsInviteModalOpen(false);
  };

  const renderAssignedAvatars = (task: Task) => {
    const { assignedTo } = task;
    
    if (!assignedTo || assignedTo.length === 0) {
      return null;
    }

    return (
      <div className="flex -space-x-2">
        {assignedTo.slice(0, 3).map((user) => (
          <div key={user.id} className="h-6 w-6 border-2 border-background rounded-full overflow-hidden">
            <BoringAvatar
              size={24}
              name={user.name}
              variant="marble"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </div>
        ))}
        {assignedTo.length > 3 && (
          <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
            <span className="text-xs text-muted-foreground">+{assignedTo.length - 3}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white min-w-80 w-[308px] overflow-hidden rounded-lg h-full">
        <div className="w-full h-full flex flex-col">
          <div className="p-3 border-b bg-muted/30">
            <h3 className="font-medium text-sm">Task Management</h3>
            <p className="text-xs text-muted-foreground mt-1">
              {tasks.filter(t => t.completed).length}/{tasks.length} tasks completed
            </p>
          </div>
          
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {tasks.map((task) => (
              <Card 
                key={task.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md border ${
                  task.completed 
                    ? 'bg-muted/30 border-muted' 
                    : 'hover:border-primary/20 hover:bg-primary/5'
                } ${
                  task.type === 'agreement' || task.type === 'upload' 
                    ? 'hover:scale-[1.02]' 
                    : ''
                }`}
                onClick={() => handleTaskClick(task)}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Task Title & Status */}
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`text-sm font-medium leading-tight ${
                        task.completed 
                          ? 'line-through text-muted-foreground' 
                          : 'text-foreground'
                      }`}>
                        {task.label}
                      </h4>
                      {task.completed && (
                        <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-green-100 text-green-700 border-green-200">
                          Done
                        </Badge>
                      )}
                    </div>

                    {/* Due Date */}
                    {task.dueDate && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Due {task.dueDate}</span>
                        {!task.completed && (
                          <Clock className="h-3 w-3 ml-1 text-orange-500" />
                        )}
                      </div>
                    )}

                    {/* Avatars & Assign Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {renderAssignedAvatars(task)}
                        {task.assignedTo && task.assignedTo.length > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {task.assignedTo.length} assigned
                          </span>
                        )}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => handleAssignClick(e, task)}
                        className="h-7 px-2 text-xs hover:bg-primary/10 hover:text-primary"
                      >
                        <UserPlus className="h-3 w-3 mr-1" />
                        Assign
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTaskComplete={onToggleTask}
      />

      <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Task</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Select admins to assign to "{selectedTaskForAssign?.label}"
            </p>
            
            <div className="space-y-2">
              {availableAdmins.map((admin) => (
                <div
                  key={admin.id}
                  className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-colors ${
                    assignedUsers.includes(admin.id)
                      ? "bg-primary/10 border-primary"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => handleAssignUser(admin.id)}
                >
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    <BoringAvatar
                      size={32}
                      name={admin.name}
                      variant="marble"
                      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                    />
                  </div>
                  <span className="text-sm font-medium">{admin.name}</span>
                  {assignedUsers.includes(admin.id) && (
                    <div className="h-4 w-4 ml-auto text-primary">✓</div>
                  )}
                </div>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={handleInviteAdmin}
              className="w-full mt-2"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite Admin
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsAssignModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSaveAssignments} className="flex-1">
                Save Assignments
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Admin</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Send an invitation to a new admin by entering their email address.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsInviteModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleSendInvite} 
                className="flex-1"
                disabled={!inviteEmail.trim()}
              >
                Send Invitation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};