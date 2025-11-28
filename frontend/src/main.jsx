import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ProductContextProvider from "./context/ProductContext.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </ProductContextProvider>
  </BrowserRouter>
);
