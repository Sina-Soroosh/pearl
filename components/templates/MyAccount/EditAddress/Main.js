import React from "react";
import styles from "@/styles/templates/MyAccount/EditAddress/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import MyAccountMenu from "@/components/modules/MyAccountMenu/MyAccountMenu";
import CheckoutForm from "@/components/modules/CheckoutForm/CheckoutForm";

function Main() {
  return (
    <>
      <Breadcrumb
        links={[
          { id: 1, title: "حساب کاربری من", href: "/my-account" },
          { id: 2, title: "آدرس صورتحساب", href: "/my-account/edit-address" },
        ]}
        title="آدرس صورتحساب"
      />

      <div className={styles.address}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <MyAccountMenu />
            </div>
            <div className="col-md-9">
              <div className={styles.content}>
                <CheckoutForm isAddress={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
