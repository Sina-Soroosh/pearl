import React from "react";
import styles from "@/panelAdminStyles/Dashboard/Details/Details.module.css";

function Details() {
  return (
    <div className={styles.details}>
      <div className={styles.content}>
        <div className="row">
          <div className="col-md-6 col-lg-3"></div>
          <div className="col-md-6 col-lg-3"></div>
          <div className="col-md-6 col-lg-3"></div>
          <div className="col-md-6 col-lg-3"></div>
        </div>
      </div>
    </div>
  );
}

export default Details;
