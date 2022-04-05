import React from "react";
import { Link } from "react-router-dom";

import { PublicChefModel } from "../../models/UserModel";

import Section from "../Layout/Section";
import Rating from "../shared/Rating";

import styles from "./PublicChef.module.css";
import Button from "../shared/Button";
import { ProductModel } from "../../models/ProductModel";

function PublicChefPageComponent({
  chef,
  products,
}: {
  chef: PublicChefModel;
  products: ProductModel[];
}) {
  return (
    <Section>
      {/* Chef about */}
      <div className={styles.pageContainer}>
        {/* Chef image */}
        <div className={styles.imageContainerWrapper}>
          <img className={styles.avatarImg} src={chef.photo_url} />
        </div>

        {/* Chef about */}
        <div className={styles.aboutWrapper}>
          <h1 className={styles.title}>{chef.fullName}</h1>
          <p>{chef.about}</p>
        </div>
      </div>

      {/* Chef details */}
      <div className={styles.detailsContainer}>
        <div className={styles.storeText}>
          <p>CHEFS STORE</p>
        </div>

        {/* Chef tags */}
        <div className={styles.tagsContainer}>
          <div className={styles.tag}>
            <span>All</span>
          </div>
          {chef.cuisine.map((item) => (
            <div key={item} className={styles.tag}>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Chef products */}
        <div className={styles.productsContainer}>
          <p>All items</p>

          <div className={styles.productsWrapper}>
            {/* Chef product carts */}
            {products.map((product) => (
              <div key={product._id} className={styles.productContainer}>
                <Link to={`/products/${product._id}`}>
                  <div className={styles.productImg}>
                    <img src={product.image} alt="" />
                  </div>
                </Link>

                <div className={styles.productDetails}>
                  <div>
                    <Rating rating={product.rating} />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                  </div>

                  <div className={styles.productDetailsBuy}>
                    <span>{product.price} EUR</span>
                    <div>
                      <Button onClick={() => console.log("click")}>BUY</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

export default PublicChefPageComponent;
