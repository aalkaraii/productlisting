import React, { useState, useEffect } from "react";
import axios from "axios";

const SidebarCategories = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-64 bg-gray-100 p-4 h-screen sticky top-0">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <ul className="flex flex-col gap-2">
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onCategorySelect(category)}
            className="cursor-pointer px-3 py-2 rounded hover:bg-gray-300 capitalize">
            {category.replace(/-/g, " ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarCategories;
