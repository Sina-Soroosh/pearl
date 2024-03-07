import React, { useState } from "react";
import styles from "@/panelAdminStyles/Users/UsersDetails/UsersDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";

const columns = [
  { id: 1, label: "نام کاربری" },
  { id: 2, label: "ایمیل" },
  { id: 4, label: "تاریخ عضویت" },
  { id: 5, label: "" },
];

function UsersDetails() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([{ _id: 1 }]);

  return (
    <div className={styles.details}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h3>کاربران</h3>
        </div>
        <div className={styles.table}>
          <TableDetails
            columns={columns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            rowsLength={users.length}
            isPagination={true}
          >
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <TableRow key={user._id} hover role="checkbox" tabIndex={-1}>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      sdsd
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <a href={`mailto:`}>sdsd@gmail.com</a>
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      2024/02/12
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <button className="btn btn-warning fs-5 mx-2">
                        تغییر اطلاعات
                      </button>
                      <button className="btn btn-primary fs-5 mx-2">
                        تغییر نقش
                      </button>
                      <button className="btn btn-danger fs-5 mx-2">
                        حذف کاربر
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

export default UsersDetails;
