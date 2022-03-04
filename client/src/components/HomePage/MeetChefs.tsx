
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getPromotedChefs } from "../../store/actions/ChefActionCreators";
import ChefCard from "./ChefCard";

function MeetChefs() {
  const dispatch = useAppDispatch();
  const { promotedChefs } = useAppSelector((state) => state.chefReducer);

  useEffect(() => {
    dispatch(getPromotedChefs());
  }, [dispatch]);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Meet our Award Winning Chefs
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {promotedChefs.map((chef) => (
            <ChefCard key={chef._id} chef={chef} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MeetChefs;
