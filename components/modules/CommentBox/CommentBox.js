import React from "react";
import styles from "@/styles/modules/CommentBox/CommentBox.module.css";
import { Avatar, Rating } from "@mui/material";

function CommentBox() {
  return (
    <>
      <div className={styles.comment}>
        <div className={styles.content}>
          <div className={styles.profile}>
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt="A"
              src="/images/avatar.png"
            ></Avatar>
          </div>

          <div className={styles.infos}>
            <div className={styles.name}>
              <h3>Sina</h3>
            </div>
            <div className={styles.stars}>
              <Rating name="half-rating" value={3} readOnly />
            </div>
            <div className={styles.body}>
              <p>تستی</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentBox;
