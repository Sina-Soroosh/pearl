import React, { useState } from "react";
import styles from "@/panelAdminStyles/Messages/MessagesDetails/MessagesDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { Rating, TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";

const columns = [
  { id: 1, label: "نام" },
  { id: 2, label: "ایمیل" },
  { id: 3, label: "متن" },
  { id: 4, label: "تاریخ ارسال پیام" },
  { id: 5, label: "" },
];

function MessagesDetails() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [messages, setMessages] = useState([{ _id: 1 }]);

  return (
    <>
      <div className={styles.details}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>پیام ها</h3>
          </div>
          <div className={styles.table}>
            <TableDetails
              columns={columns}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              rowsLength={messages.length}
              isPagination={true}
            >
              {messages
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((message) => {
                  return (
                    <TableRow
                      key={message._id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        سینا سروش فر
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <a href={`mailto:`}>sina@gmail.com</a>
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <button className="btn btn-primary fs-5 mx-3">
                          دیدن پیام
                        </button>
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        2024/03/02
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <button className="btn btn-danger fs-5 mx-3">
                          حذف پیام
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableDetails>
          </div>
        </div>
      </div>
    </>
  );
}

export default MessagesDetails;
