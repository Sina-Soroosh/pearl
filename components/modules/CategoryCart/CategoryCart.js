import React from "react";
import styles from "@/styles/modules/CategoryCart/CategoryCart.module.css";
import Link from "next/link";

function CategoryCart() {
  return (
    <>
      <div className="col-lg-3 col-md-4 .col-sm-6">
        <div className={styles.category_cart}>
          <div className={styles.content}>
            <div className={styles.title}>
              <Link href="/product-category/test">
                <h2>صندلی</h2>
              </Link>
            </div>
            <div className={styles.desc}>
              <span>4 مورد</span>
            </div>
            <div className={styles.link}>
              <Link href="/product-category/test">+ نمایش مجموعه</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryCart;
