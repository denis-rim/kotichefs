import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="bg-gray-50 hidden rounded-3xl relative -top-6 shadow md:block ">
      <div className="flex justify-between content-center">
        <div className="flex justify-start">
          <Link
            to="/"
            className="text-center py-3 px-5 h-max text-gray-500 hover:bg-gray-200 hover:text-gray-700 sm:rounded-tl-3xl sm:rounded-bl-3xl"
          >
            CHEFS
          </Link>
          <Link
            to="/"
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

        <div>search</div>
      </div>
    </div>
  );
}

export default Menu;
