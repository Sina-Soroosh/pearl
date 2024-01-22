import React from "react";
import styles from "@/styles/templates/Login/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";

function Main() {
  return (
    <>
      <Breadcrumb
        links={[
          {
            id: 1,
            title: "ورود به حساب کاربری",
            href: "/login",
          },
        ]}
        title="ورود به حساب کاربری"
      />

      <div className={styles.login}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
