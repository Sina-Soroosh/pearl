import React, { useState } from "react";
import styles from "@/panelAdminStyles/categories/CategoriesDetails/CategoriesDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { TableRow } from "@mui/material";

const columns = [
  { id: 1, label: "نام" },
  { id: 2, label: "نام کوتاه" },
  { id: 3, label: "بروزرسانی" },
  { id: 4, label: "حذف" },
];

function CategoriesDetails({ categories }) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([...categories]);

  return (
    <div className={styles.details}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h3>دسته بندی ها</h3>
        </div>
        <div className={styles.table}>
          <TableDetails
            columns={columns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            rowsLength={rows.length}
          >
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell align="right">hello</TableCell>
                    <TableCell align="right">hello</TableCell>
                    <TableCell align="right">hello</TableCell>
                  </TableRow>
                );
              })}
          </TableDetails>
        </div>
      </div>
    </div>
  );
}

export default CategoriesDetails;
