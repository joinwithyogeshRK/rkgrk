import React from 'react';
import { Calendar, Edit, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useTasks } from '../contexts/TaskContext';
import { Task } from '../contexts/TaskContext';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { toggleTask, deleteTask, categories } = useTasks();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-secondary-100 text-secondary-800 border-secondary-200';
    }
  };

  const getPriorityBorderClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  const getCategoryInfo = () => {
    return categories.find(cat => cat.id === task.category) || 
           { name: task.category, color: '#3b82f6' };
  };

  const categoryInfo = getCategoryInfo();
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <Card className={`task-card ${task.completed ? 'completed' : ''} ${getPriorityBorderClass(task.priority)} fade-in`}>
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => toggleTask(task.id)}
            className="mt-1 data-[state=checked]:bg-success-600 data-[state=checked]:border-success-600"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className={`font-semibold text-lg ${
                task.completed 
                  ? 'line-through text-secondary-500' 
                  : 'text-secondary-900'
              }`}>
                {task.title}
              </h3>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="text-secondary-500 hover:text-primary-600 hover:bg-primary-50 h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTask(task.id)}
                  className="text-secondary-500 hover:text-red-600 hover:bg-red-50 h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {task.description && (
              <p className={`text-sm mb-3 ${
                task.completed 
                  ? 'text-secondary-400' 
                  : 'text-secondary-600'
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="secondary" 
                  className={getPriorityColor(task.priority)}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge>
                
                <Badge 
                  variant="outline" 
                  className="border-secondary-200"
                  style={{ 
                    borderColor: categoryInfo.color + '40',
                    backgroundColor: categoryInfo.color + '10',
                    color: categoryInfo.color
                  }}
                >
                  {categoryInfo.name}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-3 text-sm text-secondary-500">
                {task.dueDate && (
                  <div className={`flex items-center space-x-1 ${
                    isOverdue ? 'text-red-600' : 'text-secondary-500'
                  }`}>
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                    </span>
                    {isOverdue && (
                      <Badge variant="destructive" className="ml-2 text-xs">
                        Overdue
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    {format(new Date(task.createdAt), 'MMM dd')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;