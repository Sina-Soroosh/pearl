import React, { useState } from "react";
import styles from "@/styles/templates/Cart/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import ProductBox from "@/components/modules/ProductBox/ProductBox";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

function Main(props) {
  const [cart, setCart] = useState(props.cart);
  const [total, setTotal] = useState(props.total);

  return (
    <>
      <Breadcrumb
        links={[{ id: 1, title: "سبد خرید", href: "/cart" }]}
        title="سبد خرید"
      />

      <div className={styles.cart}>
        <div className={styles.content}>
          <div className="container-fluid">
            <div className="row">
              {props.cart.products.length > 0 ? (
                <>
                  <div className="col-md-8">
                    {cart.products.map((product) => (
                      <ProductBox {...product} key={product._id} />
                    ))}
                  </div>
                  <div className="col-md-4">
                    <div className={styles.total_box}>
                      <div className={styles.content}>
                        <div className={styles.title}>
                          <h4>جمع کل سبد خرید</h4>
                        </div>
                        <div className={styles.total}>
                          <p>
                            مجموع :
                            <span>{props.total.toLocaleString()} تومان</span>
                          </p>
                        </div>
                        <div className={styles.continue_btn}>
                          <Link href="/checkout">ادامه جهت تسویه حساب</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className={styles.empty_cart}>
                  <div className={styles.image}>
                    <FontAwesomeIcon icon={faCartPlus} />
                  </div>
                  <div className={styles.desc}>
                    <p>سبد خرید شما در حال حاضر خالی است.</p>
                  </div>
                  <div className={styles.link}>
                    <Link href="/shop">بازگشت به فروشگاه</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
