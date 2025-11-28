import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext.jsx";

const Navbar = () => {
  const { darkMode, toggleHandler, priceState, setPriceState } =
    useContext(ProductContext);

  return (
    <div>
      <div
        className={`flex px-4 sm:px-6 md:px-10 items-center justify-between py-4 sm:py-5 font-bold ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}>
        <Link
          to={"/"}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
          Product Lister
        </Link>
        <ul className="flex gap-3 sm:gap-5 text-sm items-center">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p className="text-lg sm:text-xl md:text-2xl">HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] hidden" />
          </NavLink>

          <hr className="w-4 border-none h-[1.5px]" />
          <div onClick={toggleHandler} className="cursor-pointer">
            {darkMode ? (
              <MdWbSunny className="w-6 h-6 sm:w-7 sm:h-7" />
            ) : (
              <FaMoon className="w-6 h-6 sm:w-7 sm:h-7" />
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
