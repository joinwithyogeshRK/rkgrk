import React from 'react';
import Sidebar from '../components/Sidebar';
import TaskList from '../components/TaskList';
import Header from '../components/Header';
import { useTasks } from '../contexts/TaskContext';

const Home: React.FC = () => {
  const { selectedCategory } = useTasks();

  return (
    <div className="flex h-screen bg-secondary-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto custom-scrollbar">
          <div className="max-w-4xl mx-auto">
            <TaskList category={selectedCategory} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;