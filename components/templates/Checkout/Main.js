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
              <div className="col-lg-4">
                <div className={styles.list}>
                  <div className={styles.title}>
                    <h3>سفارش شما</h3>
                  </div>
                  <ul className={styles.items}>
                    <li>
                      <div className={styles.name}>
                        <span>اسپیکر × 2</span>
                      </div>
                      <div className={styles.price}>
                        <span>144,000 تومان</span>
                      </div>
                    </li>
                    <li>
                      <div className={styles.name}>
                        <span>اسپیکر × 2</span>
                      </div>
                      <div className={styles.price}>
                        <span>144,000 تومان</span>
                      </div>
                    </li>
                  </ul>
                  <div className={styles.total}>
                    <span>مجموع</span>
                    <span className={styles.price}>220,000 تومان</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
