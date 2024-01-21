import React from "react";
import styles from "@/styles/modules/SupportBox/SupportBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

function SupportBox({ icon, title, desc }) {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.content}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={icons[icon]} />
          </div>
          <div className={styles.title}>
            <h2>{title}</h2>
          </div>
          <div className={styles.body}>
            <p>{desc}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SupportBox;
