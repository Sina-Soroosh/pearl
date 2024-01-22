import React from "react";
import styles from "@/styles/templates/ContactUs/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";

function Main() {
  return (
    <>
      <Breadcrumb
        links={[{ id: 1, title: "تماس با ما", href: "/contact-us" }]}
        title="تماس با ما"
      />
      <div className={styles.contact_us}>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className={styles.texts}>
                <span>تماس با ما</span>
                <h3>پیامی بنویسید</h3>
              </div>
            </div>
            <div className="col-md-8">
              <div className={styles.form}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
