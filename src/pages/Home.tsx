import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, DollarSign, MessageCircle } from 'lucide-react';
import TaskList from '../components/tasks/TaskList';
import Button from '../components/ui/Button';
import { useTask } from '../contexts/TaskContext';

const Home: React.FC = () => {
  const { tasks, loading } = useTask();
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl overflow-hidden shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find help for any task, <br />anytime, anywhere
          </h1>
          <p className="mt-6 text-xl text-blue-50 max-w-3xl">
            Post tasks you need help with or find opportunities to earn money by helping others in your community.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link to="/create-task">
              <Button size="lg" variant="primary" fullWidth>
                Post a Task
              </Button>
            </Link>
            <Link to="/map">
              <Button size="lg" variant="outline" fullWidth>
                Find Tasks Nearby
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <Link
              key={category.name}
              to={`/?category=${category.name}`}
              className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow duration-200"
            >
              <div className="h-12 w-12 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center">
                {category.icon}
              </div>
              <h3 className="font-medium text-gray-900">{category.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{category.count} tasks</p>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Search Section */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            Search for tasks in your area
          </h2>
          <div className="flex items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-3 sm:text-sm border-gray-300 rounded-l-md"
                placeholder="Search tasks or keywords..."
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-40 sm:w-64 pl-10 py-3 sm:text-sm border-gray-300 border-l-0"
                placeholder="Location"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-3 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Search
            </button>
          </div>
        </div>
      </section>
      
      {/* Recent Tasks Section */}
      <section>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <TaskList tasks={tasks.slice(0, 6)} title="Recent Tasks" />
        )}
        
        <div className="mt-8 text-center">
          <Link to="/tasks">
            <Button variant="outline">
              View All Tasks
            </Button>
          </Link>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Post a Task</h3>
            <p className="text-gray-600">
              Describe what you need help with, set your budget, and choose a location.
            </p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Get Offers</h3>
            <p className="text-gray-600">
              Receive responses from qualified helpers in your area ready to assist.
            </p>
          </div>
          
          <div className="text-center">
            <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Get It Done</h3>
            <p className="text-gray-600">
              Choose a helper, get your task completed, and pay securely through the platform.
            </p>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">What People Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  {testimonial.initial}
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{testimonial.name}</h3>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Sample data for categories
const categories = [
  { name: 'Cleaning', icon: <DollarSign size={24} className="text-blue-500" />, count: 48 },
  { name: 'Delivery', icon: <DollarSign size={24} className="text-blue-500" />, count: 36 },
  { name: 'Handyman', icon: <DollarSign size={24} className="text-blue-500" />, count: 52 },
  { name: 'Moving', icon: <DollarSign size={24} className="text-blue-500" />, count: 29 },
  { name: 'Pet Care', icon: <DollarSign size={24} className="text-blue-500" />, count: 18 },
  { name: 'Other', icon: <DollarSign size={24} className="text-blue-500" />, count: 64 }
];

// Sample data for testimonials
const testimonials = [
  {
    name: 'Alex S.',
    initial: 'A',
    rating: 5,
    text: 'I needed help moving furniture to my new apartment and found the perfect helper on TaskHub. The process was smooth and affordable!'
  },
  {
    name: 'Mia T.',
    initial: 'M',
    rating: 4,
    text: 'As a busy professional, I love being able to outsource tasks like grocery shopping and home cleaning. This platform has been a game-changer!'
  },
  {
    name: 'Jordan L.',
    initial: 'J',
    rating: 5,
    text: 'I\'ve been earning extra income by helping people with tasks in my neighborhood. The flexible schedule and easy payment system are great!'
  }
];

export default Home;