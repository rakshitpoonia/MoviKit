import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext)

// provide state to any component wrapped in MovieProvider
export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
}