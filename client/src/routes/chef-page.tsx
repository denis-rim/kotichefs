import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/redux";

import { getChefPublicInfo } from "../store/actions/ChefActionCreators";
import { getChefProductsAction } from "../store/actions/ProductActionCreators";

import PublicChefPageComponent from "../components/PublicChef/PublicChefPageComponent";

function ChefPage() {
  const dispatch = useAppDispatch();
  const { products, pagination } = useAppSelector(
    (state) => state.productReducer
  );
  const { currentChef } = useAppSelector((state) => state.chefReducer);

  const { chefId } = useParams<{ chefId: string | undefined }>();

  useEffect(() => {
    async function getChefById() {
      if (chefId) {
        dispatch(getChefPublicInfo(chefId));
        dispatch(getChefProductsAction({ chefId, page: 1 }));
      }
    }

    void getChefById();
  }, [dispatch, chefId]);

  if (!currentChef) {
    return <div>No chef...</div>;
  }

  return (
    <PublicChefPageComponent
      chef={currentChef}
      products={products}
      pagination={pagination}
    />
  );
}

export default ChefPage;
