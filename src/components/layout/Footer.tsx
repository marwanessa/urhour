import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} TaskHub. All rights reserved.
            </p>
          </div>
          <div className="mt-4 flex justify-center md:mt-0">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Terms</span>
                <span className="text-sm">Terms of Service</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Privacy</span>
                <span className="text-sm">Privacy Policy</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Contact</span>
                <span className="text-sm">Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;