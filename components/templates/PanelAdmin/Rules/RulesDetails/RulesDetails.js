import React, { useState } from "react";
import styles from "@/panelAdminStyles/Rules/RulesDetails/RulesDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";

const columns = [
  { id: 1, label: "عنوان" },
  { id: 2, label: "متن" },
  { id: 3, label: "" },
];

function RulesDetails() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [rules, setRules] = useState([{ _id: 1 }]);

  return (
    <>
      <div className={styles.details}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>قوانین</h3>
          </div>
          <div className={styles.table}>
            <TableDetails
              columns={columns}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              rowsLength={rules.length}
              isPagination={true}
            >
              {rules
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rule) => {
                  return (
                    <TableRow
                      key={rule._id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        عنوان تستی
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <button className="btn btn-primary fs-5 mx-3">
                          دیدن قانون
                        </button>
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <button className="btn btn-danger fs-5 mx-3">
                          حذف قانون
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

export default RulesDetails;
