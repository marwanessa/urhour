import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Calendar } from 'lucide-react';
import { Task } from '../../types/Task';
import Button from '../ui/Button';

interface TaskPreviewProps {
  task: Task;
}

const TaskPreview: React.FC<TaskPreviewProps> = ({ task }) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      
      <div className="mt-2 space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <span>{task.location}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <DollarSign size={16} className="mr-2 flex-shrink-0" />
          <span>${task.payment.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-2 flex-shrink-0" />
          <span>{new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      
      <p className="mt-3 text-sm text-gray-600 line-clamp-2">
        {task.description}
      </p>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            {task.postedBy.name.charAt(0).toUpperCase()}
          </div>
          <span className="ml-2 text-sm font-medium">{task.postedBy.name}</span>
        </div>
        
        <Link to={`/tasks/${task.id}`}>
          <Button variant="primary" size="sm">
            View Task
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TaskPreview;