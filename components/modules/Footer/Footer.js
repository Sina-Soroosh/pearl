import React from "react";
import styles from "@/styles/modules/Footer/Footer.module.css";
import Link from "next/link";

function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 col-lg-3">
              <div className={styles.logo}>
                <Link href="/">
                  <img src="/images/logo/logo-no-background.png" alt="logo" />
                </Link>
              </div>
            </div>
            <div className="col-md-4 col-lg-3">
              <div className={styles.information}>
                <div className={styles.address}>
                  <p>ایران، خراسان رضوی، مشهد</p>
                </div>
                <div className={styles.phone}>
                  <a href="tel:+989914317972">09914317972</a>
                </div>
                <div className={styles.email}>
                  <a href="mailto:sinasoroosh07@gmail.com">
                    sinasoroosh07@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-lg-2">
              <ul className={styles.links}>
                <li className={styles.title_links}>
                  <h4>لینک های مفید</h4>
                </li>
                <li>
                  <Link href="/">درباره ما</Link>
                </li>
                <li>
                  <Link href="/">تماس با ما</Link>
                </li>
                <li>
                  <Link href="/">پشتیبانی</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className={styles.newsletters}>
                <div className={styles.title}>
                  <h4>خبرنامه</h4>
                </div>
                <div className={styles.desc}>
                  <p>از جدیدترین اخبار و تخفیف های ما مطلع شوید!</p>
                </div>
                <form className={styles.form}>
                  <input type="text" placeholder="ایمیل خود را وارد کنید" />
                  <button type="submit">عضویت</button>
                </form>
              </div>
            </div>
          </div>
          <div className={styles.copy_right}>
            <p>
              تمامی حقوق مادی و معنوی متعلق به <Link href="/">Pearl</Link> می
              باشد.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
