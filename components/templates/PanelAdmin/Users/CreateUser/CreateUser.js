import React from "react";
import styles from "@/panelAdminStyles/Users/CreateUser/CreateUser.module.css";
import { Formik } from "formik";

function CreateUser() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    role: "USER",
  };

  const validateHandler = (values) => {
    let errors = {};
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

    if (!values.password) {
      errors.password = "رمز عبور خود را وارد کنید";
    } else if (values.password.length < 8) {
      errors.password = "رمز عبور باید حداقل 8 کارکتر باشد";
    }

    return errors;
  };

  const onSubmit = (values) => {};

  return (
    <div className={styles.create_form}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h3>افزودن کاربر</h3>
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
                      <label htmlFor="username">
                        نام کاربری<span>*</span>
                      </label>
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
                    <div className={`${styles.input_box} col-md-6`}>
                      <label htmlFor="email">
                        ایمیل <span>*</span>
                      </label>
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
                    <div className={`${styles.input_box} col-md-6`}>
                      <label htmlFor="password">
                        رمز عبور<span>*</span>
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
                    <div className={`${styles.input_box} col-md-6`}>
                      <label htmlFor="role">
                        نقش<span>*</span>
                      </label>
                      <select
                        id="role"
                        value={values.role}
                        onChange={handleChange}
                      >
                        <option value="USER">کاربر</option>
                        <option value="ADMIN">مدیر</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <input
                        type="submit"
                        value="افزودن کاربر"
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

export default CreateUser;
