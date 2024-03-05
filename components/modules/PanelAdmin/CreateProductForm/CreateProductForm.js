import React, { useState } from "react";
import { Formik } from "formik";
import styles from "@/styles/modules/PanelAdmin/CreateProductForm/CreateProductForm.module.css";
import dynamic from "next/dynamic";
import InfosProduct from "../InfosProduct/InfosProduct";
import Swal from "sweetalert2";

const EditorText = dynamic(
  () => {
    return import("../EditorText/EditorText");
  },
  { ssr: false }
);

function CreateProductForm() {
  const [desc, setDesc] = useState("");
  const [infos, setInfos] = useState([
    { _id: crypto.randomUUID(), title: "", value: "" },
  ]);
  const initialValues = {
    image: "",
    title: "",
    shortName: "",
    price: "",
    discount: "",
    category: "",
  };

  const validateHandler = (values) => {
    let errors = {};

    if (!values.image) {
      errors.image = "لطفا عکس محصول را انتخاب کنید";
    }

    let idxDot = values.image.lastIndexOf(".") + 1;
    let pathNameImage = values.image
      .substr(idxDot, values.image.length)
      .toLowerCase();

    if (
      pathNameImage != "jpg" &&
      pathNameImage != "jpeg" &&
      pathNameImage != "png"
    ) {
      errors.image = "لطفا فایلی انتخاب کنید که از نوع jpg یا jpeg یا png باشد";
    }

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

export default CreateProductForm;
