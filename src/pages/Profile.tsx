import React from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Star, Calendar, CheckSquare, FileText } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { sampleUsers } from '../data/sampleUsers';
import { useTask } from '../contexts/TaskContext';

const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser, isAuthenticated } = useAuth();
  const { tasks } = useTask();
  
  // Find the user by ID
  const user = sampleUsers.find(u => u.id === id);
  
  // Filter tasks posted by this user
  const userTasks = tasks.filter(task => task.postedBy.id === id);
  
  // Check if viewing own profile
  const isOwnProfile = isAuthenticated && currentUser?.id === id;
  
  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h2>
        <p className="text-gray-600">The user you're looking for doesn't exist.</p>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={`${i < Math.floor(user.rating) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {user.rating.toFixed(1)} ({user.reviewCount} reviews)
                </span>
              </div>
              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {user.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={16} className="mr-1 flex-shrink-0" />
                    <span>{user.location}</span>
                  </div>
                )}
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={16} className="mr-1 flex-shrink-0" />
                  <span>Member since {new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>
                
                {user.tasksCompleted !== undefined && (
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckSquare size={16} className="mr-1 flex-shrink-0" />
                    <span>{user.tasksCompleted} tasks completed</span>
                  </div>
                )}
                
                {user.tasksPosted !== undefined && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FileText size={16} className="mr-1 flex-shrink-0" />
                    <span>{user.tasksPosted} tasks posted</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 md:mt-0">
              {isOwnProfile ? (
                <Button variant="outline">
                  Edit Profile
                </Button>
              ) : (
                <Button variant="primary" icon={<MessageCircle size={18} />}>
                  Contact
                </Button>
              )}
            </div>
          </div>
          
          {user.bio && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">About</h2>
              <p className="text-gray-700">{user.bio}</p>
            </div>
          )}
          
          <div className="mt-6 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h2>
            
            {user.reviewCount > 0 ? (
              <div className="space-y-4">
                {/* Sample reviews - in a real app, these would come from the API */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                      JD
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">John Doe</h3>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={`${i < 5 ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                            />
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-500">
                          1 month ago
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    {user.name} was great to work with! Showed up on time and completed the task efficiently.
                    Would definitely hire again.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                      SM
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">Sarah Miller</h3>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={`${i < 4 ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                            />
                          ))}
                        </div>
                        <span className="ml-1 text-xs text-gray-500">
                          2 months ago
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    Very professional and skilled. Completed the task within budget and on time.
                  </p>
                </div>
                
                <div className="text-center mt-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View all {user.reviewCount} reviews
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No reviews yet.</p>
            )}
          </div>
          
          {/* User's Posted Tasks */}
          {userTasks.length > 0 && (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {isOwnProfile ? 'Your Posted Tasks' : 'Tasks Posted by ' + user.name}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userTasks.slice(0, 4).map(task => (
                  <div key={task.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-1 truncate">{task.title}</h3>
                      <div className="flex items-center mb-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                          ${getCategoryColor(task.category)}`}>
                          {task.category}
                        </span>
                        <span className="mx-2 text-gray-500">•</span>
                        <span className="text-sm text-gray-500">${task.payment.toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{task.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{formatDate(task.createdAt)}</span>
                        <a href={`/tasks/${task.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View details
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {userTasks.length > 4 && (
                <div className="text-center mt-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View all {userTasks.length} tasks
                  </button>
                </div>
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

import { MessageCircle } from 'lucide-react';

export default Profile;