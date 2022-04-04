import React from "react";

import Section from "../Layout/Section";
import { PublicChefModel } from "../../models/UserModel";

import styles from "./PublicChef.module.css";
import { Link } from "react-router-dom";

function PublicChef({ chef }: { chef: PublicChefModel }) {
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
            <Link
              to={`/products/61f54a4967770caf7c938859`}
              className={styles.productContainer}
            >
              <div className={styles.productImg}>
                <img
                  src="https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2011/10/Cream-of-tomato-soup-scaled.jpg"
                  alt=""
                />
              </div>

              <div className={styles.productDetails}>
                <h3>Tomato soup</h3>
                <p>Goods old Tomato Soup</p>

                <div className={styles.productDetailsBuy}>
                  <span>50 EUR</span>
                  <div>BUY</div>
                </div>
              </div>
            </Link>

            <Link
              to={`/products/61f54a4967770caf7c938859`}
              className={styles.productContainer}
            >
              <div className={styles.productImg}>
                <img
                  src="https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2011/10/Cream-of-tomato-soup-scaled.jpg"
                  alt=""
                />
              </div>

              <div className={styles.productDetails}>
                <h3>Tomato soup</h3>
                <p>Goods old Tomato Soup</p>

                <div className={styles.productDetailsBuy}>
                  <span>50 EUR</span>
                  <div>BUY</div>
                </div>
              </div>
            </Link>

            <Link
              to={`/products/61f54a4967770caf7c938859`}
              className={styles.productContainer}
            >
              <div className={styles.productImg}>
                <img
                  src="https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2011/10/Cream-of-tomato-soup-scaled.jpg"
                  alt=""
                />
              </div>

              <div className={styles.productDetails}>
                <h3>Tomato soup</h3>
                <p>Goods old Tomato Soup</p>

                <div className={styles.productDetailsBuy}>
                  <span>50 EUR</span>
                  <div>BUY</div>
                </div>
              </div>
            </Link>

            <Link
              to={`/products/61f54a4967770caf7c938859`}
              className={styles.productContainer}
            >
              <div className={styles.productImg}>
                <img
                  src="https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2011/10/Cream-of-tomato-soup-scaled.jpg"
                  alt=""
                />
              </div>

              <div className={styles.productDetails}>
                <h3>Tomato soup</h3>
                <p>Goods old Tomato Soup</p>

                <div className={styles.productDetailsBuy}>
                  <span>50 EUR</span>
                  <div>BUY</div>
                </div>
              </div>
            </Link>

            <Link
              to={`/products/61f54a4967770caf7c938859`}
              className={styles.productContainer}
            >
              <div className={styles.productImg}>
                <img
                  src="https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2011/10/Cream-of-tomato-soup-scaled.jpg"
                  alt=""
                />
              </div>

              <div className={styles.productDetails}>
                <h3>Tomato soup</h3>
                <p>Goods old Tomato Soup</p>

                <div className={styles.productDetailsBuy}>
                  <span>50 EUR</span>
                  <div>BUY</div>
                </div>
              </div>
            </Link>

            <Link
              to={`/products/61f54a4967770caf7c938859`}
              className={styles.productContainer}
            >
              <div className={styles.productImg}>
                <img
                  src="https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/63/2011/10/Cream-of-tomato-soup-scaled.jpg"
                  alt=""
                />
              </div>

              <div className={styles.productDetails}>
                <h3>Tomato soup</h3>
                <p>Goods old Tomato Soup</p>

                <div className={styles.productDetailsBuy}>
                  <span>50 EUR</span>
                  <div>BUY</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default PublicChef;
