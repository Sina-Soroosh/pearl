import React from "react";
import styles from "@/panelAdminStyles/Dashboard/Details/Details.module.css";
import DetailsBox from "@/panelAdminModules/DetailsBox/DetailsBox";
import { FiShoppingCart, FiUsers } from "react-icons/fi";
import { FaBox, FaComment } from "react-icons/fa";

function Details() {
  return (
    <div className={styles.details}>
      <div className={styles.content}>
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <DetailsBox title="کاربران" value={30} Icon={FiUsers} />
          </div>
          <div className="col-md-6 col-lg-3">
            <DetailsBox title="محصولات" value={10} Icon={FaBox} />
          </div>
          <div className="col-md-6 col-lg-3">
            <DetailsBox title="سفارشات" value={5} Icon={FiShoppingCart} />
          </div>
          <div className="col-md-6 col-lg-3">
            <DetailsBox title="کامنت ها" value={13} Icon={FaComment} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
