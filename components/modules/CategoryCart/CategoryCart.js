import React from "react";
import styles from "@/styles/modules/CategoryCart/CategoryCart.module.css";
import Link from "next/link";

function CategoryCart(props) {
  return (
    <>
      <div className="col-lg-3 col-md-4 .col-sm-6">
        <div className={styles.category_cart}>
          <div className={styles.content}>
            <div className={styles.title}>
              <Link href={`/product-category/${props.shortName}`}>
                <h2>{props.title}</h2>
              </Link>
            </div>
            <div className={styles.desc}>
              <span>{props.products.length} مورد</span>
            </div>
            <div className={styles.link}>
              <Link href={`/product-category/${props.shortName}`}>
                + نمایش مجموعه
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryCart;
