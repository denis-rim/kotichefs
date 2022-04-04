import React, { useEffect, useState } from "react";

import { PublicChefModel } from "../models/UserModel";
import { useParams } from "react-router-dom";
import { fetchChefById } from "../services/api/handlers/chef";
import PublicChef from "../components/PublicChef/PublicChef";

function ChefPage() {
  const [chef, setChef] = useState<PublicChefModel | null>(null);
  const { chefId } = useParams<{ chefId: string | undefined }>();

  useEffect(() => {
    let isIgnoreResponse = false;

    async function getChefById() {
      if (chefId) {
        try {
          const response = await fetchChefById(chefId);

          if (!isIgnoreResponse) {
            setChef(response.data);
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

  return <PublicChef chef={chef} />;
}

export default ChefPage;
