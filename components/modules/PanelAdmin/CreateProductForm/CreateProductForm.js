import React, { useRef, useState } from "react";
import { Formik } from "formik";
import styles from "@/styles/modules/PanelAdmin/CreateProductForm/CreateProductForm.module.css";
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

function CreateProductForm({ categories }) {
  const router = useRouter();
  const imageRef = useRef();
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

  const addProductHandler = async (data, swal) => {
    const res = await fetch("/api/products", {
      method: "POST",
      body: data,
    });

    swal.close();

    switch (res.status) {
      case 422:
        Swal.fire({
          title: "قبلا از این نام کوتاه استفاده شده است.",
          icon: "error",
          confirmButtonText: "باشه",
        });
        break;
      case 201:
        Swal.fire({
          title: "محصول با موفقیت اضافه شد.",
          icon: "success",
          confirmButtonText: "باشه",
        }).then(() => {
          router.push("/p-admin/products");
        });
        break;

      default:
        Swal.fire({
          title: "خطایی رخ داده. \n اتصال خود را چک کنید",
          icon: "error",
          confirmButtonText: "باشه",
        });
        break;
    }
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

    const formData = new FormData();

    formData.append("image", imageRef.current.files[0]);
    formData.append("title", values.title);
    formData.append("shortName", values.shortName);
    formData.append("desc", desc);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("isAvailable", true);
    formData.append("category", values.category);
    formData.append(
      "infos",
      JSON.stringify(
        infos.map((info) => ({ title: info.title, value: info.value }))
      )
    );

    Swal.fire({
      title: "لطفا چند لحظه صبر کنید",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        addProductHandler(formData, Swal);
      },
    });
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
                      ref={imageRef}
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
