import React, { useRef, useState } from "react";
import styles from "@/styles/modules/Header/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faChevronDown,
  faHeart,
  faMagnifyingGlass,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async () => {
  const res = await fetch("/api/auth/me");

  if (res.status !== 200) {
    return { isLogin: false };
  }

  const user = await res.json();

  if (user.role === "ADMIN") {
    return { isLogin: true, isAdmin: true };
  }

  return { isLogin: true };
};

function Header() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);
  const router = useRouter();
  const keySearchInputRef = useRef();
  const { data } = useSWR("GetMeHeader", fetcher);

  const hideMenuHandler = () => {
    setIsShowMenu(false);
  };

  const showMenuHandler = () => {
    setIsShowMenu(true);
  };

  const hideSearchbarHandler = () => {
    setIsShowSearchBar(false);
  };

  const showSearchbarHandler = (e) => {
    e.preventDefault();

    hideMenuHandler();
    setIsShowSearchBar(true);
  };

  const searchHandler = (e) => {
    e?.preventDefault();

    router.push(`/search/?q=${keySearchInputRef.current.value}`);
    keySearchInputRef.current.value = "";
    hideSearchbarHandler();
  };

  return (
    <>
      {isShowMenu ? (
        <div className={styles.cover_page} onClick={hideMenuHandler}></div>
      ) : null}

      <div
        className={`${styles.searchbar} ${
          isShowSearchBar ? styles.active : ""
        }`}
      >
        <div className={styles.content_searchbar}>
          <form onSubmit={searchHandler}>
            <input
              type="search"
              placeholder="دنبال چی میگردی ..."
              ref={keySearchInputRef}
            />
            <div className={styles.search_icon}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                onClick={searchHandler}
              />
            </div>
          </form>
          <div
            className={styles.close_btn_searchbar}
            onClick={hideSearchbarHandler}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
      </div>

      <div
        className={`${styles.menu_mobile} ${isShowMenu ? styles.active : ""}`}
      >
        <div className={styles.menu}>
          <ul>
            <li>
              <Link href="/">
                <span>صفحه اصلی</span>
              </Link>
            </li>
            <li>
              <Link href="/shop">
                <span>فروشگاه</span>
              </Link>
            </li>
            <li className="sup-item">
              <Link href="#">
                <span>صفحات</span>
                <div className={styles.arrow}>
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </Link>
              <ul className={styles.sub_list}>
                <li>
                  <Link href="/about-us">درباره ما</Link>
                </li>
                <li>
                  <Link href="/faq">سوالات متداول</Link>
                </li>
                <li>
                  <Link href="/warranty-and-services">گارانتی و خدمات</Link>
                </li>
                <li>
                  <Link href="/term-conditions">قوانین و مقرارت</Link>
                </li>
                <li>
                  <Link href="/support">پشتیبانی</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/contact-us">
                <span>تماس با ما</span>
              </Link>
            </li>
            {data?.isAdmin && (
              <li>
                <Link href="/p-admin">
                  <span>تماس با ما</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className={styles.bottom_menu_mobile}>
          <div className={styles.icons}>
            <ul>
              <li>
                <Link href="#" onClick={showSearchbarHandler}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Link>
              </li>
              <li>
                <Link href={data?.isLogin ? "/my-account" : "/login"}>
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </li>
              <li>
                <Link href="/cart">
                  <FontAwesomeIcon icon={faCartShopping} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.close_btn} onClick={hideMenuHandler}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>

      <header>
        <div className={styles.content_header}>
          <div className={styles.right_header}>
            <div className={styles.logo}>
              <Link href="/">
                <Image
                  src="/images/logo/logo-no-background.png"
                  width={900}
                  height={900}
                  alt="logo"
                  priority
                />
              </Link>
            </div>
          </div>
          <div className={styles.center_header}>
            <div className={styles.list}>
              <ul>
                <li>
                  <Link href="/">
                    <span>صفحه اصلی</span>
                  </Link>
                </li>
                <li>
                  <Link href="/shop">
                    <span>فروشگاه</span>
                  </Link>
                </li>
                <li className="sup-item">
                  <Link href="#">
                    <span>صفحات</span>
                    <div className={styles.arrow}>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                  </Link>
                  <ul className={styles.sub_list}>
                    <li>
                      <Link href="/about-us">درباره ما</Link>
                    </li>
                    <li>
                      <Link href="/faq">سوالات متداول</Link>
                    </li>
                    <li>
                      <Link href="/warranty-and-services">گارانتی و خدمات</Link>
                    </li>
                    <li>
                      <Link href="/term-conditions">قوانین و مقرارت</Link>
                    </li>
                    <li>
                      <Link href="/support">پشتیبانی</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link href="/contact-us">
                    <span>تماس با ما</span>
                  </Link>
                </li>

                {data?.isAdmin && (
                  <li>
                    <Link href="/p-admin">
                      <span>تماس با ما</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className={styles.left_header}>
            <div className={styles.icons}>
              <ul>
                <li>
                  <Link href="#" onClick={showSearchbarHandler}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Link>
                </li>
                <li>
                  <Link href={data?.isLogin ? "/my-account" : "/login"}>
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                </li>
                <li>
                  <Link href="/cart">
                    <FontAwesomeIcon icon={faCartShopping} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.menu_logo} onClick={showMenuHandler}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
