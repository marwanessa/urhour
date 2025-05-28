import React, { createContext, useState, useContext, useEffect } from 'react';
import { Task } from '../types/Task';
import { sampleTasks } from '../data/sampleTasks';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<Task>;
  getTaskById: (id: string) => Task | undefined;
  updateTask: (id: string, task: Partial<Task>) => Promise<Task | null>;
  deleteTask: (id: string) => Promise<boolean>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch tasks
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setTasks(sampleTasks);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    // Simulate API call to add a task
    const newTask: Task = {
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...task,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    return newTask;
  };

  const getTaskById = (id: string): Task | undefined => {
    return tasks.find(task => task.id === id);
  };

  const updateTask = async (id: string, taskUpdate: Partial<Task>): Promise<Task | null> => {
    // Simulate API call to update a task
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) return null;

    const updatedTask = { ...tasks[taskIndex], ...taskUpdate };
    const newTasks = [...tasks];
    newTasks[taskIndex] = updatedTask;
    setTasks(newTasks);
    return updatedTask;
  };

  const deleteTask = async (id: string): Promise<boolean> => {
    // Simulate API call to delete a task
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    return true;
  };

  return (
    <TaskContext.Provider 
      value={{ 
        tasks, 
        loading, 
        error, 
        addTask, 
        getTaskById, 
        updateTask, 
        deleteTask 
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};