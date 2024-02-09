import React from "react";
import styles from "@/styles/templates/Checkout/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import CheckoutForm from "@/components/modules/CheckoutForm/CheckoutForm";

function Main(props) {
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
                <CheckoutForm {...props.address} />
              </div>
              <div className="col-lg-4">
                <div className={styles.list}>
                  <div className={styles.title}>
                    <h3>سفارش شما</h3>
                  </div>
                  <ul className={styles.items}>
                    {props.cart.products.map((product) => (
                      <li key={product._id}>
                        <div className={styles.name}>
                          <span>
                            {product.product.title} × {product.count}
                          </span>
                        </div>
                        <div className={styles.price}>
                          <span>
                            {(
                              product.product.price *
                              ((100 - product.product.discount) / 100) *
                              product.count
                            ).toLocaleString()}{" "}
                            تومان
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.total}>
                    <span>مجموع</span>
                    <span className={styles.price}>
                      {props.total.toLocaleString()} تومان
                    </span>
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
