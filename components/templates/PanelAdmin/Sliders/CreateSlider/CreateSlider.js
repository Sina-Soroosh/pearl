import React, { useRef } from "react";
import styles from "@/panelAdminStyles/Sliders/CreateSlider/CreateSlider.module.css";
import { Formik } from "formik";
import Swal from "sweetalert2";

function CreateSlider({ products }) {
  const imageRef = useRef();
  const initialValues = {
    image: "",
    title: "",
    text: "",
    product: products[0].shortName,
  };

  const validateHandler = (values) => {
    let errors = {};

    if (!values.image) {
      errors.image = "لطفا عکس اسلایدر را انتخاب کنید";
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
      errors.title = "لطفا عنوان اسلایدر را وارد کنید.";
    } else if (values.title.trim().length < 3) {
      errors.title = "عنوان اسلایدر حداقل باید 3 کاراکتر باشد";
    }

    if (!values.text.trim()) {
      errors.text = "لطفا نوشته اسلایدر را وارد کنید.";
    } else if (values.text.trim().length < 3) {
      errors.text = "نوشته اسلایدر حداقل باید 3 کاراکتر باشد";
    }

    return errors;
  };

  const createSliderHandler = async (values, swal) => {
    const res = await fetch("/api/sliders", {
      method: "POST",
      body: values,
    });

    swal.close();

    switch (res.status) {
      case 400:
        Swal.fire({
          title: "مقادیر ارسالی معتبر نیست",
          icon: "error",
          confirmButtonText: "باشه",
        });
        break;
      case 201:
        Swal.fire({
          title: "اسلایدر با موفقیت اضافه شد.",
          icon: "success",
          confirmButtonText: "باشه",
        }).then(() => location.reload());
        break;
      default:
        Swal.fire({
          title: "خطایی رخ داده. \n لطفا اتصال خود را چک کنید.",
          icon: "error",
          confirmButtonText: "باشه",
        });
        break;
    }
  };

  const onSubmit = (values) => {
    const formData = new FormData();

    formData.append("image", imageRef.current.files[0]);
    formData.append("title", values.title);
    formData.append("text", values.text);
    formData.append("product", values.product);

    Swal.fire({
      title: "لطفا چند لحظه صبر کنید",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        createSliderHandler(formData, Swal);
      },
    });
  };

  return (
    <div className={styles.create_form}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h3>افزودن اسلایدر</h3>
          <div className={styles.form}>
            <Formik
              initialValues={initialValues}
              validate={validateHandler}
              onSubmit={onSubmit}
            >
              {({ values, errors, touched, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className={`${styles.input_box} col-md-6`}>
                      <label htmlFor="image">
                        عکس اسلایدر<span>*</span>
                      </label>
                      <input
                        type="file"
                        id="image"
                        value={values.image}
                        accept=".png, .jpg, .jpeg"
                        onChange={handleChange}
                        ref={imageRef}
                      />
                      {touched.image && (
                        <span className={styles.err}>{errors.image}</span>
                      )}
                    </div>
                    <div className={`${styles.input_box} col-md-6`}>
                      <label htmlFor="title">
                        عنوان اسلایدر <span>*</span>
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
                    <div className={`${styles.input_box} col-md-6`}>
                      <label htmlFor="text">
                        نوشته اسلایدر<span>*</span>
                      </label>
                      <input
                        type="text"
                        id="text"
                        value={values.text}
                        onChange={handleChange}
                      />
                      {touched.text && (
                        <span className={styles.err}>{errors.text}</span>
                      )}
                    </div>
                    <div className={`${styles.input_box} col-md-6`}>
                      <label htmlFor="product">
                        محصول اسلایدر<span>*</span>
                      </label>
                      <select
                        id="product"
                        value={values.product}
                        onChange={handleChange}
                      >
                        {products.map((product) => (
                          <option value={product.shortName} key={product._id}>
                            {product.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <input
                        type="submit"
                        value="افزودن اسلایدر"
                        className={styles.submit_btn}
                      />
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSlider;
