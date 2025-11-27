import { createContext, useState } from "react";

// Create the context
export const ProductContext = createContext();

// Create the provider component
const ProductContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleHandler = () => {
    setDarkMode((prev) => !prev);
  };

  const value = {
    darkMode,
    toggleHandler,
    setDarkMode,
  };
  console.log("Provider rendering with value:", value); // ADD THIS

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContextProvider;
