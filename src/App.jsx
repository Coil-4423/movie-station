import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import { Favorite } from "./pages/Favorite";
import SingleMovie from "./pages/SingleMovie";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import { APP_FOLDER_NAME } from "/globals.js";

function App() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [movieSection, setMovieSection] = useState("Now Playing");

  const handleBlurToggle = (blurState) => {
    setIsBlurred(blurState);
  };

  return (
    <>
      <Navbar
        onSearchToggle={handleBlurToggle}
        setMovieSection={setMovieSection}
        onMenuToggle={handleBlurToggle}
      />
      <div className={isBlurred ? "blurred-content" : ""}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                movieSection={movieSection}
                setMovieSection={setMovieSection}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
        </Routes>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
