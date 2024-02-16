import React from "react";
import styles from "@/styles/templates/MyAccount/Orders/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import MyAccountMenu from "@/components/modules/MyAccountMenu/MyAccountMenu";
import Link from "next/link";

function Main({ orders }) {
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
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>
                            <Link href={`/my-account/orders/${order.orderID}`}>
                              #{order.orderID}
                            </Link>
                          </td>
                          <td>
                            {order.createdAt.slice(0, 4)}/
                            {order.createdAt.slice(5, 7)}/
                            {order.createdAt.slice(8, 10)}
                          </td>
                          <td>
                            {(order.status === "pending" && "در حال بررسی") ||
                              (order.status === "shipped" && "در حال ارسال") ||
                              (order.status === "delivered" &&
                                "تحویل داده شده")}
                          </td>
                          <td>{order.total.toLocaleString()} تومان</td>
                          <td>
                            <Link href={`/my-account/orders/${order.orderID}`}>
                              مشاهده
                            </Link>
                          </td>
                        </tr>
                      ))}
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
