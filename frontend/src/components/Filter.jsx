import React from "react";

const Filter = () => {
  return (
    <div>
      <label className="mr-2 font-medium">Sort by Price:</label>
      <select className="border border-gray-300 rounded-md p-2">
        <option value="default">Default</option>
        <option value="low-to-high">Low to High</option>
        <option value="high-to-low">High to Low</option>
      </select>
    </div>
  );
};

export default Filter;
