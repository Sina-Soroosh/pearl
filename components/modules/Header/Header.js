import React, { useState } from "react";
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

function Header() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isShowSearchBar, setIsShowSearchBar] = useState(false);

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
          <form>
            <input type="search" placeholder="دنبال چی میگردی ..." />
            <div className={styles.search_icon}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
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
          </ul>
        </div>
        <div className={styles.bottom_menu_mobile}>
          <div className={styles.icons}>
            <ul>
              <li>
                <Link href="/my-favorites">
                  <FontAwesomeIcon icon={faHeart} />
                </Link>
              </li>
              <li>
                <Link href="#" onClick={showSearchbarHandler}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Link>
              </li>
              <li>
                <Link href="/my-favorites">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </li>
              <li>
                <Link href="/my-favorites">
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
              </ul>
            </div>
          </div>
          <div className={styles.left_header}>
            <div className={styles.icons}>
              <ul>
                <li>
                  <Link href="/my-favorites">
                    <FontAwesomeIcon icon={faHeart} />
                  </Link>
                </li>
                <li>
                  <Link href="#" onClick={showSearchbarHandler}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Link>
                </li>
                <li>
                  <Link href="/my-favorites">
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                </li>
                <li>
                  <Link href="/my-favorites">
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
