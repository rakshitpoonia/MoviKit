import React from 'react';
import MovieModal from './MovieModal';
import { useModalContext } from '../contexts/ModalContext';

const GlobalModal = () => {
  const { selectedMovieId, closeModal } = useModalContext();

  return (
    <>
      {selectedMovieId && (
        <MovieModal 
          movieId={selectedMovieId}   
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default GlobalModal; 