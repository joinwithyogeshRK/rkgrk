import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  taskCount: number;
}

interface TaskContextType {
  tasks: Task[];
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  filterPriority: string;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterPriority: (priority: string) => void;
  addCategory: (name: string, color: string) => void;
  deleteCategory: (id: string) => void;
  getTasksByCategory: (category: string) => Task[];
  getCompletedTasks: () => Task[];
  getTaskStats: () => { total: number; completed: number; pending: number; };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: 'all', name: 'All Tasks', color: '#3b82f6', taskCount: 0 },
    { id: 'personal', name: 'Personal', color: '#10b981', taskCount: 0 },
    { id: 'work', name: 'Work', color: '#f59e0b', taskCount: 0 },
    { id: 'shopping', name: 'Shopping', color: '#ef4444', taskCount: 0 },
    { id: 'health', name: 'Health', color: '#8b5cf6', taskCount: 0 }
  ]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    const savedCategories = localStorage.getItem('todoCategories');
    
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Add some sample tasks
      const sampleTasks: Task[] = [
        {
          id: '1',
          title: 'Complete project proposal',
          description: 'Finish the quarterly project proposal for the new client',
          completed: false,
          priority: 'high',
          category: 'work',
          dueDate: '2024-01-15',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Buy groceries',
          description: 'Milk, bread, eggs, and vegetables',
          completed: false,
          priority: 'medium',
          category: 'shopping',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Morning workout',
          description: '30 minutes cardio and strength training',
          completed: true,
          priority: 'low',
          category: 'health',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      setTasks(sampleTasks);
    }
    
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  // Save to localStorage whenever tasks or categories change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('todoCategories', JSON.stringify(categories));
  }, [categories]);

  // Update category task counts
  useEffect(() => {
    setCategories(prev => prev.map(category => ({
      ...category,
      taskCount: category.id === 'all' 
        ? tasks.length 
        : tasks.filter(task => task.category === category.id).length
    })));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
    toast.success('Task added successfully!');
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
    toast.success('Task updated successfully!');
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast.success('Task deleted successfully!');
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task
    ));
  };

  const addCategory = (name: string, color: string) => {
    const newCategory: Category = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      color,
      taskCount: 0
    };
    setCategories(prev => [...prev, newCategory]);
    toast.success('Category added successfully!');
  };

  const deleteCategory = (id: string) => {
    if (id === 'all') return;
    setCategories(prev => prev.filter(cat => cat.id !== id));
    setTasks(prev => prev.filter(task => task.category !== id));
    if (selectedCategory === id) {
      setSelectedCategory('all');
    }
    toast.success('Category deleted successfully!');
  };

  const getTasksByCategory = (category: string) => {
    let filteredTasks = category === 'all' ? tasks : tasks.filter(task => task.category === category);
    
    if (searchQuery) {
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filterPriority !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.priority === filterPriority);
    }
    
    return filteredTasks;
  };

  const getCompletedTasks = () => {
    return tasks.filter(task => task.completed);
  };

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  const value: TaskContextType = {
    tasks,
    categories,
    selectedCategory,
    searchQuery,
    filterPriority,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    setSelectedCategory,
    setSearchQuery,
    setFilterPriority,
    addCategory,
    deleteCategory,
    getTasksByCategory,
    getCompletedTasks,
    getTaskStats
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};