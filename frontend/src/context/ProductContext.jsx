import { createContext, useState } from "react";

// Create the context
export const ProductContext = createContext();

// Create the provider component
const ProductContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceState, setPriceState] = useState("default");
  const toggleHandler = () => {
    setDarkMode((prev) => !prev);
  };

  const value = {
    darkMode,
    toggleHandler,
    setDarkMode,
    searchQuery,
    setSearchQuery,
    priceState,
    setPriceState,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContextProvider;
