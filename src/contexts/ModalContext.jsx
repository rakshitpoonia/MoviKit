import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const openModal = (movieId) => {
        setSelectedMovieId(movieId);
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