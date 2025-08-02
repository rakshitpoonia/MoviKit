import { createContext, useContext, useState } from "react";
import { updateClickCount } from "../appwrite";

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const openModal = async (movieId, movieData = null) => {
        setSelectedMovieId(movieId);
        
        // Track click if movie data is provided
        if (movieData) {
            await updateClickCount(movieData);
        }
    };

    const closeModal = () => {
        setSelectedMovieId(null);

    };

    const value = {
        selectedMovieId,
        openModal,
        closeModal
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
}; 