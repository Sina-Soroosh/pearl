import React from "react";
import styles from "@/styles/templates/MyAccount/Orders/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import MyAccountMenu from "@/components/modules/MyAccountMenu/MyAccountMenu";
import Link from "next/link";

function Main() {
  return (
    <>
      <Breadcrumb
        links={[
          { id: 1, title: "حساب کاربری من", href: "/my-account" },
          { id: 2, title: "سفارش ها", href: "/my-account/orders" },
        ]}
        title="سفارش ها"
      />

      <div className={styles.orders}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <MyAccountMenu />
            </div>
            <div className="col-md-9">
              <div className={styles.content}>
                <div className={styles.table}>
                  <table>
                    <thead>
                      <tr>
                        <th>سفارش</th>
                        <th>تاریخ</th>
                        <th>وضعیت</th>
                        <th>مجموع</th>
                        <th>عملیات ها</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Link href="/my-account/orders/57671">#57671</Link>
                        </td>
                        <td>20/03/2024</td>
                        <td>در حال بررسی</td>
                        <td>500,000 تومان</td>
                        <td>
                          <Link href="/my-account/orders/57671">مشاهده</Link>
                        </td>
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
