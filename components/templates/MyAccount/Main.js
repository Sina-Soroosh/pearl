import React from "react";
import styles from "@/styles/templates/MyAccount/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";

function Main() {
  return (
    <>
      <Breadcrumb
        links={[{ id: 1, title: "حساب کاربری من", href: "/my-account" }]}
        title="حساب کاربری من"
      />

      <div className={styles.my_account}>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
