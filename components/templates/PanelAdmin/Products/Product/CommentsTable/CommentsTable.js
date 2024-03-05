import React, { useState } from "react";
import styles from "@/panelAdminStyles/Products/Product/CommentsTable/CommentsTable.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { Rating, TableCell, TableRow } from "@mui/material";

const columns = [
  { id: 1, label: "کاربر" },
  { id: 2, label: "امتیاز" },
  { id: 3, label: "متن" },
  { id: 4, label: "وضعیت" },
  { id: 5, label: "" },
];

function CommentsTable() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [comments, setComments] = useState([{ _id: 2 }]);

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
                      سینا سروش فر
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <Rating name="half-rating" value={2} readOnly />
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <button className="btn btn-primary fs-5">
                        دیدن متن کامنت
                      </button>
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      تایید شده
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

export default CommentsTable;
