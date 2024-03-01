import React from "react";
import styles from "@/styles/modules/PanelAdmin/DetailsBox/DetailsBox.module.css";

function DetailsBox({ title, value, Icon }) {
  return (
    <div className={styles.box}>
      <div className={`${styles.content} row`}>
        <div className="col-6">
          <div className={styles.icon}>
            <Icon />
          </div>
        </div>
        <div className="col-6">
          <div className={styles.detail}>
            <div className={styles.value}>
              <span>{value}</span>
            </div>
            <div className={styles.title}>
              <h3>{title}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsBox;
