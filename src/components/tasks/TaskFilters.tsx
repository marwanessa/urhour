import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface FiltersProps {
  filters: {
    category: string;
    priceRange: { min: number; max: number };
    distance: number;
    sortBy: string;
  };
  onFilterChange: (filters: any) => void;
}

const TaskFilters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    'All Categories',
    'Cleaning',
    'Delivery',
    'Handyman',
    'Moving',
    'Pet Care',
    'Other'
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest first' },
    { value: 'price_high', label: 'Price: High to low' },
    { value: 'price_low', label: 'Price: Low to high' }
  ];

  const handleCategoryChange = (category: string) => {
    const newFilters = {
      ...localFilters,
      category: category === 'All Categories' ? '' : category
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = {
      ...localFilters,
      sortBy: e.target.value
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (min: number, max: number) => {
    const newFilters = {
      ...localFilters,
      priceRange: { min, max }
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = {
      ...localFilters,
      distance: parseInt(e.target.value)
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Filter size={18} className="text-gray-500 mr-2" />
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? (
            <ChevronUp size={20} />
          ) : (
            <ChevronDown size={20} />
          )}
        </button>
      </div>

      <div className={`mt-4 ${isExpanded ? 'block' : 'hidden'}`}>
        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    (category === 'All Categories' && !localFilters.category) || 
                    localFilters.category === category
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-700">Price Range</h4>
              <span className="text-sm text-gray-500">
                ${localFilters.priceRange.min} - ${localFilters.priceRange.max}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={localFilters.priceRange.max}
                onChange={(e) => handlePriceChange(localFilters.priceRange.min, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Distance */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-700">Distance</h4>
              <span className="text-sm text-gray-500">{localFilters.distance} miles</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={localFilters.distance}
              onChange={handleDistanceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Sort By */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Sort By</h4>
            <select
              value={localFilters.sortBy}
              onChange={handleSortChange}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;