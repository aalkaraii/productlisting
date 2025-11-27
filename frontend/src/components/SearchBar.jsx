import { RxCross2 } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const SearchBar = () => {
  const { darkMode, searchQuery, setSearchQuery } = useContext(ProductContext);

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div
      className={`w-full px-3 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}>
      <div
        className={`inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}>
        <input
          className={`flex-1 outline-none text-sm bg-transparent ${
            darkMode ? "text-white" : "text-black"
          }`}
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IoSearch className="w-4 hover:text-blue-500" />
      </div>
      {searchQuery && (
        <RxCross2
          className="hover:text-red-600 inline w-5 h-5 cursor-pointer"
          onClick={handleClear}
        />
      )}
    </div>
  );
};

export default SearchBar;
