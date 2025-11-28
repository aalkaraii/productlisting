import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchBar from "./components/SearchBar";
import About from "./pages/Cart";
import Collection from "./pages/Theme";
import Filter from "./components/Filter";
import { ProductContext } from "./context/ProductContext";
import Category from "./components/Category";

const App = () => {
  const { darkMode } = useContext(ProductContext);
  return (
    <div
      className={`px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-40 min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}>
      <Navbar />

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 my-4">
        <SearchBar />
        <Filter />
      </div>

      <Category />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
    </div>
  );
};

export default App;
