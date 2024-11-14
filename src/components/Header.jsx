import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';

function Header({ onSearch, profilePhoto }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200 shadow-md m-2 my-2">
      <h1 className="text-3xl font-bold text-gray-700">Welcome to SaferUse</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="p-2 pl-10 rounded border border-gray-300 focus:outline-none focus:border-gray-500"
          />
          <span 
            className="absolute left-3 top-2.5 text-gray-500 cursor-pointer"
            onClick={handleSearch}
          >
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>

        <div className="relative flex items-center">
          <span className="cursor-pointer text-gray-600 hover:text-gray-800 bg-gray-300 rounded-full p-2 transition duration-200">
            <FontAwesomeIcon icon={faBell} />
          </span>
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5">
            3
          </span>
        </div>

        <Link to="/settings" className="flex items-center">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Admin Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
          )}
        </Link>
      </div>
    </div>
  );
}

export default Header;
