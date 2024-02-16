import React from "react";
import styles from "@/styles/templates/Checkout/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import CheckoutForm from "@/components/modules/CheckoutForm/CheckoutForm";
import { useRouter } from "next/router";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function Main(props) {
  const router = useRouter();
  const swal = withReactContent(Swal);

  const createOrderHandler = async (values, Swal) => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    Swal.close();

    if (res.status === 400) {
      swal.fire({
        title: "اطلاعات شما اشتباه است",
        icon: "error",
        confirmButtonText: "باشه",
      });
    } else if (res.status === 201) {
      swal
        .fire({
          title: "سفارش شما با موفقیت ثبت شد",
          icon: "success",
          confirmButtonText: "باشه",
        })
        .then(() => {
          router.replace("/my-account/orders");
        });
    } else {
      swal.fire({
        title: "خطایی رخ داده. \n لطفا اتصال خود را چک کنید.",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  const onSubmit = (values) => {
    swal.fire({
      title: "لطفا چند لحظه صبر کنید",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        createOrderHandler(values, Swal);
      },
    });
  };

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
                <CheckoutForm {...props.address} onSubmit={onSubmit} />
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
