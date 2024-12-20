import { useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import { Favorite } from "./pages/Favorite/Favorite";
import {WatchList} from './pages/watchList/WatchList'
import SingleMovie from "@/pages/SingleMovie/SingleMovie";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SearchResult from "./pages/SearchResult/SearchResult";

function App() {
  const [isBlurred, setIsBlurred] = useState(false);
  const [movieSection, setMovieSection] = useState("Now Playing");

  const handleBlurToggle = (blurState) => {
    setIsBlurred(blurState);
  };

  return (
    <div className="layout">
      <Navbar
        onSearchToggle={handleBlurToggle}
        setMovieSection={setMovieSection}
        onMenuToggle={handleBlurToggle}
      />
      <main className={`main-content ${isBlurred ? "blurred-content" : ""}`}>
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
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
          <Route path='/search-result/:query' element={<SearchResult/>}></Route>
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
