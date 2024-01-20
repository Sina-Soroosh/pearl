import React from "react";
import styles from "@/styles/modules/AboutBox/AboutBox.module.css";

function AboutBox({ img, title, desc }) {
  return (
    <>
      <div className="col-md-4">
        <div className={styles.box}>
          <div className={styles.icon}>
            <img src={img} alt={title} />
          </div>
          <div className={styles.title}>
            <h4>{title}</h4>
          </div>
          <div className={styles.icon}>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutBox;
