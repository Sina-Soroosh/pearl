import React from "react";
import styles from "@/styles/modules/ProductCart/ProductCart.module.css";
import Link from "next/link";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function ProductCart(props) {
  const router = useRouter();
  const swal = withReactContent(Swal);

  const addToCartHandler = async (Swal) => {
    const res = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: props.shortName }),
    });

    Swal.close();

    if (res.status === 401) {
      swal
        .fire({
          title: "لطفا ابتدا وارد حساب کاربری خود شوید.",
          icon: "error",
          confirmButtonText: "باشه",
        })
        .then(() => {
          router.push("/login");
        });
    } else if (res.status === 404 || res.status === 400) {
      swal.fire({
        title: "ما این محصول را تموم کردیم.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    } else if (res.status === 201) {
      swal.fire({
        title: (
          <p style={{ fontSize: "15px" }}>
            محصول با موفقیت به سبد خرید شما اضافه شد
          </p>
        ),
        toast: true,
        position: "bottom-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
        icon: "success",
      });
    }
  };

  const onSubmit = () => {
    swal.fire({
      title: "لطفا چند لحظه صبر کنید",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        addToCartHandler(Swal);
      },
    });
  };

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
                <div className={styles.add_cart} onClick={onSubmit}>
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
