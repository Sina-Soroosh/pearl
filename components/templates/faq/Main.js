import React from "react";
import styles from "@/styles/templates/faq/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";

function Main() {
  return (
    <>
      <Breadcrumb
        links={[{ id: 1, title: "سوالات متداول", href: "/faq" }]}
        title="سوالات متداول"
      />

      <div className={styles.faq}>
        <div className={styles.content}></div>
      </div>
    </>
  );
}

export default Main;
