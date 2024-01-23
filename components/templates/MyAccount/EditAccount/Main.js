import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import MyAccountMenu from "@/components/modules/MyAccountMenu/MyAccountMenu";
import React from "react";
import styles from "@/styles/templates/MyAccount/EditAccount/Main.module.css";
import EditAccountForm from "@/components/modules/UserPanel/EditAccountForm/EditAccountForm";

function Main() {
  return (
    <>
      <Breadcrumb
        links={[
          { id: 1, title: "حساب کاربری من", href: "/my-account" },
          {
            id: 2,
            title: "جزییات حساب کاربری",
            href: "/my-account/edit-account",
          },
        ]}
        title="جزییات حساب کاربری"
      />

      <div className={styles.account}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <MyAccountMenu />
            </div>
            <div className="col-md-9">
              <div className={styles.content}>
                <EditAccountForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
