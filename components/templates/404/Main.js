import React from "react";
import styles from "@/styles/templates/404/Main.module.css";
import Link from "next/link";

function Main() {
  return (
    <>
      <div className={styles.err_404}>
        <div className="container">
          <div className={styles.title}>
            <h1>404</h1>
          </div>
          <div className={styles.text}>
            <p>صفحه یافت نشد!</p>
          </div>
          <div className={styles.link}>
            <Link href="/">بازگشت به خانه</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
