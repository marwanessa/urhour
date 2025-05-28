import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MapPin, Bell, User, PlusCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none md:hidden"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center">
              <MapPin className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">TaskHub</span>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/map" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Task Map
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/create-task" className="hidden md:flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              <PlusCircle className="h-4 w-4 mr-1" />
              Post Task
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center">
                <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
                  <Bell size={20} />
                </button>
                <Link to={`/profile/${user?.id}`} className="ml-3 flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  Log in
                </Link>
                <Link to="/signup" className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;