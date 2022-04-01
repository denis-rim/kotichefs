import React from "react";
import { Link } from "react-router-dom";

import { PublicChef } from "../../models/UserModel";

function ChefCard({ chef }: { chef: PublicChef }) {
  return (
    <div key={chef._id} className="group relative">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          src={chef.photo_url}
          alt={`${chef.fullName}'s photo`}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-2 flex justify-start">
        <div>
          <h3 className="text-lg font-bold text-gray-700">
            <Link to={`/chefs/${chef._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {chef.fullName}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{chef.about}</p>
        </div>
      </div>
    </div>
  );
}

export default ChefCard;
