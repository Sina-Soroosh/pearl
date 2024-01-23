import Link from "next/link";
import React from "react";
import styles from "@/styles/modules/UserPanel/IndexBox/IndexBox.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as icons from "@fortawesome/free-solid-svg-icons";

function IndexBox({ title, href, icon }) {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.content}>
          <div className={styles.icon}>
            <FontAwesomeIcon icon={icons[icon]} />
          </div>
          <div className={styles.title}>
            <h2>
              <Link href={href}>{title}</Link>
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndexBox;
