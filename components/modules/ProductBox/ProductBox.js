import React, { useRef } from "react";
import styles from "@/styles/modules/ProductBox/ProductBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function ProductBox() {
  const countRef = useRef();

  const plusCountHandler = () => {
    countRef.current.value++;
  };

  const minusCountHandler = () => {
    if (countRef.current.value - 1 > 0) {
      countRef.current.value--;
    }
  };

  return (
    <>
      <div className={styles.product_box}>
        <div className={styles.content}>
          <div className={styles.close_btn}>
            <span>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
          <div className={styles.image}>
            <Link href="/shop/test">
              <img
                src="https://auros.1webstar.ir/wp-content/uploads/2018/10/1-8.jpg"
                alt=""
              />
            </Link>
          </div>
          <div className={`${styles.title} ${styles.info}`}>
            <p>
              <span>نام محصول : </span> اسپیکر
            </p>
          </div>
          <div className={`${styles.price} ${styles.info}`}>
            <p>
              <span>قیمت : </span> 120,000 تومان
            </p>
          </div>
          <div className={`${styles.count} ${styles.info}`}>
            <p>
              <span>تعداد : </span>
              <span className={styles.inputs}>
                <input type="button" value="-" onClick={minusCountHandler} />
                <input
                  type="number"
                  min={0}
                  className={styles.number}
                  ref={countRef}
                />
                <input type="button" value="+" onClick={plusCountHandler} />
              </span>
            </p>
          </div>
          <div className={`${styles.total} ${styles.info}`}>
            <p>
              <span>مجموع : </span> 200,00 تومان
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductBox;
