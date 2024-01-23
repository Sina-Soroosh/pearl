import React from "react";
import styles from "@/styles/templates/MyAccount/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import MyAccountMenu from "@/components/modules/MyAccountMenu/MyAccountMenu";
import Link from "next/link";
import IndexBox from "@/components/modules/UserPanel/IndexBox/IndexBox";

function Main() {
  return (
    <>
      <Breadcrumb
        links={[{ id: 1, title: "حساب کاربری من", href: "/my-account" }]}
        title="حساب کاربری من"
      />

      <div className={styles.my_account}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <MyAccountMenu />
            </div>
            <div className="col-md-9">
              <div className={styles.content}>
                <div className={styles.top}>
                  <p>
                    سلام <span>SinaSoroosh</span> (<span>SinaSoroosh</span>{" "}
                    نیستید؟ <span className={styles.logout}>خارج شوید</span>)
                  </p>

                  <p>
                    از طریق پیشخوان حساب کاربری‌تان، می‌توانید{" "}
                    <Link href="/my-account/orders">سفارش‌های اخیرتان</Link> را
                    مشاهده،{" "}
                    <Link href="/my-account/edit-address">
                      آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت
                    </Link>{" "}
                    و{" "}
                    <Link href="/my-account/edit-account">
                      جزییات حساب کاربری و کلمه عبور خود را ویرایش کنید
                    </Link>
                    .
                  </p>
                </div>
                <div className={styles.main}>
                  <div className="row">
                    <div className="col-md-6 col-lg-4">
                      <IndexBox
                        title="پیشخوان"
                        href="/my-account"
                        icon="faGauge"
                      />
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <IndexBox
                        title="سفارش ها"
                        href="/my-account/orders"
                        icon="faBasketShopping"
                      />
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <IndexBox
                        title="آدرس"
                        href="/my-account/edit-address"
                        icon="faHome"
                      />
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <IndexBox
                        title="جزییات حساب"
                        href="/my-account/edit-account"
                        icon="faUser"
                      />
                    </div>
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
