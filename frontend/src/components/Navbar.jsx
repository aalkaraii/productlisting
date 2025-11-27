import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { ProductContext } from "../context/ProductContext.jsx";
const Navbar = () => {
  const { darkMode, toggleHandler, setDarkMode } = useContext(ProductContext);

  return (
    <div>
      <div className="flex px-10 items-center justify-between py-5 font-medium">
        <Link to={"/"} className="text-xl">
          Product Lister
        </Link>
        <ul className=" sm:flex gap-5 text-sm  hidden text-gray-700">
          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className="w-2/4 border-none h-[1.5px] hidden bg-gray-700" />
          </NavLink>

          <hr className="w-2/4 border-none h-[1.5px] hidden bg-gray-700" />
          <div onClick={toggleHandler} className="cursor-pointer">
            {" "}
            {darkMode ? (
              <FaMoon className="w-4 h-4" />
            ) : (
              <MdWbSunny className="w-4 h-4" />
            )}{" "}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
