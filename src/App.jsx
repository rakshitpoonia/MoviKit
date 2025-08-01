import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { MovieProvider } from "./contexts/MovieContext";
import { ModalProvider } from "./contexts/ModalContext";
import GlobalModal from "./components/GlobalModal";


// Main App component with routing
const App = () => {
  return (
    <MovieProvider>
      <ModalProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        <GlobalModal />
      </ModalProvider>
    </MovieProvider>
  );
};

export default App;