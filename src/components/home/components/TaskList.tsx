import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Calendar, Users, UserPlus, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TaskModal } from "./TaskModal";
import { useNavigate } from "react-router-dom";
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
    avatar: string;
  }>;
  type: 'redirect' | 'agreement' | 'upload' | 'simple';
  redirectUrl?: string;
}

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask
}) => {
  const navigate = useNavigate();
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
    // Only handle clickable tasks (agreement and upload types)
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
    // Here you would typically update the task with new assignments
    console.log('Saving assignments:', assignedUsers);
    setIsAssignModalOpen(false);
    setSelectedTaskForAssign(null);
  };

  const handleInviteAdmin = () => {
    setIsInviteModalOpen(true);
  };

  const handleSendInvite = () => {
    // Here you would typically send the invitation
    console.log('Sending invite to:', inviteEmail);
    toast({
      title: "Invitation sent!",
      description: `Invitation has been sent to ${inviteEmail}`,
    });
    setInviteEmail("");
    setIsInviteModalOpen(false);
  };

  const renderAssignedTo = (task: Task) => {
    const { assignedTo } = task;
    
    return (
      <div className="flex items-center gap-2">
        {assignedTo && assignedTo.length > 0 ? (
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
        ) : null}
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => handleAssignClick(e, task)}
          className="h-6 px-2 text-xs"
        >
          <UserPlus className="h-3 w-3 mr-1" />
          Assign
        </Button>
      </div>
    );
  };

  return (
    <>
      <Card className="border-slate-200 dark:border-gray-700">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center dark:text-white">
              Exhibitor Checklist
            </h3>
            <Badge variant="outline" className="px-3 py-1 bg-green-50 text-green-700 border-green-100 dark:bg-green-900 dark:text-green-300 dark:border-green-800">
              {tasks.filter(task => task.completed).length}/{tasks.length} Complete
            </Badge>
          </div>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Complete the booth setup checklist to prepare for your event
          </p>
          
          <div className="max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Task Name</TableHead>
                  <TableHead className="w-40">Due Date</TableHead>
                  <TableHead className="w-48">Assigned To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map(task => (
                  <TableRow 
                    key={task.id} 
                    className={`${
                      task.type === 'agreement' || task.type === 'upload' 
                        ? 'cursor-pointer hover:bg-muted/50' 
                        : ''
                    }`}
                    onClick={() => handleTaskClick(task)}
                  >
                    <TableCell>
                      <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        task.completed 
                          ? "bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600" 
                          : "border-gray-300 dark:border-gray-600"
                      } transition-colors`}>
                        {task.completed && <Check className="h-3 w-3 text-white" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm ${
                        task.completed 
                          ? "line-through text-gray-400 dark:text-gray-500" 
                          : "text-gray-700 dark:text-gray-200"
                      }`}>
                        {task.label}
                      </span>
                    </TableCell>
                    <TableCell>
                      {task.dueDate && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {task.dueDate}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {renderAssignedTo(task)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

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
                    <Check className="h-4 w-4 ml-auto text-primary" />
                  )}
                </div>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={handleInviteAdmin}
              className="w-full mt-2"
            >
              <Mail className="h-4 w-4 mr-2" />
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