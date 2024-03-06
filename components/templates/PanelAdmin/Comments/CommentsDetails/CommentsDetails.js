import React, { useState } from "react";
import styles from "@/panelAdminStyles/Comments/CommentsDetails/CommentsDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { Rating, TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";

const columns = [
  { id: 1, label: "محصول" },
  { id: 2, label: "کاربر" },
  { id: 3, label: "امتیاز" },
  { id: 4, label: "متن" },
  { id: 5, label: "وضعیت" },
  { id: 6, label: "" },
];

function CommentsDetails() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [comments, setComments] = useState([{ _id: 1 }, { _id: 2 }]);

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
                      ساعت
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      سینا
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <Rating name="half-rating" value={3} readOnly />
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <button className="btn btn-primary fs-5">
                        دیدن متن کامنت
                      </button>
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      تایید نشده
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <button className="btn btn-primary fs-5">
                        تغییر وضعیت
                      </button>
                      <button className="btn btn-danger fs-5 mx-3">
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

export default CommentsDetails;
