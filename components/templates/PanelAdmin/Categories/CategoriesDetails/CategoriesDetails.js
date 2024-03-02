import React from "react";
import styles from "@/panelAdminStyles/categories/CategoriesDetails/CategoriesDetails.module.css";

function CategoriesDetails() {
  return (
    <div className={styles.details}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h3>دسته بندی ها</h3>
        </div>
        <div className={styles.table}></div>
      </div>
    </div>
  );
}

export default CategoriesDetails;
