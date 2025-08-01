import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../contexts/MovieContext';
import { useModalContext } from '../contexts/ModalContext';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Favorites = () => {
  const navigate = useNavigate();
  const { favorites, isLoading } = useMovieContext();
  const [genres, setGenres] = useState([]);
  const { openModal } = useModalContext();



  const fetchGenres = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/genre/movie/list`, API_OPTIONS);
      const data = await res.json();
      setGenres(data.genres || []);
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  };

  const handleMovieClick = (movieId) => {
    openModal(movieId);
  };

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

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <>
      <div className="pattern" />
      <main>
        <Header 
          onHomeClick={handleHomeClick}
          onConnectClick={handleConnectClick}
        />
        
        <div className="wrapper">
          {isLoading ? (
            <div className="text-center mt-20">
              <div className="favorites-empty">
                <h2 className="text-4xl text-gradient mb-4">Loading favorites...</h2>
                <p className="text-light-100/70 text-lg">Please wait while we load your favorite movies</p>
              </div>
            </div>
          ) : favorites && favorites.length > 0 ? (
            <>
              <h2 className="mt-6 mb-6 text-4xl text-gradient">Your Favorite Movies</h2>
              <section className="all-movies">
                <ul>
                  {favorites.map((movie) => (
                    <MovieCard 
                      key={movie.id} 
                      movie={movie} 
                      genres={genres}
                      onClick={() => handleMovieClick(movie.id)}
                    />
                  ))}
                </ul>
              </section>
            </>
          ) : (
            <div className="text-center mt-20">
              <div className="favorites-empty">
                <h2 className="text-4xl text-gradient mb-4">No favorite movies yet</h2>
                <p className="text-light-100/70 text-lg">Start adding movies to your favorites!</p>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Favorites; 