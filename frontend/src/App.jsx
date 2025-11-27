import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SearchBar from "./components/SearchBar";
import About from "./pages/Cart";
import Collection from "./pages/Theme";
import Filter from "./components/Filter";
import { ProductContext } from "./context/ProductContext";

const App = () => {
  const { darkMode } = useContext(ProductContext);
  return (
    <div
      className={`px-40  sm:px-[5vm] md:px-[7vm] lg:px-[9vm] xl:px-[11vm] 2xl:px-[13vm] min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}>
      <Navbar />
      <div className="flex flex-row justify-between items-center my-4">
        <SearchBar />
        <Filter />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
    </div>
  );
};

export default App;
