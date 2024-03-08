import React, { useState } from "react";
import styles from "@/panelAdminStyles/Questions/CreateQuestion/CreateQuestion.module.css";
import { Formik } from "formik";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";

const EditorText = dynamic(
  () => {
    return import("@/panelAdminModules/EditorText/EditorText");
  },
  { ssr: false }
);

function CreateQuestion() {
  const [body, setBody] = useState("");
  const initialValues = {
    title: "",
  };

  const validateHandler = (values) => {
    const errors = {};

    if (!values.title.trim()) {
      errors.title = "لطفا عنوان قانون را وارد کنید";
    } else if (values.title.trim().length < 3) {
      errors.title = "عنوان قانون باید حداقل 3 کارکتر باشد";
    }

    return errors;
  };

  const onSubmit = (values) => {};

  return (
    <div className={styles.create_form}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h3>افزودن سوال</h3>
          <div className={styles.form}>
            <Formik
              initialValues={initialValues}
              validate={validateHandler}
              onSubmit={onSubmit}
            >
              {({ values, errors, touched, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className={`${styles.input_box} col-md-12`}>
                      <label htmlFor="title">
                        عنوان سوال<span>*</span>
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
                    <EditorText value={body} changeValue={setBody} />
                    <div className="col-12">
                      <input
                        type="submit"
                        value="افزودن سوال"
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

export default CreateQuestion;
