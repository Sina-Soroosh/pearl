import React from "react";
import styles from "@/styles/templates/Checkout/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import CheckoutForm from "@/components/modules/CheckoutForm/CheckoutForm";

function Main() {
  return (
    <>
      <Breadcrumb
        links={[{ id: 1, title: "صورت حساب", href: "/checkout" }]}
        title="صورت حساب"
      />

      <div className={styles.checkout}>
        <div className={styles.content}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8">
                <CheckoutForm />
              </div>
              <div className="col-lg-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
