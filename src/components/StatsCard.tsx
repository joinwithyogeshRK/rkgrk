import React from 'react';
import { CheckCircle, Clock, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTasks } from '../contexts/TaskContext';

const StatsCard: React.FC = () => {
  const { getTaskStats, tasks } = useTasks();
  const stats = getTaskStats();
  
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const todayTasks = tasks.filter(task => {
    const today = new Date().toDateString();
    return new Date(task.createdAt).toDateString() === today;
  }).length;
  
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.completed).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary-600">Total Tasks</p>
              <p className="text-2xl font-bold text-primary-900">{stats.total}</p>
            </div>
            <Target className="h-8 w-8 text-primary-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-success-50 to-success-100 border-success-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-success-600">Completed</p>
              <p className="text-2xl font-bold text-success-900">{stats.completed}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-success-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-600">Pending</p>
              <p className="text-2xl font-bold text-amber-900">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-amber-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-secondary-50 to-secondary-100 border-secondary-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-secondary-600">Progress</p>
              <p className="text-2xl font-bold text-secondary-900">{completionRate}%</p>
              <Progress value={completionRate} className="mt-2 h-2" />
            </div>
            <TrendingUp className="h-8 w-8 text-secondary-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCard;