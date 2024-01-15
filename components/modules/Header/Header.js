import React from "react";
import styles from "@/styles/modules/Header/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faChevronDown,
  faHeart,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <>
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
                  <Link href="/my-favorites">
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
        </div>
      </header>
    </>
  );
}

export default Header;
