import React, { useState } from "react";
import styles from "@/styles/modules/CreateComment/CreateComment.module.css";
import Link from "next/link";
import { Rating } from "@mui/material";

function CreateComment(props) {
  const [valueRating, setValueRating] = useState(0);

  const changeValueRatingHandler = (e, newValue) => {
    setValueRating(newValue);
  };

  return (
    <>
      <div className={styles.create_comment}>
        {props.user ? (
          <div className={styles.content}>
            <div className={styles.rating}>
              <h4>امتیاز شما</h4>
              <Rating
                size="large"
                value={valueRating}
                onChange={changeValueRatingHandler}
              />
            </div>

            <div className={styles.body}>
              <textarea placeholder="نظر و انتقاد شما"></textarea>
            </div>
            <div className={styles.submit_btn}>
              <button>ثبت نظر</button>
            </div>
          </div>
        ) : (
          <div className={`alert alert-danger ${styles.err}`}>
            <p>
              لطفا برای ثبت نظر ابتدا{" "}
              <Link href="/">وارد حساب کاربری خود شوید.</Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateComment;
