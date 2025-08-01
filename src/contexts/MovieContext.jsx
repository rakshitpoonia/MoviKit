import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext)

// provide state to any component wrapped in MovieProvider
export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isInitialized, setIsInitialized] = useState(false)

    useEffect(() => {
        const storedFavs = localStorage.getItem('favorites')
        if (storedFavs) {
            try {
                const parsedFavs = JSON.parse(storedFavs)
                setFavorites(parsedFavs)
            } catch (error) {
                console.error('Error parsing favorites from localStorage:', error)
                localStorage.removeItem('favorites') // Clear corrupted data
            }
        }
        setIsLoading(false)
        setIsInitialized(true)
    }, [])

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('favorites', JSON.stringify(favorites))
        }
    }, [favorites, isInitialized])

    const addToFavorite = (movie) => {
        // take prev(current value of favorites) and add new movie to it and set favorites arr
        setFavorites((prev) => [...prev, movie])
    }
    const removeFromFavorites = (movieId) => {
        // filters out movie with matching id and returns new favorites arr
        setFavorites((prev) => prev.filter((movie) => movie.id !== movieId))
    }
    // check if movie is in favorites array
    const isFavorite = (movieId) => {
        return favorites.some((movie) => movie.id === movieId)
    }

    const value = {
        favorites,
        isLoading,
        addToFavorite,
        removeFromFavorites,
        isFavorite
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}