import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onHomeClick, onConnectClick }) => {
  const navigate = useNavigate();

  const handleFavouritesClick = () => {
    navigate('/favorites');
  };
  return (
    <header className="w-full border-b border-light-100/10 bg-dark-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-5 xs:px-10 py-2">
        <div className="flex items-center justify-between">
          {/* Logo/Brand - Left Side */}
          <div 
            onClick={onHomeClick}
            className="cursor-pointer group flex items-center"
          >
            <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white hover:text-purple-200 transition-all duration-300 group-hover:scale-105">
              Movi<span className="text-gradient">Kit</span>
            </h1>
          </div>
          
          {/* Navigation Buttons - Right Side */}
          <div className="flex items-center space-x-3 xs:space-x-4">
            {/* Favourites Button */}
            <button 
              onClick={handleFavouritesClick}
              className="bg-light-100/5 hover:bg-light-100/10 cursor-pointer text-white px-3 xs:px-4 py-1 rounded-lg text-sm xs:text-base font-medium transition-all duration-200 hover:scale-105 border border-light-100/10 hover:border-light-100/20"
            >
              Favorites
            </button>
            
            {/* About Button */}
            <button 
              onClick={onConnectClick}
              className="bg-light-100/5 hover:bg-light-100/10 cursor-pointer text-white px-3 xs:px-4 py-1 rounded-lg text-sm xs:text-base font-medium transition-all duration-200 hover:scale-105 border border-light-100/10 hover:border-light-100/20"
            >
              About
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;