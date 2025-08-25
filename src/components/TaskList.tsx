import React, { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { Task } from '../contexts/TaskContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface TaskListProps {
  category: string;
}

const TaskList: React.FC<TaskListProps> = ({ category }) => {
  const { getTasksByCategory, getCompletedTasks } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const allTasks = getTasksByCategory(category);
  const activeTasks = allTasks.filter(task => !task.completed);
  const completedTasks = allTasks.filter(task => task.completed);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditingTask(null);
    setIsEditModalOpen(false);
  };

  const getCategoryName = () => {
    if (category === 'all') return 'All Tasks';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-secondary-900">
          {getCategoryName()}
        </h2>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-primary-100 text-primary-800">
            {activeTasks.length} active
          </Badge>
          <Badge variant="secondary" className="bg-success-100 text-success-800">
            {completedTasks.length} completed
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary-100">
          <TabsTrigger 
            value="active" 
            className="data-[state=active]:bg-white data-[state=active]:text-primary-600"
          >
            Active Tasks ({activeTasks.length})
          </TabsTrigger>
          <TabsTrigger 
            value="completed"
            className="data-[state=active]:bg-white data-[state=active]:text-success-600"
          >
            Completed ({completedTasks.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-6">
          <div className="space-y-4">
            {activeTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-secondary-400 text-lg mb-2">No active tasks</div>
                <p className="text-secondary-500">Great job! You're all caught up.</p>
              </div>
            ) : (
              activeTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                />
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="space-y-4">
            {completedTasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-secondary-400 text-lg mb-2">No completed tasks</div>
                <p className="text-secondary-500">Complete some tasks to see them here.</p>
              </div>
            ) : (
              completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      <TaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        task={editingTask}
      />
    </div>
  );
};

export default TaskList;