import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieModal = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
      fetchMovieVideos();
    }
  }, [movieId]);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/${movieId}`, API_OPTIONS);
      if (!response.ok) throw new Error('Failed to fetch movie details');
      const data = await response.json();
      setMovieDetails(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchMovieVideos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movie/${movieId}/videos`, API_OPTIONS);
      if (!response.ok) throw new Error('Failed to fetch movie videos');
      const data = await response.json();
      setVideos(data.results || []);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatRating = (rating) => {
    return rating ? rating.toFixed(1) : 'N/A';
  };

  const getTrailerUrl = () => {
    const trailer = videos.find(video => 
      video.type === 'Trailer' && video.site === 'YouTube'
    );
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
        <div 
          className="rounded-2xl p-8 shadow-2xl" 
          style={{ 
            backgroundColor: '#0f0d23',
            boxShadow: '0 25px 50px -12px rgba(147, 51, 234, 0.5), 0 0 0 1px rgba(147, 51, 234, 0.1)'
          }}
        >
          <div className="flex justify-center">
            <Spinner />
          </div>
          <p className="text-white mt-4">Loading movie details...</p>
        </div>
      </div>
    );
  };

  if (error || !movieDetails) {
    return (
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
        <div 
          className="rounded-2xl p-8 max-w-md" 
          style={{ 
            backgroundColor: '#0f0d23',
            boxShadow: '0 25px 50px -12px rgba(147, 51, 234, 0.5), 0 0 0 1px rgba(147, 51, 234, 0.1)'
          }}
        >
          <p className="text-red-500 mb-4">{error || 'Failed to load movie details'}</p>
          <button 
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-6"
      onClick={handleOverlayClick}
    >
      <div 
        className="rounded-2xl max-w-6xl w-full max-h-[85vh] overflow-y-auto relative transform transition-all duration-300 ease-out scale-100 scrollbar-thin scrollbar-thumb-scroll-thumb scrollbar-track-scroll-track modal-scrollbar" 
        style={{ 
          backgroundColor: '#0f0d23',
          boxShadow: '0 25px 50px -12px rgba(147, 51, 234, 0.6), 0 0 0 1px rgba(147, 51, 234, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-white text-3xl hover:scale-110 hover:text-purple-400 transition-all cursor-pointer w-12 h-12 rounded-full flex items-center justify-center bg-white/30"
        >
          ✕
        </button>

        {/* Header with Rating and Title */}
        <div className="px-8 pt-8 pb-6">
          {/* Movie Title */}
          <h1 className="text-6xl font-bold text-white bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
            {movieDetails.title}
          </h1>
          
          {/* Year, Rating, Duration with Rating Badge */}
          <div className="flex items-center gap-4 text-gray-300 text-lg mb-6">
            <span>{new Date(movieDetails.release_date).getFullYear()}</span>
            <span>•</span>
            <span className="bg-gray-700 px-3 py-1 rounded border border-purple-500/20">
              {movieDetails.adult ? 'R' : 'PG-13'}
            </span>
            <span>•</span>
            <span>{formatRuntime(movieDetails.runtime)}</span>
            <span>•</span>
            <div 
              className="text-white px-3 py-1 rounded-lg font-bold text-lg"
              style={{ backgroundColor: '#221F3D' }}
            >
              ⭐ {formatRating(movieDetails.vote_average)}/10
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col md:flex-row px-4 sm:px-8 pb-8 gap-8">
          {/* Left Side - Poster */}
          <div className="w-full md:w-80 flex-shrink-0 mb-8 md:mb-0">
            <div className="relative">
              <img
                src={
                  movieDetails.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
                    : './no-movie.png'
                }
                alt={movieDetails.title}
                className="w-full rounded-xl"
                
              />
            </div>
            
            {/* Trailer Button */}
            {getTrailerUrl() && (
              <button
                onClick={() => window.open(getTrailerUrl(), '_blank')}
                 className="w-full mt-4 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 text-base font-medium shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02] cursor-pointer hover:bg-white/40 bg-white/30"
              >
                ▶ Watch Trailer
              </button>
            )}
          </div>

          {/* Right Side - Info Grid */}
          <div className="flex-1 space-y-8">
            {/* Genres Row */}
            <div className="flex">
              <div className="w-32 flex-shrink-0">
                <h3 className="text-purple-300 text-lg font-medium">Genres</h3>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-3">
                  {movieDetails.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="text-white px-4 py-2 rounded-lg text-sm font-medium"
                      style={{ backgroundColor: '#221F3D' }}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Overview Row */}
            <div className="flex">
              <div className="w-32 flex-shrink-0">
                <h3 className="text-purple-300 text-lg font-medium">Overview :</h3>
              </div>
              <div className="flex-1">
                <p className="text-white leading-relaxed text-base mt-1">
                  {movieDetails.overview || 'No overview available.'}
                </p>
              </div>
            </div>

            {/* Release Date Row */}
            <div className="flex">
              <div className="w-32 flex-shrink-0">
                <h3 className="text-purple-300 text-lg font-medium">Release date :</h3>
              </div>
              <div className="flex-1">
                <p className="text-white text-base mt-1">
                  {movieDetails.release_date ? 
                    new Date(movieDetails.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) + ' (Worldwide)' : 'N/A'
                  }
                </p>
              </div>
            </div>

            {/* Countries Row */}
            <div className="flex">
              <div className="w-32 flex-shrink-0">
                <h3 className="text-purple-300 text-lg font-medium">Countries :</h3>
              </div>
              <div className="flex-1">
                <p className="text-white text-base mt-1">
                  {movieDetails.production_countries?.length > 0
                    ? movieDetails.production_countries.map(country => country.name).join(' • ')
                    : 'N/A'
                  }
                </p>
              </div>
            </div>

            {/* Status Row */}
            <div className="flex">
              <div className="w-32 flex-shrink-0">
                <h3 className="text-purple-300 text-lg font-medium">Status :</h3>
              </div>
              <div className="flex-1">
                <p className="text-white text-base mt-1">{movieDetails.status || 'N/A'}</p>
              </div>
            </div>

            {/* Language Row */}
            <div className="flex">
              <div className="w-32 flex-shrink-0">
                <h3 className="text-purple-300 text-lg font-medium">Language :</h3>
              </div>
              <div className="flex-1">
                <p className="text-white text-base mt-1">
                  {movieDetails.spoken_languages?.length > 0
                    ? movieDetails.spoken_languages.map(lang => lang.english_name).join(' , ')
                    : 'N/A'
                  }
                </p>
              </div>
            </div>

            {/* Production Companies Row */}
            {movieDetails.production_companies?.length > 0 && (
              <div className="flex">
                <div className="w-32 flex-shrink-0">
                  <h3 className="text-purple-300 text-lg font-medium">Production Companies :</h3>
                </div>
                <div className="flex-1">
                  <p className="text-white text-base mt-1">
                    {movieDetails.production_companies.map(company => company.name).join(' , ')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;