import React, { useState } from 'react';
import { Search, Plus, Filter, Bell, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useTasks } from '../contexts/TaskContext';
import TaskModal from './TaskModal';
import StatsCard from './StatsCard';

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery, filterPriority, setFilterPriority, getTaskStats } = useTasks();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const stats = getTaskStats();

  return (
    <header className="bg-white border-b border-secondary-200 px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>FlowSync Pro</h1>
          <Badge variant="secondary" className="bg-primary-100 text-primary-800">
            {stats.pending} pending
          </Badge>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary-50 border-secondary-200 focus:bg-white"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-secondary-500" />
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-32 bg-secondary-50 border-secondary-200">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={() => setIsTaskModalOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="mt-4">
        <StatsCard />
      </div>

      <TaskModal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
      />
    </header>
  );
};

export default Header;