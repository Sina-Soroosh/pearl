import React from "react";
import styles from "@/panelAdminStyles/Dashboard/Details/Details.module.css";
import DetailsBox from "@/panelAdminModules/DetailsBox/DetailsBox";
import { FiShoppingCart, FiUsers } from "react-icons/fi";
import { FaBox, FaComment } from "react-icons/fa";

function Details(props) {
  return (
    <div className={styles.details}>
      <div className={styles.content}>
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <DetailsBox title="کاربران" value={props.users} Icon={FiUsers} />
          </div>
          <div className="col-md-6 col-lg-3">
            <DetailsBox title="محصولات" value={props.products} Icon={FaBox} />
          </div>
          <div className="col-md-6 col-lg-3">
            <DetailsBox
              title="سفارشات"
              value={props.orders}
              Icon={FiShoppingCart}
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <DetailsBox
              title="کامنت ها"
              value={props.comments}
              Icon={FaComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
