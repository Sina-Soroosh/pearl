import React from "react";
import styles from "@/panelAdminStyles/Dashboard/Tables/Tables.module.css";

function Tables() {
  return (
    <div className={styles.tables}>
      <div className={styles.content}>
        <div className="row">
          <div className="col-lg-6">
            <div className={styles.table}>
              <div className={styles.title}>
                <h3>آخرین سفارشات</h3>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className={styles.table}>
              <div className={styles.title}>
                <h3>جدیدترین کاربران</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tables;
