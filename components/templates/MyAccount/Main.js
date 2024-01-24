import React from "react";
import styles from "@/styles/templates/MyAccount/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import MyAccountMenu from "@/components/modules/MyAccountMenu/MyAccountMenu";
import Link from "next/link";
import IndexBox from "@/components/modules/UserPanel/IndexBox/IndexBox";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSWRConfig } from "swr";

function Main({ user }) {
  const router = useRouter();
  const swal = withReactContent(Swal);
  const { mutate } = useSWRConfig();

  const logoutHandler = async (e) => {
    swal
      .fire({
        title: "آیا مطمئنید که میخواهید از حساب کاربری خود خارج شوید؟",
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
          fetch("/api/auth/logout").then(() => {
            mutate("GetMeHeader");
            router.replace("/login");
          });
        }
      });
  };

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
                    سلام <span>{user.username}</span> (
                    <span>{user.username}</span> نیستید؟{" "}
                    <span className={styles.logout} onClick={logoutHandler}>
                      خارج شوید
                    </span>
                    )
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
