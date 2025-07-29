import React from 'react';

const Header = ({ onHomeClick, onConnectClick }) => {
  return (
    <header className="w-full border-b border-light-100/10 bg-dark-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-5 xs:px-10 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand - Left Side */}
          <div 
            onClick={onHomeClick}
            className="cursor-pointer group flex items-center"
          >
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white hover:text-purple-200 transition-all duration-300 group-hover:scale-105">
              Movi<span className="text-gradient">Kit</span>
            </h1>
          </div>
          
          {/* Navigation Buttons - Right Side */}
          <div className="flex items-center space-x-3 xs:space-x-4">
            {/* Favourites Button */}
            <button 
              className="bg-light-100/5 hover:bg-light-100/10 cursor-pointer text-white px-3 xs:px-4 py-2 rounded-lg text-sm xs:text-base font-medium transition-all duration-200 hover:scale-105 border border-light-100/10 hover:border-light-100/20"
            >
              Favourites
            </button>
            
            {/* Connect Button */}
            <button 
              onClick={onConnectClick}
              className="bg-light-100/5 hover:bg-light-100/10 cursor-pointer text-white px-3 xs:px-4 py-2 rounded-lg text-sm xs:text-base font-medium transition-all duration-200 hover:scale-105 border border-light-100/10 hover:border-light-100/20"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;