import React from "react";
import styles from "@/styles/templates/Home/Categories.module.css";
import CategoryCart from "@/components/modules/CategoryCart/CategoryCart";

function Categories() {
  return (
    <>
      <div className={styles.categories}>
        <div className="row">
          <CategoryCart />
          <CategoryCart />
          <CategoryCart />
          <CategoryCart />
          <CategoryCart />
        </div>
      </div>
    </>
  );
}

export default Categories;
