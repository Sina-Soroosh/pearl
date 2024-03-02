import React, { useRef } from "react";
import styles from "@/panelAdminStyles/categories/CreateCategory/CreateCategory.module.css";
import { Formik } from "formik";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function CreateCategory() {
  const titleRef = useRef();
  const shortNameRef = useRef();
  const swal = withReactContent(Swal);
  const initialValues = {
    name: "",
    shortName: "",
  };

  const validateHandler = (values) => {
    const errors = {};

    if (!values.name.trim()) {
      errors.name = "لطفا نام دسته بندی را وارد نمایید";
    } else if (values.name.trim().length < 3) {
      errors.name = "نام دسته بندی باید حداقل 3 کارکتر باشد";
    }

    if (!values.shortName.trim()) {
      errors.shortName = "لطفا نام کوتاه دسته بندی را وارد نمایید";
    } else if (values.shortName.trim().length < 3) {
      errors.shortName = "نام کوتاه دسته بندی باید حداقل 3 کارکتر باشد";
    }

    return errors;
  };

  const createCategoryHandler = async (values, Swal) => {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: values.name,
        shortName: values.shortName,
      }),
    });

    Swal.close();

    switch (res.status) {
      case 400:
        swal.fire({
          title: "مقادیر ارسالی معتبر نیست",
          icon: "error",
          confirmButtonText: "باشه",
        });
        break;
      case 422:
        swal.fire({
          title: "قبلا این نام کوتاه استفاده شده",
          icon: "error",
          confirmButtonText: "باشه",
        });
        break;
      case 201:
        swal.fire({
          title: "دسته بندی با موفقیت اضافه شد.",
          icon: "success",
          confirmButtonText: "باشه",
        });

        titleRef.current.value = "";
        shortNameRef.current.value = "";
        break;
      default:
        swal.fire({
          title: "خطایی رخ داده. \n لطفا اتصال خود را چک کنید.",
          icon: "error",
          confirmButtonText: "باشه",
        });
        break;
    }
  };

  const onSubmit = (values) => {
    swal.fire({
      title: "لطفا چند لحظه صبر کنید",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        createCategoryHandler(values, Swal);
      },
    });
  };

  return (
    <>
      <div className={styles.create_form}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>افزودن دسته بندی</h3>
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
                        <label htmlFor="name">
                          نام دسته بندی <span>*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={values.name}
                          onChange={handleChange}
                          ref={titleRef}
                        />
                        {touched.name && (
                          <span className={styles.err}>{errors.name}</span>
                        )}
                      </div>
                      <div className={`${styles.input_box} col-md-6`}>
                        <label htmlFor="shortName">
                          نام کوتاه <span>*</span>
                        </label>
                        <input
                          type="text"
                          id="shortName"
                          value={values.shortName}
                          onChange={handleChange}
                          ref={shortNameRef}
                        />
                        {touched.shortName && (
                          <span className={styles.err}>{errors.shortName}</span>
                        )}
                      </div>
                      <div className="col-12">
                        <input
                          type="submit"
                          value="افزودن دسته بندی"
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
    </>
  );
}

export default CreateCategory;
