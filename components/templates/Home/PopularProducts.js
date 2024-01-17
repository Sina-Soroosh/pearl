import React from "react";
import styles from "@/styles/templates/Home/PopularProducts.module.css";

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
            <div className="row"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopularProducts;
