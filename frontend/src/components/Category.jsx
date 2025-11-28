import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

const Category = () => {
  const categories = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];
  const { selectedCategory, setSelectedCategory } = useContext(ProductContext);
  const [clicked, setClicked] = useState(false);
  const onClickHandler = () => {
    setClicked(!clicked);
    setSelectedCategory("defaultCategory");
  };
  //   onCLickCategory = (e) => {
  //     setSelectedCategory(e.target.value);
  //   };
  return (
    <div>
      <div
        onClick={onClickHandler}
        className="text-xl p-3 border-t border-b cursor-pointer">
        Filter by Category
      </div>
      {/* // display categories here */}
      <div>
        <div
          className={`${
            clicked ? "block" : "hidden"
          } transition-all duration-300 ease-in-out border-b cursor-pointer`}>
          {categories.map((category) => (
            <button
              key={category}
              className={`m-2 px-4 py-2 rounded-full border ${
                selectedCategory === category
                  ? "bg-gray-500 text-white border-gray-500"
                  : "bg-white text-black border-gray-300"
              }`}
              onClick={() => setSelectedCategory(category)}>
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
