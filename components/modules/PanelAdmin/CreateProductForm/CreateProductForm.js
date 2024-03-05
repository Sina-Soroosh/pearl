import React, { useState } from "react";
import { Formik } from "formik";
import styles from "@/styles/modules/PanelAdmin/CreateProductForm/CreateProductForm.module.css";
import dynamic from "next/dynamic";

const EditorText = dynamic(
  () => {
    return import("../EditorText/EditorText");
  },
  { ssr: false }
);

function CreateProductForm() {
  const [desc, setDesc] = useState("");
  const initialValues = {
    image: "",
    title: "",
    shortName: "",
    price: "",
    discount: "",
    category: "",
  };

  const validateHandler = (values) => {};

  const onSubmit = (values) => {};

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
                  <div className={`${styles.input_box} col-lg-4 col-md-6`}>
                    <label htmlFor="image">
                      عکس محصول <span>*</span>
                    </label>
                    <input
                      type="file"
                      id="image"
                      value={values.image}
                      onChange={handleChange}
                      accept=".png, .jpg, .jpeg"
                    />
                    {touched.image && (
                      <span className={styles.err}>{errors.image}</span>
                    )}
                  </div>
                  <div className={`${styles.input_box} col-lg-4 col-md-6`}>
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
                  <div className={`${styles.input_box} col-lg-4 col-md-6`}>
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
                  <div className={`${styles.input_box} col-lg-4 col-md-6`}>
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
                  <div className={`${styles.input_box} col-lg-4 col-md-6`}>
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
                  <div className={`${styles.input_box} col-lg-4 col-md-6`}>
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
                      <option value="chairs">صندلی</option>
                      <option value="watches">ساعت</option>
                    </select>
                    {touched.category && (
                      <span className={styles.err}>{errors.category}</span>
                    )}
                  </div>
                  <div className={`${styles.input_box}`}>
                    <label htmlFor="category">
                      توضیحات محصول <span>*</span>
                    </label>
                    <EditorText value={desc} changeValue={setDesc} />
                    {touched.category && (
                      <span className={styles.err}>{errors.category}</span>
                    )}
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

export default CreateProductForm;
