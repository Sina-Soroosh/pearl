import React from "react";
import styles from "@/styles/templates/Login/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import AuthForm from "@/components/modules/AuthForm/AuthForm";

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
            <div className="col-md-8 col-lg-6">
              <AuthForm isLoginForm={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
