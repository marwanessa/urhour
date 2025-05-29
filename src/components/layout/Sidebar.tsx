import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Map, UserCircle, Settings, HelpCircle, Mail, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from '../../translations';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { isAuthenticated, user } = useAuth();
  const { t } = useTranslation();

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64 md:flex-shrink-0`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between h-16 px-4 border-b md:hidden">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">TaskHub</span>
          </Link>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          <Link 
            to="/" 
            className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            onClick={() => toggleSidebar()}
          >
            <Home className="mr-3 h-5 w-5 text-gray-500" />
            {t('home')}
          </Link>
          
          <Link 
            to="/map" 
            className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            onClick={() => toggleSidebar()}
          >
            <Map className="mr-3 h-5 w-5 text-gray-500" />
            {t('taskMap')}
          </Link>
          
          {isAuthenticated && (
            <>
              <Link 
                to={`/profile/${user?.id}`}
                className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                onClick={() => toggleSidebar()}
              >
                <UserCircle className="mr-3 h-5 w-5 text-gray-500" />
                {t('profile')}
              </Link>
              
              <Link 
                to="/messages" 
                className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                onClick={() => toggleSidebar()}
              >
                <Mail className="mr-3 h-5 w-5 text-gray-500" />
                {t('messages')}
              </Link>
              
              <Link 
                to="/my-tasks" 
                className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                onClick={() => toggleSidebar()}
              >
                <FileText className="mr-3 h-5 w-5 text-gray-500" />
                {t('myTasks')}
              </Link>
            </>
          )}
        </nav>
        
        <div className="p-4 border-t">
          <Link 
            to="/help" 
            className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
            onClick={() => toggleSidebar()}
          >
            <HelpCircle className="mr-3 h-5 w-5 text-gray-500" />
            {t('help')}
          </Link>
          
          {isAuthenticated && (
            <Link 
              to="/settings" 
              className="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              onClick={() => toggleSidebar()}
            >
              <Settings className="mr-3 h-5 w-5 text-gray-500" />
              {t('settings')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;