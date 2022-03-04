import React from 'react'
import { Link } from "react-router-dom";
import Search from "../Layout/Search";

function Menu() {
  return (
    <div
      className={`bg-gray-50 hidden rounded-3xl relative -top-10  shadow lg:block`}
    >
      <div className="flex justify-between content-center">
        <div className="flex justify-start">
          <Link
            to="/"
            className="text-center py-3 px-5 h-max text-gray-500 hover:bg-gray-200 hover:text-gray-700 sm:rounded-tl-3xl sm:rounded-bl-3xl"
          >
            CHEFS
          </Link>
          <Link
            to="/products"
            className="text-center py-3 px-5 h-max text-gray-500 hover:bg-gray-200 hover:text-gray-700 "
          >
            CHEFS MENU
          </Link>
          <Link
            to="/"
            className="text-center py-3 px-5 h-max text-gray-500 hover:bg-gray-200 hover:text-gray-700 "
          >
            FAQ
          </Link>
          <Link
            to="/"
            className="text-center py-3 px-5 h-max text-gray-500 hover:bg-gray-200 hover:text-gray-700 "
          >
            ABOUT US
          </Link>
        </div>

        <div className="flex justify-center mr-3">
          <Search />
        </div>
      </div>
    </div>
  );
}

export default Menu;
