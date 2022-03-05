import React from "react";
import { Link } from "react-router-dom";
import Search from "../Layout/Search";

const menuLinks = [
  {
    name: "CHEFS",
    link: "/chefs",
  },
  {
    name: "CHEFS MENU",
    link: "/products",
  },
  {
    name: "FAQ",
    link: "/faq",
  },
  {
    name: "ABOUT US",
    link: "/about",
  },
];

function Menu() {
  return (
    <div
      className={`bg-gray-50 hidden rounded-3xl relative -top-10  shadow lg:block`}
    >
      <div className="flex justify-between content-center">
        <div className="flex justify-start">
          {menuLinks.map((link, index) => (
            <MenuLink
              key={index}
              to={link.link}
              text={link.name}
              firstItem={index === 0}
            />
          ))}
        </div>

        <div className="flex justify-center mr-3">
          <Search />
        </div>
      </div>
    </div>
  );
}

function MenuLink({
  to,
  text,
  firstItem,
}: {
  to: string;
  text: string;
  firstItem: boolean;
}) {
  return (
    <Link
      to={to}
      className={
        firstItem
          ? "text-center py-3 px-5 h-max text-gray-500 hover:bg-gray-200 hover:text-gray-700 sm:rounded-tl-3xl sm:rounded-bl-3xl"
          : "text-center py-3 px-5 h-max text-gray-500 hover:bg-gray-200 hover:text-gray-700"
      }
    >
      {text}
    </Link>
  );
}

export default Menu;
