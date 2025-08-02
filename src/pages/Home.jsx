import { useState, useEffect, useRef } from "react";
import Search from "../components/Search";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDebounce } from "react-use";
import { getTrendingMovies } from "../appwrite";
import { useModalContext } from "../contexts/ModalContext";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState(true);
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);
  const trendingListRef = useRef(null);
  const { openModal } = useModalContext();

  // Debounce the search term to prevent making too many API requests
  // by waiting for the user to stop typing for 500ms
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchGenres = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/genre/movie/list`, API_OPTIONS);
      const data = await res.json();
      setGenres(data.genres || []);
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  };

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to Fetch Movies");
      }

      const data = await response.json();
      setMovieList(data.results || []);

    } catch (error) {
      console.error(`Error fetching Movies: ${error}`);
      setErrorMessage("Error Fetching Movies! Please Try Again Later");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTrendingMovies = async () => {
    setIsTrendingLoading(true);
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies || []);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
      setTrendingMovies([]);
    } finally {
      setIsTrendingLoading(false);
    }
  };

  const handleTrendingNavigation = (direction) => {
    const maxIndex = Math.max(0, trendingMovies.length - 5);
    const newIndex = direction === 'next' 
      ? Math.min(currentTrendingIndex + 5, maxIndex)
      : Math.max(0, currentTrendingIndex - 5);
    
    setCurrentTrendingIndex(newIndex);
    
    // Smooth scroll to the new position
    if (trendingListRef.current) {
      const scrollAmount = direction === 'next' ? 1200 : -1200; 
      trendingListRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMovieClick = (movie) => { 
    openModal(movie.id, movie); // Pass both ID and movie data
  };

  const handleTrendingMovieClick = (trendingMovie) => {
    // For trending movies, we need to construct movie object
    const movieData = {
      id: trendingMovie.movie_id,
      title: trendingMovie.searchTerm, 
      poster_path: trendingMovie.poster_url.replace('https://image.tmdb.org/t/p/w500', '')
    };
    openModal(trendingMovie.movie_id, movieData);
  };

  useEffect(() => {
    fetchGenres();
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  // Check if we're in search mode (searchTerm is not empty)
  const isSearchMode = searchTerm.trim() !== "";

  const handleHomeClick = () => {
    setSearchTerm(""); // Clear search term to show homepage
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };
  
  const handleConnectClick = () => {
    // Scroll to footer smoothly
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get the current 5 movies to display
  const currentTrendingMovies = trendingMovies.slice(currentTrendingIndex, currentTrendingIndex + 5);
  const hasMoreTrending = trendingMovies.length > 5 && currentTrendingIndex + 5 < trendingMovies.length;

  return (
    <>
      <div className="pattern" />
      <main>
        <Header 
          onHomeClick={handleHomeClick}
          onConnectClick={handleConnectClick}
        />

      <div className="wrapper">
        <div className="text-center mt-10">
          <img src="./hero.png" alt="Hero Banner" className="w-full max-w-lg h-auto object-contain mx-auto drop-shadow-md" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Trending Section*/}
        {!isSearchMode && (
          <section className="trending">
            <div className="trending-header">
              <h2 className="mt-6 text-4xl text-gradient">Trending Movies</h2>
              <div className="trending-navigation">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleTrendingNavigation('prev');
                  }}
                  disabled={currentTrendingIndex === 0}
                  className="nav-btn prev-btn"
                  type="button"
                  style={{
                    minWidth: '40px',
                    minHeight: '40px',
                    touchAction: 'manipulation'
                  }}
                >
                  &lt;
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleTrendingNavigation('next');
                  }}
                  disabled={!hasMoreTrending}
                  className="nav-btn next-btn"
                  type="button"
                  style={{
                    minWidth: '40px',
                    minHeight: '40px',
                    touchAction: 'manipulation'
                  }}
                >
                  &gt;
                </button>
              </div>
            </div>
            {isTrendingLoading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : currentTrendingMovies.length > 0 ? (
              <ul ref={trendingListRef}>
                {currentTrendingMovies.map((movie, index) => (
                  <li key={movie.$id}>
                    <p>{currentTrendingIndex + index + 1}</p>
                    <img 
                      src={movie.poster_url} 
                      alt={movie.title}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => handleTrendingMovieClick(movie)}
                    />
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        )}

        <section className="all-movies">
          {/* Dynamic heading based on search mode */}
          <h2 className="mt-6 text-4xl text-gradient">
            {isSearchMode ? `Search: ${searchTerm}` : "Popular Movies"}
          </h2>

          {isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  genres={genres}
                  onClick={() => handleMovieClick(movie)}
                />
              ))}
            </ul>
          )}
        </section>
      </div>

      <Footer />
      </main>
    </>
  );
};

export default Home; 