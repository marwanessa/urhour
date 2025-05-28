import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import TaskPreview from './TaskPreview';
import { Task } from '../../types/Task';

interface TaskMapProps {
  tasks: Task[];
  centerLocation?: { lat: number; lng: number };
}

const TaskMap: React.FC<TaskMapProps> = ({ 
  tasks, 
  centerLocation = { lat: 37.7749, lng: -122.4194 } // Default to San Francisco
}) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Mock function to simulate map loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-[70vh] w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
      {/* Simulated map placeholder */}
      <div className="absolute inset-0 bg-blue-50">
        {!mapLoaded && (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {mapLoaded && (
          <>
            {/* This would be replaced with an actual map component like Google Maps */}
            <div className="h-full w-full bg-[url('https://images.pexels.com/photos/1486785/pexels-photo-1486785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-70">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="bg-white/80 p-4 rounded shadow-md">
                  In a real implementation, this would be an interactive map with task markers.
                </p>
              </div>
            </div>
            
            {/* Task markers */}
            {tasks.map(task => (
              <div 
                key={task.id}
                className="absolute map-marker"
                style={{ 
                  left: `${Math.random() * 80 + 10}%`, 
                  top: `${Math.random() * 80 + 10}%` 
                }}
                onClick={() => setSelectedTask(task)}
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  selectedTask?.id === task.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-blue-500'
                } shadow-md border-2 border-white cursor-pointer transition-all duration-200 hover:scale-110`}>
                  <MapPin size={16} />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      
      {/* Task preview panel */}
      {selectedTask && (
        <div className="absolute bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-lg max-h-64 overflow-y-auto">
          <div className="absolute top-2 right-2">
            <button
              onClick={() => setSelectedTask(null)}
              className="p-1 rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300"
            >
              &times;
            </button>
          </div>
          <TaskPreview task={selectedTask} />
        </div>
      )}
      
      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100">
          +
        </button>
        <button className="h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100">
          −
        </button>
      </div>
    </div>
  );
};

export default TaskMap;