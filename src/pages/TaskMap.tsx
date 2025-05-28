import React from 'react';
import MapComponent from '../components/map/TaskMap';
import { useTask } from '../contexts/TaskContext';
import TaskFilters from '../components/tasks/TaskFilters';

const TaskMapPage: React.FC = () => {
  const { tasks, loading } = useTask();
  const [filters, setFilters] = React.useState({
    category: '',
    priceRange: { min: 0, max: 1000 },
    distance: 50,
    sortBy: 'newest'
  });

  // Apply filters to tasks
  const filteredTasks = React.useMemo(() => {
    if (loading) return [];
    
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
    
    // In a real app, you would filter by distance based on user's location
    
    return filtered;
  }, [tasks, filters, loading]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Tasks Near You</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <TaskFilters
            filters={filters}
            onFilterChange={setFilters}
          />
          
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Found {filteredTasks.length} tasks</h3>
            <p className="text-sm text-gray-600">
              {filters.category 
                ? `Showing ${filters.category} tasks` 
                : 'Showing all categories'
              } within {filters.distance} miles of your location.
            </p>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <MapComponent tasks={filteredTasks} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskMapPage;