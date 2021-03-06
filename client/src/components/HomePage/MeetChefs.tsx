import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getPromotedChefs } from "../../store/actions/ChefActionCreators";
import Spinner from "../Spinner/Spinner";
import ChefCardList from "../../modules/common/ChefCard/ChefCardList";

function MeetChefs() {
  const dispatch = useAppDispatch();
  const { promotedChefs, isLoading } = useAppSelector(
    (state) => state.chefReducer
  );

  useEffect(() => {
    dispatch(getPromotedChefs());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Meet our Award Winning Chefs
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <ChefCardList promotedChefs={promotedChefs} />
        </div>
      </div>
    </div>
  );
}

export default MeetChefs;
