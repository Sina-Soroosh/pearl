import React, { useState } from "react";
import styles from "@/styles/modules/PanelAdmin/SideBar/SideBar.module.css";
import {
  BsBoxSeam,
  BsCartCheck,
  BsCollectionFill,
  BsGrid,
  BsQuestionLg,
} from "react-icons/bs";
import { IoIosMenu } from "react-icons/io";
import { BiCommentDots } from "react-icons/bi";
import Link from "next/link";
import { FiMessageSquare, FiUsers } from "react-icons/fi";
import { MdLogout, MdOutlineClose, MdRule } from "react-icons/md";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import useSWR, { useSWRConfig } from "swr";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const fetcher = async () => {
  const res = await fetch("/api/auth/me");
  const user = await res.json();

  return user;
};

function SideBar() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const router = useRouter();
  const swal = withReactContent(Swal);
  const { mutate } = useSWRConfig();
  const { data } = useSWR("GetMeSideBarPanelAdmin", fetcher);

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

  const showMenuHandler = (e) => {
    e.preventDefault();

    setIsShowMenu(true);
  };

  return (
    <>
      {isShowMenu ? (
        <div className={styles.back} onClick={() => setIsShowMenu(false)}></div>
      ) : null}
      <div className={`${styles.sidebar} ${isShowMenu ? "" : styles.close}`}>
        <div className={styles.logo_details}>
          <img src="/images/logo/pearl-favicon-color.png" alt="logo" />
          <span
            className={styles.logo_close}
            onClick={() => setIsShowMenu(false)}
          >
            <MdOutlineClose />
          </span>
        </div>
        <ul className={styles.nav_links}>
          {isShowMenu ? null : (
            <li>
              <a href="#" onClick={showMenuHandler}>
                <i>
                  <IoIosMenu />
                </i>
              </a>
            </li>
          )}
          <li>
            <Link href="/p-admin">
              <i>
                <BsGrid />
              </i>
              <span className={styles.link_name}>داشبورد</span>
            </Link>
          </li>
          <li>
            <div className={styles.icon_link}>
              <Link href="/p-admin/categories">
                <i>
                  <BsCollectionFill />
                </i>
                <span className={styles.link_name}>دسته بندی ها</span>
              </Link>
            </div>
          </li>
          <li>
            <div className={styles.icon_link}>
              <Link href="/p-admin/products">
                <i>
                  <BsBoxSeam />
                </i>
                <span className={styles.link_name}>محصولات</span>
              </Link>
            </div>
          </li>
          <li>
            <Link href="/p-admin/comments">
              <i>
                <BiCommentDots />
              </i>
              <span className={styles.link_name}>کامنت ها</span>
            </Link>
          </li>
          <li>
            <Link href="/p-admin/orders">
              <i>
                <BsCartCheck />
              </i>
              <span className={styles.link_name}>سفارشات</span>
            </Link>
          </li>
          <li>
            <div className={styles.icon_link}>
              <a href="/p-admin/users">
                <i>
                  <FiUsers />
                </i>
                <span className={styles.link_name}>کاربران</span>
              </a>
              <i className="bx bxs-chevron-down arrow" />
            </div>
          </li>
          <li>
            <Link href="/p-admin/messages">
              <i>
                <FiMessageSquare />
              </i>
              <span className={styles.link_name}>پیام ها</span>
            </Link>
          </li>
          <li>
            <Link href="/p-admin/rules">
              <i>
                <MdRule />
              </i>
              <span className={styles.link_name}>قوانین</span>
            </Link>
          </li>
          <li>
            <Link href="/p-admin/questions">
              <i>
                <BsQuestionLg />
              </i>
              <span className={styles.link_name}>سوالات متداول</span>
            </Link>
          </li>
          <li>
            <Link href="/p-admin/sliders">
              <i>
                <TfiLayoutSliderAlt />
              </i>
              <span className={styles.link_name}>اسلایدر</span>
            </Link>
          </li>
          <li>
            <div className={styles.profile_details}>
              <div className={styles.profile_content}>
                {/*<img src="image/profile.jpg" alt="profileImg">*/}
              </div>
              <div className={styles.name_job}>
                <div className={styles.profile_name}>{data?.username}</div>
                <div className={styles.job}>مدیر سایت</div>
              </div>
              <i onClick={logoutHandler}>
                <MdLogout />
              </i>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
