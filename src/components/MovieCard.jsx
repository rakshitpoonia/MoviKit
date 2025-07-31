import React from "react";
import { useState } from "react";

const MovieCard = React.memo(({
  movie: { id, title, vote_average, poster_path, release_date, genre_ids },
  genres,
  onClick
}) => {
  const getGenreNames = (ids) => {
    const firstGenre = ids
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean)[0];
    return firstGenre || "Unknown";
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent card click when clicking button
    setIsFavorite(!isFavorite);
  };

  return (
    <div 
      className="movie-card cursor-pointer hover:scale-105 transition-transform duration-200 relative group"
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/80 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-200 flex flex-col justify-end p-4 pointer-events-none">
      </div>
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
          className={`text-xl p-2 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 hover:bg-black/80 hover:border-white border-2 border-transparent cursor-pointer ${isFavorite ? 'text-red-400' : 'text-white'}`}
          onClick={handleButtonClick}
          title="Add to Favorites"
        >
          ♥
        </button>
      </div>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w342/${poster_path}`
            : "./no-movie.png"
        }
        alt={title}
        loading="lazy"
      />
      <div className="mt-4">
        <h3 className="text-lg">{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            <span>•</span>
            <p className="year">
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>
            <span>•</span>
            <p className="genre">{getGenreNames(genre_ids)}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MovieCard;