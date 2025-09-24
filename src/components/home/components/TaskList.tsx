import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
interface Task {
  id: string;
  label: string;
  completed: boolean;
}
interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}
export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleTask
}) => {
  return <Card className="border-slate-200 dark:border-gray-700">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center dark:text-white">
            
            Exhibitor Guide
          </h3>
          <Badge variant="outline" className="px-3 py-1 bg-green-50 text-green-700 border-green-100 dark:bg-green-900 dark:text-green-300 dark:border-green-800">
            Resources
          </Badge>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Complete the booth setup checklist to prepare for your event
        </p>
        
        <div className="max-h-[340px] overflow-y-auto pr-2">
          <div className="space-y-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-3">
            {tasks.map(task => <div key={task.id} className="flex items-start cursor-pointer group" onClick={() => onToggleTask(task.id)}>
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${task.completed ? "bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600" : "border-gray-300 dark:border-gray-600"} mr-2 mt-0.5 transition-colors`}>
                  {task.completed && <Check className="h-3 w-3 text-white" />}
                </div>
                <span className={`text-sm transition-all leading-tight ${task.completed ? "line-through text-gray-400 dark:text-gray-500" : "text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white"}`}>
                  {task.label}
                </span>
              </div>)}
          </div>
        </div>
      </CardContent>
    </Card>;
};