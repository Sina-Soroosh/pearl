import React, { useRef } from "react";
import styles from "@/styles/modules/Footer/Footer.module.css";
import Link from "next/link";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import newsletterCheck from "@/validators/newsletter";

function Footer() {
  const emailRef = useRef();
  const swal = withReactContent(Swal);

  const addNewslettersHandler = async (Swal) => {
    const email = emailRef.current.value;

    const res = await fetch("/api/newsletters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    Swal.close();

    if (res.status === 400) {
      swal.fire({
        title: "لطفا یک ایمیل معتبر وارد نمایید !",
        icon: "error",
        confirmButtonText: "باشه",
      });
    } else if (res.status === 422) {
      swal.fire({
        title: "قبلا این ایمیل ثبت شده",
        icon: "error",
        confirmButtonText: "باشه",
      });
    } else if (res.status === 201) {
      swal.fire({
        title: "با موفقیت در خبرنامه عضو شدید",
        icon: "success",
        confirmButtonText: "باشه",
      });

      emailRef.current.value = "";
    } else {
      swal.fire({
        title: "خطایی رخ داده \n لطفا اتصال خود را چک کنید",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

    const isValidEmail = newsletterCheck({ email });

    if (isValidEmail !== true) {
      swal.fire({
        title: "لطفا یک ایمیل معتبر وارد نمایید !",
        icon: "error",
        confirmButtonText: "باشه",
      });

      return;
    }

    swal.fire({
      title: "لطفا چند لحظه صبر کنید",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        addNewslettersHandler(Swal);
      },
    });
  };

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
                  <Link href="/about-us">درباره ما</Link>
                </li>
                <li>
                  <Link href="/contact-us">تماس با ما</Link>
                </li>
                <li>
                  <Link href="/support">پشتیبانی</Link>
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
                <form className={styles.form} onSubmit={onSubmit}>
                  <input
                    type="text"
                    placeholder="ایمیل خود را وارد کنید"
                    ref={emailRef}
                  />
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
