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
        className={`flex px-10 items-center justify-between py-5 font-bold ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}>
        <Link to={"/"} className="text-4xl font-extrabold">
          Product Lister
        </Link>
        <ul className="sm:flex gap-5 text-sm hidden items-center">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p className="text-2xl">HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] hidden" />
          </NavLink>

          <hr className="w-4 border-none h-[1.5px] hidden" />
          <div onClick={toggleHandler} className="cursor-pointer">
            {darkMode ? (
              <MdWbSunny className="w-7 h-7" />
            ) : (
              <FaMoon className="w-7 h-7" />
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
