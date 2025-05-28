import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import { useTask } from '../contexts/TaskContext';
import { useAuth } from '../contexts/AuthContext';

const CreateTask: React.FC = () => {
  const navigate = useNavigate();
  const { addTask } = useTask();
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [generatingDescription, setGeneratingDescription] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    payment: '',
    location: '',
    dueDate: ''
  });
  
  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'Cleaning', label: 'Cleaning' },
    { value: 'Delivery', label: 'Delivery' },
    { value: 'Handyman', label: 'Handyman' },
    { value: 'Moving', label: 'Moving' },
    { value: 'Pet Care', label: 'Pet Care' },
    { value: 'Other', label: 'Other' }
  ];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const generateDescription = async () => {
    if (!formData.title || !formData.category) {
      alert('Please enter a title and select a category first');
      return;
    }
    
    setGeneratingDescription(true);
    
    // Simulate API call to AI service
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Sample generated descriptions based on category
    const descriptions: Record<string, string> = {
      'Cleaning': `I need help cleaning my ${Math.random() > 0.5 ? 'apartment' : 'house'}. The task includes ${Math.random() > 0.5 ? 'dusting, vacuuming, and bathroom cleaning' : 'kitchen cleaning, floor mopping, and window washing'}. Please bring your own cleaning supplies. The space is approximately ${Math.floor(Math.random() * 1000 + 500)} square feet.`,
      'Delivery': `I need someone to pick up a ${Math.random() > 0.5 ? 'package' : 'food order'} from ${Math.random() > 0.5 ? 'downtown' : 'the shopping mall'} and deliver it to my ${Math.random() > 0.5 ? 'home' : 'office'}. The item is ${Math.random() > 0.5 ? 'not too heavy' : 'relatively light'} and should fit in a standard vehicle.`,
      'Handyman': `I need help with ${Math.random() > 0.5 ? 'fixing a leaky faucet' : 'assembling furniture'}. The job requires ${Math.random() > 0.5 ? 'basic plumbing knowledge' : 'following instruction manuals'}. Please bring your own tools. Estimated time to complete is ${Math.floor(Math.random() * 3 + 1)} hours.`,
      'Moving': `I need assistance moving ${Math.random() > 0.5 ? 'furniture' : 'boxes'} from my ${Math.random() > 0.5 ? 'current apartment to my new place' : 'storage unit to my home'}. Items include ${Math.random() > 0.5 ? 'a couch, bed, and dresser' : 'about 10-15 medium-sized boxes'}. Both locations are within ${Math.floor(Math.random() * 10 + 1)} miles of each other.`,
      'Pet Care': `I need someone to ${Math.random() > 0.5 ? 'walk my dog' : 'take care of my cat'} while I'm ${Math.random() > 0.5 ? 'at work' : 'out of town'}. The pet is ${Math.random() > 0.5 ? 'friendly and well-behaved' : 'a bit shy but sweet'}. Tasks include ${Math.random() > 0.5 ? 'feeding, walking, and playing' : 'changing water, feeding, and brief playtime'}.`,
      'Other': `I need assistance with ${Math.random() > 0.5 ? 'yard work' : 'a personal project'}. The task involves ${Math.random() > 0.5 ? 'mowing the lawn and trimming hedges' : 'organizing and sorting items'}. Estimated time to complete is ${Math.floor(Math.random() * 4 + 2)} hours.`
    };
    
    const defaultDesc = `I need help with this task. It's related to ${formData.category.toLowerCase()} services. Please contact me for more details about what needs to be done.`;
    
    setFormData(prev => ({ 
      ...prev, 
      description: descriptions[formData.category] || defaultDesc
    }));
    
    setGeneratingDescription(false);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login?redirect=create-task');
      return;
    }
    
    setLoading(true);
    
    try {
      const newTask = await addTask({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        payment: parseFloat(formData.payment),
        location: formData.location,
        status: 'open',
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : undefined,
        postedBy: {
          id: user?.id || '',
          name: user?.name || '',
          rating: user?.rating || 0,
          reviewCount: user?.reviewCount || 0
        }
      });
      
      // Navigate to the new task page
      navigate(`/tasks/${newTask.id}`);
    } catch (error) {
      console.error('Failed to create task:', error);
      alert('Failed to create task. Please try again.');
      setLoading(false);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to post a task</h2>
        <p className="text-gray-600 mb-6">You need to be signed in to post new tasks.</p>
        <div className="flex justify-center gap-4">
          <Button 
            variant="primary" 
            onClick={() => navigate('/login?redirect=create-task')}
          >
            Sign In
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/signup?redirect=create-task')}
          >
            Sign Up
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a New Task</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="E.g., Help with moving furniture"
                required
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Task Description
                </label>
                <button
                  type="button"
                  onClick={generateDescription}
                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={generatingDescription || !formData.title || !formData.category}
                >
                  <Sparkles size={14} className="mr-1" />
                  {generatingDescription ? 'Generating...' : 'Generate Description'}
                </button>
              </div>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Describe the task in detail. What needs to be done? Any specific requirements?"
                required
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-1">
                Budget (USD)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign size={16} className="text-gray-500" />
                </div>
                <input
                  type="number"
                  id="payment"
                  name="payment"
                  min="1"
                  step="0.01"
                  value={formData.payment}
                  onChange={handleInputChange}
                  className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={16} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter address or location"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                In a real app, this would use Google Places Autocomplete API
              </p>
            </div>
            
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date (Optional)
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleInputChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;