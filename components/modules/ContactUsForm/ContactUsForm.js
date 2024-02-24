import React from "react";
import styles from "@/styles/modules/ContactUsForm/ContactUsForm.module.css";
import { Formik } from "formik";

function ContactUsForm({ onSubmit }) {
  const initialValues = {
    name: "",
    email: "",
    msg: "",
  };

  const validateHandler = (values) => {
    const errors = {};
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!values.name) {
      errors.name = "نام خود را وارد کنید";
    } else if (values.name.length < 3) {
      errors.name = "نام خود را به درستی وارد کنید";
    }

    if (!values.msg) {
      errors.msg = "پیام خود را وارد کنید";
    } else if (values.msg.length < 10) {
      errors.msg = "تعداد کارکتر ها کم میباشد";
    }

    if (!values.email) {
      errors.email = "لطفا ایمیل خود را وارد کنید";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "لطفا ایمیل خود را درست وارد کنید";
    }

    return errors;
  };

  return (
    <>
      <div className={styles.form}>
        <Formik
          initialValues={initialValues}
          validate={validateHandler}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className={`${styles.input_box}`}>
                  <label htmlFor="name">
                    نام <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {touched.name && (
                    <span className={styles.err}>{errors.name}</span>
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
                <div className={`${styles.input_box}`}>
                  <label htmlFor="msg">
                    پیام <span>*</span>
                  </label>
                  <textarea
                    type="msg"
                    id="msg"
                    value={values.msg}
                    onChange={handleChange}
                    placeholder="متن پیام خود را وارد کنید..."
                  ></textarea>
                  {touched.msg && (
                    <span className={styles.err}>{errors.msg}</span>
                  )}
                </div>
                <input
                  type="submit"
                  value="ارسال پیام"
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

export default ContactUsForm;
