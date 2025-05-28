import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Clock, MessageCircle, User, AlertCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { useTask } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';

const TaskDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTaskById, updateTask } = useTask();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [offerMessage, setOfferMessage] = useState('');
  
  const task = getTaskById(id || '');
  
  if (!task) {
    return (
      <div className="text-center py-12">
        <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Task Not Found</h2>
        <p className="text-gray-600 mb-6">The task you're looking for doesn't exist or has been removed.</p>
        <Link to="/">
          <Button variant="primary">Go Back Home</Button>
        </Link>
      </div>
    );
  }
  
  const isTaskPoster = isAuthenticated && user?.id === task.postedBy.id;
  const isTaskAssigned = task.status !== 'open';
  
  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would send the offer to the backend
    setOfferSubmitted(true);
    setLoading(false);
  };
  
  const handleTaskAction = async (action: 'assign' | 'complete' | 'cancel') => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let newStatus;
    switch (action) {
      case 'assign':
        newStatus = 'assigned';
        break;
      case 'complete':
        newStatus = 'completed';
        break;
      case 'cancel':
        newStatus = 'cancelled';
        break;
    }
    
    await updateTask(task.id, { status: newStatus as any });
    setLoading(false);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
          &larr; Back to tasks
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{task.title}</h1>
              
              <div className="flex items-center mb-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                  ${getCategoryColor(task.category)}`}>
                  {task.category}
                </span>
                
                <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                  ${getStatusColor(task.status)}`}>
                  {formatStatus(task.status)}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">${task.payment.toFixed(2)}</div>
              <div className="text-sm text-gray-500">Fixed price</div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 my-6 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Description</h2>
            <p className="text-gray-700 whitespace-pre-line mb-6">
              {task.description}
            </p>
            
            {task.tags && task.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {task.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start">
                <MapPin size={20} className="text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Location</h3>
                  <p className="text-gray-700">{task.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Calendar size={20} className="text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Posted</h3>
                  <p className="text-gray-700">{new Date(task.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              {task.dueDate && (
                <div className="flex items-start">
                  <Clock size={20} className="text-gray-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Due Date</h3>
                    <p className="text-gray-700">{new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t border-gray-200 my-6 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Posted By</h2>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                {task.postedBy.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <h3 className="text-base font-medium text-gray-900">{task.postedBy.name}</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(task.postedBy.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-sm text-gray-500">({task.postedBy.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          {task.assignedTo && (
            <div className="border-t border-gray-200 my-6 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Assigned To</h2>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  {task.assignedTo.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium text-gray-900">{task.assignedTo.name}</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(task.assignedTo.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-500">({task.assignedTo.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 px-6 py-4">
          {isTaskPoster ? (
            <div>
              {task.status === 'open' && (
                <div className="text-center sm:text-left">
                  <p className="text-gray-700 mb-4">You posted this task. Waiting for offers from helpers.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/edit-task/' + task.id)}
                  >
                    Edit Task
                  </Button>
                </div>
              )}
              
              {task.status === 'assigned' && (
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <p className="text-gray-700">Task in progress with {task.assignedTo?.name}</p>
                  <div className="flex gap-2">
                    <Button 
                      variant="primary"
                      onClick={() => handleTaskAction('complete')}
                      disabled={loading}
                    >
                      Mark Complete
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleTaskAction('cancel')}
                      disabled={loading}
                    >
                      Cancel Task
                    </Button>
                  </div>
                </div>
              )}
              
              {(task.status === 'completed' || task.status === 'cancelled') && (
                <div className="text-center">
                  <p className="text-gray-700 mb-4">
                    This task is {task.status === 'completed' ? 'completed' : 'cancelled'}.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    Browse More Tasks
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div>
              {!isAuthenticated ? (
                <div className="text-center">
                  <p className="text-gray-700 mb-4">Sign in to make an offer or message the task poster.</p>
                  <div className="flex justify-center gap-4">
                    <Link to="/login">
                      <Button variant="primary">Sign In</Button>
                    </Link>
                    <Link to="/signup">
                      <Button variant="outline">Sign Up</Button>
                    </Link>
                  </div>
                </div>
              ) : isTaskAssigned ? (
                <div className="text-center">
                  <p className="text-gray-700 mb-4">
                    This task is already {formatStatus(task.status).toLowerCase()}.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    Browse More Tasks
                  </Button>
                </div>
              ) : offerSubmitted ? (
                <div className="text-center">
                  <p className="text-green-600 font-medium mb-2">Your offer has been submitted!</p>
                  <p className="text-gray-700 mb-4">
                    The task poster will review your offer and get back to you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleOfferSubmit}>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Make an Offer</h3>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message to task poster
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Introduce yourself and explain why you're a good fit for this task..."
                      value={offerMessage}
                      onChange={(e) => setOfferMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      icon={<MessageCircle size={18} />}
                    >
                      Message First
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit Offer'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper functions
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

const getStatusColor = (status: string): string => {
  const statuses: Record<string, string> = {
    'open': 'bg-green-100 text-green-800',
    'assigned': 'bg-blue-100 text-blue-800',
    'in_progress': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-gray-100 text-gray-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  
  return statuses[status] || 'bg-gray-100 text-gray-800';
};

const formatStatus = (status: string): string => {
  const formattedStatus = status.replace('_', ' ');
  return formattedStatus.charAt(0).toUpperCase() + formattedStatus.slice(1);
};

export default TaskDetails;