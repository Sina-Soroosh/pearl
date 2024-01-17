import React from "react";
import styles from "@/styles/templates/Home/PopularProducts.module.css";
import ProductCart from "@/components/modules/ProductCart/ProductCart";
import Link from "next/link";

function PopularProducts() {
  return (
    <>
      <div className={styles.popular_products}>
        <div className="container-fluid">
          <div className={styles.content}>
            <div className={styles.title}>
              <h2>محبوب ترین محصولات</h2>
            </div>
            <div className={styles.desc}>
              <p>
                ایده های درخشان تان را با انتخاب از شگفت انگیزهای کاغذ دیواری،
                کف پوش، لامپ و … محقق کنید!
              </p>
            </div>
            <div className="row">
              <ProductCart />
              <ProductCart />
              <ProductCart />
              <ProductCart />
              <ProductCart />
              <ProductCart />
              <ProductCart />
              <ProductCart />
            </div>

            <div className={styles.products_link}>
              <Link href="/shop">+ نمایش همه محصولات</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopularProducts;
