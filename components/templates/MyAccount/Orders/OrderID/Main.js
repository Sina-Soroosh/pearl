import React from "react";
import styles from "@/styles/templates/MyAccount/Orders/OrderID/Main.module.css";
import { useRouter } from "next/router";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import MyAccountMenu from "@/components/modules/MyAccountMenu/MyAccountMenu";

function Main() {
  const { query } = useRouter();

  return (
    <>
      <Breadcrumb
        links={[
          { id: 1, title: "حساب کاربری من", href: "/my-account" },
          { id: 2, title: "سفارش ها", href: "/my-account/orders" },
          {
            id: 3,
            title: `#${query.orderID} سفارش`,
            href: `/my-account/orders/${query.orderID}`,
          },
        ]}
        title={`سفارش #${query.orderID}`}
      />

      <div className={styles.order}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <MyAccountMenu />
            </div>
            <div className="col-md-9">
              <div className={styles.content}>
                <div className={styles.text}>
                  <p>
                    سفارش #<span>{query.orderID}</span> در تاریخ{" "}
                    <span>20/03/2024</span> ثبت شده است و در حال حاضر در وضعیت
                    در <span>انتظار بررسی</span> می‌باشد.
                  </p>
                </div>
                <div className={styles.table}>
                  <table>
                    <thead>
                      <tr>
                        <th>محصول</th>
                        <th>مجموع</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>اسپیکر × 2</td>
                        <td>500,000 تومان</td>
                      </tr>
                      <tr>
                        <td>اسپیکر × 2</td>
                        <td>500,000 تومان</td>
                      </tr>
                      <tr>
                        <td>اسپیکر × 2</td>
                        <td>500,000 تومان</td>
                      </tr>
                      <tr>
                        <td>قیمت نهایی</td>
                        <td>1,500,000 تومان</td>
                      </tr>
                    </tbody>
                  </table>
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
