import React, { useRef } from "react";
import styles from "@/styles/modules/ProductBox/ProductBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function ProductBox(props) {
  const router = useRouter();
  const swal = withReactContent(Swal);
  const countRef = useRef();

  const removeProduct = async (Swal) => {
    const res = await fetch(`/api/cart/remove/${props.product.shortName}`, {
      method: "DELETE",
    });

    Swal.close();

    if (res.status === 200) {
      swal.fire({
        title: "محصول با موفقیت حذف شد",
        icon: "success",
        confirmButtonText: "باشه",
      });

      props.getCartHandler();
    } else {
      swal.fire({
        title: "خطایی رخ داده. \n لطفا اتصال خود را چک کنید",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  const addProduct = async (Swal) => {
    const res = await fetch(`/api/cart/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: props.product.shortName }),
    });

    Swal.close();

    if (res.status === 201) {
      props.getCartHandler();
    } else {
      swal.fire({
        title: "خطایی رخ داده. \n لطفا اتصال خود را چک کنید",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  const decreaseProduct = async (Swal) => {
    const res = await fetch(`/api/cart/decrease/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: props.product.shortName }),
    });

    Swal.close();

    if (res.status === 200) {
      props.getCartHandler();
    } else {
      swal.fire({
        title: "خطایی رخ داده. \n لطفا اتصال خود را چک کنید",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  const swalSure = () => {
    swal
      .fire({
        title: "آیا مطمئنید که میخواهید این محصول را حذف کنید؟",
        icon: "question",
        confirmButtonText: "بله",
        cancelButtonText: "نه",
        showCancelButton: true,
        confirmButtonColor: "rgb(69 71 76)",
        cancelButtonColor: "var(--orange)",
        focusCancel: true,
      })
      .then((res) => {
        if (res.isConfirmed) {
          onSubmit(removeProduct);
        }
      });
  };

  const plusCountHandler = () => {
    countRef.current.value++;
    onSubmit(addProduct);
  };

  const minusCountHandler = () => {
    if (countRef.current.value - 1 > 0) {
      countRef.current.value--;
      onSubmit(decreaseProduct);
    } else {
      swalSure();
    }
  };

  const onSubmit = (func) => {
    swal.fire({
      title: "لطفا چند لحظه صبر کنید",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        func(Swal);
      },
    });
  };

  return (
    <>
      <div className={styles.product_box}>
        <div className={styles.content}>
          <div className={styles.close_btn} onClick={() => swalSure()}>
            <span>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
          <div className={styles.image}>
            <Link href={`/shop/${props.product.shortName}`}>
              <img src={props.product.image} alt={props.product.title} />
            </Link>
          </div>
          <div className={`${styles.title} ${styles.info}`}>
            <p>
              <span>نام محصول : </span> {props.product.title}
            </p>
          </div>
          <div className={`${styles.price} ${styles.info}`}>
            <p>
              <span>قیمت : </span>{" "}
              {(
                props.product.price *
                ((100 - props.product.discount) / 100)
              ).toLocaleString()}{" "}
              تومان
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
                  defaultValue={props.count}
                />
                <input type="button" value="+" onClick={plusCountHandler} />
              </span>
            </p>
          </div>
          <div className={`${styles.total} ${styles.info}`}>
            <p>
              <span>مجموع : </span>{" "}
              {(
                props.product.price *
                ((100 - props.product.discount) / 100) *
                props.count
              ).toLocaleString()}{" "}
              تومان
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductBox;
