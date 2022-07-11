import React from "react";
import { PublicChefModel } from "../../../models/UserModel";
import ChefCard from "./ChefCard";

export default function ChefCardList({
  promotedChefs,
}: {
  promotedChefs: PublicChefModel[];
}) {
  if (!promotedChefs.length) {
    return null;
  }
  return (
    <>
      {promotedChefs.map((chef) => (
        <ChefCard key={chef._id} chef={chef} />
      ))}
    </>
  );
}
