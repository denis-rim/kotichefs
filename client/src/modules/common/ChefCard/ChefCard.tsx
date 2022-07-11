import React from "react";
import { Link } from "react-router-dom";
import { PublicChefModel } from "../../../models/UserModel";
import styles from "./ChefCard.module.css";

function ChefCard({ chef }: { chef: PublicChefModel }) {
  if (!chef) {
    return null;
  }
  return (
    <div key={chef._id} style={{ position: "relative" }}>
      <div className={styles.imageContainer}>
        <img src={chef.photo_url} alt={`${chef.fullName}'s photo`} />
      </div>
      <div className={styles.contentContainer}>
        <div>
          <h3>
            <Link to={`/chefs/${chef._id}`}>
              <span aria-hidden="true" />
              {chef.fullName}
            </Link>
          </h3>
          <p>{chef.about}</p>
        </div>
      </div>
    </div>
  );
}

export default ChefCard;
