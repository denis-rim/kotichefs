import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PublicChefModel } from "../models/UserModel";
import { ProductModel } from "../models/ProductModel";

import { fetchChefProducts } from "../services/api/handlers/product";
import { fetchChefById } from "../services/api/handlers/chef";

import PublicChefPageComponent from "../components/PublicChef/PublicChefPageComponent";

function ChefPage() {
  const [chef, setChef] = useState<PublicChefModel | null>(null);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const { chefId } = useParams<{ chefId: string | undefined }>();

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    let isIgnoreResponse = false;

    async function getChefById() {
      if (chefId) {
        try {
          const [chefResponse, productsResponse] = await Promise.all([
            fetchChefById(chefId),
            fetchChefProducts(chefId, page),
          ]);

          if (!isIgnoreResponse) {
            setChef(chefResponse.data);
            setProducts(productsResponse.data.products);
            setPageCount(productsResponse.data.pagination.pageCount);
          }
        } catch (err) {
          console.warn(err);
        }
      }
    }

    void getChefById();

    return () => {
      isIgnoreResponse = true;
    };
  }, [chefId]);

  if (!chef) {
    return <div>No chef...</div>;
  }

  return <PublicChefPageComponent chef={chef} products={products} />;
}

export default ChefPage;
