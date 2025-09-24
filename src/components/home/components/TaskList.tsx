import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TaskModal } from "./TaskModal";

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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const renderAssignedTo = (assignedTo?: Array<{id: string; name: string; avatar: string}>) => {
    if (!assignedTo || assignedTo.length === 0) return null;

    return (
      <div className="flex -space-x-2">
        {assignedTo.slice(0, 3).map((user) => (
          <Avatar key={user.id} className="h-6 w-6 border-2 border-background">
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {user.avatar}
            </AvatarFallback>
          </Avatar>
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
                  <TableHead className="w-32">Due Date</TableHead>
                  <TableHead className="w-32">Assigned To</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map(task => (
                  <TableRow 
                    key={task.id} 
                    className="cursor-pointer hover:bg-muted/50"
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
                      {renderAssignedTo(task.assignedTo)}
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
    </>
  );
};