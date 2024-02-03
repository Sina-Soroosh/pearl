import React from "react";
import styles from "@/styles/modules/ProductCart/ProductCart.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";

function ProductCart(props) {
  return (
    <>
      <div className="col-sm-6 col-lg-3">
        <div className={styles.product_cart}>
          <div className={styles.content}>
            <div className={styles.top_cart}>
              <div className={styles.image_cart}>
                <Link href={`/shop/${props.shortName}`}>
                  <img src={props.image} alt={props.title} />
                </Link>
              </div>
              {props.isAvailable ? (
                <div className={styles.add_cart}>
                  <button>+ افزودن به سبد خرید</button>
                </div>
              ) : null}
              {props.isAvailable ? null : (
                <div className={styles.unavailable}>
                  <span>ناموجود :(</span>
                </div>
              )}
              {props.isAvailable && props.discount !== 0 ? (
                <div className={styles.discount}>
                  <span>تخفیف !</span>
                </div>
              ) : null}
            </div>
            <div className={styles.bottom_cart}>
              <div className={styles.title}>
                <Link href={`/shop/${props.shortName}`}>
                  <h2>{props.title}</h2>
                </Link>
              </div>
              {props.isAvailable ? (
                <>
                  {props.discount === 0 ? (
                    <div className={styles.price}>
                      <span>{props.price.toLocaleString()} تومان</span>
                    </div>
                  ) : (
                    <div className={styles.price}>
                      <span>
                        {(
                          props.price *
                          ((100 - props.discount) / 100)
                        ).toLocaleString()}{" "}
                        تومان
                      </span>
                      <span className={styles.discount_price}>
                        {props.price.toLocaleString()} تومان
                      </span>
                    </div>
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCart;
