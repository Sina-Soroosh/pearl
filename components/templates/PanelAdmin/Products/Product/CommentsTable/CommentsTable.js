import React, { useState } from "react";
import styles from "@/panelAdminStyles/Products/Product/CommentsTable/CommentsTable.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { Rating, TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";

const columns = [
  { id: 1, label: "کاربر" },
  { id: 2, label: "امتیاز" },
  { id: 3, label: "متن" },
  { id: 4, label: "وضعیت" },
  { id: 5, label: "" },
];

function CommentsTable({ commentsInfos, shortName }) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [comments, setComments] = useState([...commentsInfos]);

  const getComments = async () => {
    const res = await fetch(`/api/comments`);

    if (res.status === 200) {
      const data = await res.json();
      const newComments = data.filter(
        (comment) => comment.product.shortName === shortName
      );

      setComments([...newComments].reverse());
    }
  };

  const showComment = (body) => {
    Swal.fire({
      title: body,
      confirmButtonText: "مشاهده کزدم",
    });
  };

  const changeStatus = async (swal, ID) => {
    const res = await fetch(`/api/comments/changeStatus/${ID}`, {
      method: "PUT",
    });

    Swal.close();

    switch (res.status) {
      case 200:
        swal.fire({
          title: "وضعیت کامنت با موفقیت تغییر کرد.",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getComments();
        break;
      default:
        swal.fire({
          title: "خطایی رخ داده. \n لطفا اتصال خود را چک کنید.",
          confirmButtonText: "باشه",
          icon: "error",
        });
        break;
    }
  };

  const removeComment = async (swal, ID) => {
    const res = await fetch(`/api/comments/${ID}`, {
      method: "DELETE",
    });

    Swal.close();

    switch (res.status) {
      case 200:
        swal.fire({
          title: "کامنت با موفقیت حذف شد",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getComments();
        break;
      default:
        swal.fire({
          title: "خطایی رخ داده. \n لطفا اتصال خود را چک کنید.",
          confirmButtonText: "باشه",
          icon: "error",
        });
        break;
    }
  };

  const loader = async (func, ID) => {
    Swal.fire({
      title: "لطفا چند لحظه صبر کنید",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        func(Swal, ID);
      },
    });
  };

  const onSubmitChangeStatus = (ID) => {
    Swal.fire({
      title: "آیا مطمئنید که میخواهید وضعیت این کامنت را تغییر دهید؟",
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "نه",
      showCancelButton: true,
      confirmButtonColor: "rgb(69 71 76)",
      cancelButtonColor: "var(--orange)",
      focusCancel: true,
    }).then((res) => {
      if (res.isConfirmed) {
        loader(changeStatus, ID);
      }
    });
  };

  const onSubmitRemove = (ID) => {
    Swal.fire({
      title: "آیا مطمئنید که میخواهید این کامنت را حذف کنید؟",
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "نه",
      showCancelButton: true,
      confirmButtonColor: "rgb(69 71 76)",
      cancelButtonColor: "var(--orange)",
      focusCancel: true,
    }).then((res) => {
      if (res.isConfirmed) {
        loader(removeComment, ID);
      }
    });
  };

  return (
    <div className={styles.details}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h3>کامنت ها</h3>
        </div>
        <div className={styles.table}>
          <TableDetails
            columns={columns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            rowsLength={comments.length}
          >
            {comments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((comment) => {
                return (
                  <TableRow
                    key={comment._id}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      {comment.creator.username}
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <Rating
                        name="half-rating"
                        value={comment.star}
                        readOnly
                      />
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <button
                        className="btn btn-primary fs-5"
                        onClick={() => showComment(comment.body)}
                      >
                        دیدن متن کامنت
                      </button>
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      {comment.isShow ? "تایید شده" : "تایید نشده"}
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <button
                        className="btn btn-primary fs-5"
                        onClick={() => onSubmitChangeStatus(comment._id)}
                      >
                        تغییر وضعیت
                      </button>
                      <button
                        className="btn btn-danger fs-5 mx-3"
                        onClick={() => onSubmitRemove(comment._id)}
                      >
                        حذف کامنت
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableDetails>
        </div>
      </div>
    </div>
  );
}

export default CommentsTable;
