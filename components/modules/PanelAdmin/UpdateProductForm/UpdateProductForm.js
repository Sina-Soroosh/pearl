import React, { useRef, useState } from "react";
import { Formik } from "formik";
import styles from "@/styles/modules/PanelAdmin/UpdateProductForm/UpdateProductForm.module.css";
import dynamic from "next/dynamic";
import InfosProduct from "../InfosProduct/InfosProduct";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const EditorText = dynamic(
  () => {
    return import("../EditorText/EditorText");
  },
  { ssr: false }
);

function UpdateProductForm({ categories }) {
  const [desc, setDesc] = useState("");
  const [infos, setInfos] = useState([]);
  const initialValues = {
    title: "",
    shortName: "",
    price: "",
    discount: "",
    category: "",
  };

  const validateHandler = (values) => {
    let errors = {};

    if (!values.title.trim()) {
      errors.title = "لطفا عنوان محصول را وارد کنید.";
    } else if (values.title.trim().length < 3) {
      errors.title = "عنوان محصول حداقل باید 3 کاراکتر باشد";
    }

    if (!values.shortName.trim()) {
      errors.shortName = "لطفا نام کوتاه محصول را وارد کنید.";
    } else if (values.shortName.trim().length < 3) {
      errors.shortName = "نام کوتاه محصول حداقل باید 3 کاراکتر باشد";
    }

    if (!values.price) {
      errors.price = "لطفا قیمت محصول را وارد نمایید";
    } else if (+values.price < 0) {
      errors.price = "لطفا قیمت محصول را به درستی وارد نمایید";
    }

    if (!values.discount) {
      errors.discount = "لطفا تخفیف محصول را وارد نمایید";
    } else if (+values.discount < 0 || +values.discount > 100) {
      errors.discount = "لطفا تخفیف محصول را به درستی وارد نمایید";
    }

    if (!values.category) {
      errors.category = "لطفا دسته بندی محصول را انتخاب نمایید";
    }

    return errors;
  };

  const onSubmit = (values) => {
    if (!desc) {
      Swal.fire({
        title: "لطفا توضیحات محصول را وارد نمایید",
        icon: "error",
        confirmButtonText: "باشه",
      });

      return;
    }

    if (infos.length == 0) {
      Swal.fire({
        title: "لطفا اطلاعات محصول را وارد نمایید",
        icon: "error",
        confirmButtonText: "باشه",
      });

      return;
    }
  };

  return (
    <>
      <div className={styles.form}>
        <div className={styles.content}>
          <Formik
            initialValues={initialValues}
            validate={validateHandler}
            onSubmit={onSubmit}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className={`${styles.image}`}>
                      <img
                        src="/images/products/520c7dbee04ab52bfd3f4441b.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6 row">
                    <div className={`${styles.input_box} col-lg-6`}>
                      <label htmlFor="title">
                        نام محصول <span>*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={values.title}
                        onChange={handleChange}
                      />
                      {touched.title && (
                        <span className={styles.err}>{errors.title}</span>
                      )}
                    </div>
                    <div className={`${styles.input_box} col-lg-6`}>
                      <label htmlFor="shortName">
                        نام کوتاه محصول <span>*</span>
                      </label>
                      <input
                        type="text"
                        id="shortName"
                        value={values.shortName}
                        onChange={handleChange}
                      />
                      {touched.shortName && (
                        <span className={styles.err}>{errors.shortName}</span>
                      )}
                    </div>
                    <div className={`${styles.input_box} col-lg-6`}>
                      <label htmlFor="price">
                        قیمت محصول <span>*</span>
                      </label>
                      <input
                        type="number"
                        id="price"
                        value={values.price}
                        onChange={handleChange}
                        min={0}
                      />
                      {touched.price && (
                        <span className={styles.err}>{errors.price}</span>
                      )}
                    </div>
                    <div className={`${styles.input_box} col-lg-6`}>
                      <label htmlFor="discount">
                        تخفیف محصول <span>*</span>
                      </label>
                      <input
                        type="number"
                        id="discount"
                        value={values.discount}
                        onChange={handleChange}
                        min={0}
                        max={100}
                      />
                      {touched.discount && (
                        <span className={styles.err}>{errors.discount}</span>
                      )}
                    </div>
                    <div className={`${styles.input_box} col-lg-6`}>
                      <label htmlFor="category">
                        دسته بندی محصول <span>*</span>
                      </label>
                      <select
                        name="category"
                        id="category"
                        value={values.category}
                        onChange={handleChange}
                      >
                        <option value="">دسته بندی محصول را انتخاب کنید</option>
                        {categories.map((category) => (
                          <option value={category._id} key={category._id}>
                            {category.title}
                          </option>
                        ))}
                      </select>
                      {touched.category && (
                        <span className={styles.err}>{errors.category}</span>
                      )}
                    </div>
                  </div>
                  <div className={`${styles.input_box}`}>
                    <label>
                      توضیحات محصول <span>*</span>
                    </label>
                    <EditorText value={desc} changeValue={setDesc} />
                  </div>
                  <div className={`${styles.input_box}`}>
                    <label>
                      اطلاعات محصول <span>*</span>
                    </label>
                    <InfosProduct value={infos} changeValue={setInfos} />
                  </div>
                  <input
                    type="submit"
                    value="افزودن محصول"
                    className={styles.submit_btn}
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default UpdateProductForm;
