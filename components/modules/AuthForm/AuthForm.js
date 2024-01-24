import React from "react";
import styles from "@/styles/modules/AuthForm/AuthForm.module.css";
import { Formik } from "formik";
import Link from "next/link";

function AuthForm({ isLoginForm, onSubmit }) {
  const initialValues = {
    identifier: "",
    email: "",
    username: "",
    password: "",
  };

  const validateHandler = (values) => {
    const errors = {};
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!isLoginForm) {
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
    } else {
      if (!values.identifier) {
        errors.identifier = "نام کاربری یا ایمیل خود را وارد کنید";
      }
    }

    if (!values.password) {
      errors.password = "رمز عبور خود را وارد کنید";
    } else if (values.password.length < 8) {
      errors.password = "رمز عبور باید حداقل 8 کارکتر باشد";
    }

    return errors;
  };

  return (
    <>
      <div className={styles.form}>
        <div className={styles.title}>
          <h2>{isLoginForm ? "ورود" : "ثبت نام"}</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validate={validateHandler}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                {isLoginForm ? (
                  <>
                    <div className={`${styles.input_box}`}>
                      <label htmlFor="identifier">
                        نام کاربری یا ایمیل <span>*</span>
                      </label>
                      <input
                        type="text"
                        id="identifier"
                        value={values.identifier}
                        onChange={handleChange}
                      />
                      {touched.identifier && (
                        <span className={styles.err}>{errors.identifier}</span>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={`${styles.input_box}`}>
                      <label htmlFor="username">
                        نام <span>*</span>
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
                    <div className={`${styles.input_box}`}>
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
                  </>
                )}
                <div className={`${styles.input_box}`}>
                  <label htmlFor="password">
                    رمز عبور <span>*</span>
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
                  value={isLoginForm ? "ورود" : "ثبت نام"}
                  className={styles.submit_btn}
                />

                <div className={styles.link}>
                  <Link href={isLoginForm ? "/register" : "/login"}>
                    {isLoginForm
                      ? "هنوز حساب کاربری ندارید؟"
                      : "قبلا در سایت ثبت نام کردید؟"}
                  </Link>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default AuthForm;
