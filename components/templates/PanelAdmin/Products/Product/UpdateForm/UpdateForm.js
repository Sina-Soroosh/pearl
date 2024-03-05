import React from "react";
import styles from "@/panelAdminStyles/Products/Product/UpdateForm/UpdateForm.module.css";
import Link from "next/link";
import UpdateProductForm from "@/panelAdminModules/UpdateProductForm/UpdateProductForm";

function UpdateForm(props) {
  return (
    <>
      <div className={styles.update_form}>
        <div className={styles.content}>
          <div className={styles.top_form}>
            <div className={styles.title}>
              <h3>جزییات محصول</h3>
            </div>
            <div className={styles.create_product}>
              <Link href="/p-admin/products/" className="btn btn-primary">
                لیست محصولات
              </Link>
            </div>
          </div>
          <div className={styles.form}>
            <UpdateProductForm
              categories={props.categories}
              product={props.product}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateForm;
