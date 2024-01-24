import React from "react";
import styles from "@/styles/modules/MyAccountMenu/MyAccountMenu.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBasketShopping,
  faGauge,
  faHome,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useSWRConfig } from "swr";

function MyAccountMenu() {
  const { asPath, replace } = useRouter();
  const swal = withReactContent(Swal);
  const { mutate } = useSWRConfig();

  const logoutHandler = async (e) => {
    e.preventDefault();

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
            replace("/login");
          });
        }
      });
  };

  return (
    <>
      <div className={styles.menu}>
        <ul>
          <li>
            <Link
              className={asPath === "/my-account" ? styles.active : ""}
              href="/my-account"
            >
              <span>
                <FontAwesomeIcon icon={faGauge} />
              </span>
              پیشخوان
            </Link>
          </li>
          <li>
            <Link
              className={asPath === "/my-account/orders" ? styles.active : ""}
              href="/my-account/orders"
            >
              <span>
                <FontAwesomeIcon icon={faBasketShopping} />
              </span>
              سفارش ها
            </Link>
          </li>
          <li>
            <Link
              className={
                asPath === "/my-account/edit-address" ? styles.active : ""
              }
              href="/my-account/edit-address"
            >
              <span>
                <FontAwesomeIcon icon={faHome} />
              </span>
              آدرس
            </Link>
          </li>
          <li>
            <Link
              className={
                asPath === "/my-account/edit-account" ? styles.active : ""
              }
              href="/my-account/edit-account"
            >
              <span>
                <FontAwesomeIcon icon={faUser} />
              </span>
              جزییات حساب
            </Link>
          </li>
          <li>
            <Link href="#" onClick={logoutHandler}>
              <span>
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
              </span>
              بیرون رفتن
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default MyAccountMenu;
