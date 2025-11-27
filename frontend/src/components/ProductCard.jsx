import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const ProductCard = ({ product }) => {
  const { darkMode } = useContext(ProductContext);
  return (
    <div
      className={`transition-transform duration-300 ease-in-out 
               hover:scale-103 rounded-lg p-3 shadow-sm 
        ${darkMode ? "bg-gray-600 text-white" : "bg-white text-black"}`}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className=" object-cover rounded-md mb-3"
      />
      <div className=" flex justify-between items-center text-sm font-medium">
        <h2 className="font-semibold  ">{product.title}</h2>

        <p className="font-bold ">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
