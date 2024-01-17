import React from "react";
import styles from "@/styles/modules/ProductCart/ProductCart.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";

function ProductCart() {
  return (
    <>
      <div className="col-sm-6 col-lg-3">
        <div className={styles.product_cart}>
          <div className={styles.content}>
            <div className={styles.top_cart}>
              <div className={styles.image_cart}>
                <Link href="/">
                  <img
                    src="https://auros.1webstar.ir/wp-content/uploads/2018/10/1-33.jpg"
                    alt=""
                  />
                </Link>
              </div>
              <div className={styles.add_cart}>
                <button>+ افزودن به سبد خرید</button>
              </div>
              <div className={styles.unavailable}>
                <span>ناموجود :(</span>
              </div>
              <div className={styles.discount}>
                <span>تخفیف !</span>
              </div>
              <div className={styles.heart}>
                <span>
                  <FontAwesomeIcon icon={faHeartCirclePlus} />
                </span>
              </div>
            </div>
            <div className={styles.bottom_cart}>
              <div className={styles.title}>
                <h2>لاین کارکنان</h2>
              </div>
              <div className={styles.price}>
                <span>165,000 تومان</span>
                <span className={styles.discount_price}>115,000 تومان</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCart;
