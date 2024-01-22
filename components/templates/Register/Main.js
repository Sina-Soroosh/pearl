import React from "react";
import styles from "@/styles/templates/Register/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import AuthForm from "@/components/modules/AuthForm/AuthForm";

function Main() {
  return (
    <>
      <Breadcrumb
        links={[
          {
            id: 1,
            title: "ثبت نام",
            href: "/register",
          },
        ]}
        title="ثبت نام"
      />

      <div className={styles.register}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
