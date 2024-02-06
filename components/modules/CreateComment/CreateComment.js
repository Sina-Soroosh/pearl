import React, { useRef, useState } from "react";
import styles from "@/styles/modules/CreateComment/CreateComment.module.css";
import Link from "next/link";
import { Rating } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

function CreateComment(props) {
  const swal = withReactContent(Swal);
  const [valueRating, setValueRating] = useState(0);
  const router = useRouter();
  const bodyRef = useRef();

  const changeValueRatingHandler = (e, newValue) => {
    setValueRating(newValue);
  };

  const createCommentHandler = async (Swal) => {
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        star: valueRating,
        body: bodyRef.current.value,
        product: props.shortName,
      }),
    });

    Swal.close();

    if (res.status === 401) {
      swal
        .fire({
          title: "لطفا ابتدا وارد حساب کاربری خود شوید !!",
          icon: "error",
          confirmButtonText: "باشه",
        })
        .then(() => router.push("/login"));
    } else if (res.status === 400) {
      swal.fire({
        title: "لطفا امتیاز و متن خود را وارد کنید !!",
        icon: "error",
        confirmButtonText: "باشه",
      });
    } else if (res.status === 201) {
      swal.fire({
        title: "کامنت با موفقیت اضافه شد",
        text: "بعد از تایید نمایش داده میشود",
        icon: "success",
        confirmButtonText: "باشه",
      });

      bodyRef.current.value = "";
      setValueRating(0);
    }
  };

  const onSubmit = () => {
    if (valueRating === 0) {
      swal.fire({
        title: "لطفا امتیاز خود را وارد کنید !!",
        icon: "error",
        confirmButtonText: "باشه",
      });

      return;
    }

    if (bodyRef.current.value.length < 5) {
      swal.fire({
        title: "لطفا متن خود را وارد کنید !!",
        icon: "error",
        confirmButtonText: "باشه",
      });

      return;
    }

    swal.fire({
      title: "لطفا چند لحظه صبر کنید",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        createCommentHandler(Swal);
      },
    });
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
              <textarea ref={bodyRef} placeholder="نظر و انتقاد شما"></textarea>
            </div>
            <div className={styles.submit_btn} onClick={onSubmit}>
              <button>ثبت نظر</button>
            </div>
          </div>
        ) : (
          <div className={`alert alert-danger ${styles.err}`}>
            <p>
              لطفا برای ثبت نظر ابتدا{" "}
              <Link href="/login">وارد حساب کاربری خود شوید.</Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateComment;
