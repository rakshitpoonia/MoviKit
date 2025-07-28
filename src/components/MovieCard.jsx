import React from "react";

export const MovieCard = ({
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

  return (
    <div 
      className="movie-card cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={onClick}
    >
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w342/${poster_path}`
            : "./no-movie.png"
        }
        alt={title}
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
};

export default MovieCard;