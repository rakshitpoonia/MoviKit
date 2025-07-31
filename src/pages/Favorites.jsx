import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Favorites = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    // Navigate to home page
    navigate('/');
  };
  
  const handleConnectClick = () => {
    // Scroll to footer smoothly
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="pattern" />
      <main>
        <Header 
          onHomeClick={handleHomeClick}
          onConnectClick={handleConnectClick}
        />
        
        <div className="wrapper">
          <div className="text-center mt-20">
            <div className="favorites-empty">
              <h2 className="text-4xl text-gradient mb-4">No favorite movies yet</h2>
              <p className="text-light-100/70 text-lg">Start adding movies to your favorites!</p>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Favorites; 