import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Task } from '../../types/Task';
import TaskFilters from './TaskFilters';

interface TaskListProps {
  tasks: Task[];
  title?: string;
  showFilters?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  title = 'Available Tasks', 
  showFilters = true 
}) => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [activeFilters, setActiveFilters] = useState({
    category: '',
    priceRange: { min: 0, max: 1000 },
    distance: 50,
    sortBy: 'newest'
  });

  const applyFilters = (filters: any) => {
    setActiveFilters(filters);
    
    // Apply filtering logic
    let filtered = [...tasks];
    
    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(task => task.category === filters.category);
    }
    
    // Filter by price range
    filtered = filtered.filter(task => 
      task.payment >= filters.priceRange.min && 
      task.payment <= filters.priceRange.max
    );
    
    // Sort tasks
    if (filters.sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filters.sortBy === 'price_high') {
      filtered.sort((a, b) => b.payment - a.payment);
    } else if (filters.sortBy === 'price_low') {
      filtered.sort((a, b) => a.payment - b.payment);
    }
    
    setFilteredTasks(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-1 sm:mt-0">
          Showing {filteredTasks.length} tasks
        </p>
      </div>
      
      {showFilters && (
        <TaskFilters 
          filters={activeFilters} 
          onFilterChange={applyFilters}
        />
      )}

      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tasks found matching your filters.</p>
          <button
            onClick={() => applyFilters({
              category: '',
              priceRange: { min: 0, max: 1000 },
              distance: 50,
              sortBy: 'newest'
            })}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;