import React from "react";

const LoadingCard = () => {
  return (
    <div className="">
      <div className=" rounded-lg p-3 shadow-sm bg-gray-400 ">
        <img className="w-full h-40 object-cover rounded-md mb-3" />

        <h2 className="font-semibold text-gray-900 bg-gray-600 "></h2>

        <p className="text-sm text-gray-500 mb-2"></p>
        <div className=" flex justify-between items-center text-sm font-medium">
          <p className="text-gray-800">
            Category: <span className=""></span>
          </p>

          <p className="font-bold text-black"></p>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
