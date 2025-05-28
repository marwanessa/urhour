import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, User } from 'lucide-react';
import { Task } from '../../types/Task';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden task-card fade-in">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {task.title}
          </h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
            ${getCategoryColor(task.category)}`}>
            {task.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
        
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={16} className="mr-1 flex-shrink-0" />
            <span className="truncate">{task.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign size={16} className="mr-1 flex-shrink-0" />
            <span>${task.payment.toFixed(2)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={16} className="mr-1 flex-shrink-0" />
            <span>{formatDate(task.createdAt)}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <User size={16} className="text-blue-600" />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{task.postedBy.name}</p>
            <div className="flex items-center">
              <StarRating rating={task.postedBy.rating} />
              <span className="text-xs text-gray-500 ml-1">
                ({task.postedBy.reviewCount})
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3">
        <Link 
          to={`/tasks/${task.id}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View details &rarr;
        </Link>
      </div>
    </div>
  );
};

// Helper components and functions
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-3 w-3 ${
            i < Math.floor(rating) 
              ? 'text-yellow-400' 
              : i < rating 
                ? 'text-yellow-300' 
                : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - d.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return d.toLocaleDateString();
  }
};

const getCategoryColor = (category: string): string => {
  const categories: Record<string, string> = {
    'Cleaning': 'bg-blue-100 text-blue-800',
    'Delivery': 'bg-green-100 text-green-800',
    'Handyman': 'bg-orange-100 text-orange-800',
    'Moving': 'bg-purple-100 text-purple-800',
    'Pet Care': 'bg-pink-100 text-pink-800',
    'Other': 'bg-gray-100 text-gray-800'
  };
  
  return categories[category] || categories['Other'];
};

export default TaskCard;