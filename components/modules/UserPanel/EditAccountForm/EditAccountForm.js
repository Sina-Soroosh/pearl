import React from "react";
import styles from "@/styles/modules/UserPanel/EditAccountForm/EditAccountForm.module.css";
import { Formik } from "formik";

function EditAccountForm({ email, username }) {
  const initialValues = {
    email,
    username,
    password: "",
  };

  const validateHandler = (values) => {
    const errors = {};
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!values.username) {
      errors.username = "نام کاربری خود را وارد کنید";
    } else if (values.username.length < 3) {
      errors.username = "نام کاربری باید حداقل 3 کارکتر باشد";
    }

    if (!values.email) {
      errors.email = "لطفا ایمیل خود را وارد کنید";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "لطفا ایمیل خود را درست وارد کنید";
    }
    if (!values.identifier) {
      errors.identifier = "نام کاربری یا ایمیل خود را وارد کنید";
    }

    if (values.password && values.password.length < 8) {
      errors.password = "رمز عبور باید حداقل 8 کارکتر باشد";
    }

    return errors;
  };

  return (
    <>
      <div className={styles.form}>
        <div className={styles.title}>
          <h2>جزییات حساب کاربری</h2>
        </div>
        <Formik initialValues={initialValues} validate={validateHandler}>
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className={`${styles.input_box}`}>
                  <label htmlFor="username">نام کاربری</label>
                  <input
                    type="text"
                    id="username"
                    value={values.username}
                    onChange={handleChange}
                  />
                  {touched.username && (
                    <span className={styles.err}>{errors.username}</span>
                  )}
                </div>
                <div className={`${styles.input_box}`}>
                  <label htmlFor="email">ایمیل</label>
                  <input
                    type="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {touched.email && (
                    <span className={styles.err}>{errors.email}</span>
                  )}
                </div>

                <div className={`${styles.input_box}`}>
                  <label htmlFor="password">
                    رمز عبور (در صورتی که قصد تغییر ندارید خالی بگذارید)
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {touched.password && (
                    <span className={styles.err}>{errors.password}</span>
                  )}
                </div>

                <input
                  type="submit"
                  value="ویرایش اطلاعات"
                  className={styles.submit_btn}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default EditAccountForm;
