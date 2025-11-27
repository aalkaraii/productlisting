import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const Filter = () => {
  const { priceState, setPriceState, darkMode } = useContext(ProductContext);
  const onClickHandler = (e) => {
    setPriceState(e.target.value);
    // You can add logic here to update the filterPrice in context
  };
  return (
    <div>
      <label className="mr-2 font-medium">Sort by Price:</label>
      <select
        onClick={onClickHandler}
        className={`border border-gray-300 rounded-md p-2 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}>
        <option value="default">Default</option>
        <option value="low-to-high">Low to High</option>
        <option value="high-to-low">High to Low</option>
      </select>
    </div>
  );
};

export default Filter;
