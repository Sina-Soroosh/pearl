import React from "react";
import styles from "@/styles/templates/Home/Categories.module.css";
import CategoryCart from "@/components/modules/CategoryCart/CategoryCart";

function Categories({ categories }) {
  return (
    <>
      <div className={styles.categories}>
        <div className="row">
          {categories.map((category) => (
            <CategoryCart {...category} key={category._id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;
