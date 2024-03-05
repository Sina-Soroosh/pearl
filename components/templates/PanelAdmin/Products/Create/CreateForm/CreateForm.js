import React from "react";
import styles from "@/panelAdminStyles/Products/Create/CreateForm/CreateForm.module.css";
import CreateProductForm from "@/panelAdminModules/CreateProductForm/CreateProductForm";
import Link from "next/link";

function CreateForm() {
  return (
    <>
      <div className={styles.create_form}>
        <div className={styles.content}>
          <div className={styles.top_form}>
            <div className={styles.title}>
              <h3>افزودن محصول</h3>
            </div>
            <div className={styles.create_product}>
              <Link href="/p-admin/products/" className="btn btn-primary">
                لیست محصولات
              </Link>
            </div>
          </div>
          <div className={styles.form}>
            <CreateProductForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateForm;
