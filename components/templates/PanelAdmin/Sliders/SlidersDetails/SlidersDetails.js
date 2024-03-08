import React, { useState } from "react";
import styles from "@/panelAdminStyles/Sliders/SlidersDetails/SlidersDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";

const columns = [
  { id: 1, label: "" },
  { id: 2, label: "عنوان" },
  { id: 3, label: "نوشته" },
  { id: 4, label: "محصول" },
  { id: 5, label: "" },
];

function SlidersDetails() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [sliders, setSliders] = useState([{ _id: 1 }]);

  return (
    <>
      <div className={styles.details}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>اسلایدرها</h3>
          </div>
          <div className={styles.table}>
            <TableDetails
              columns={columns}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              rowsLength={sliders.length}
              isPagination={true}
            >
              {sliders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((slider) => {
                  return (
                    <TableRow
                      key={slider._id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        <img
                          src="/images/products/88eecb8c3f5379b0ed18f7708.png"
                          alt=""
                        />
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        لامپ
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        111,000 تومان
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <Link href={`/p-admin/products`}>لامپ</Link>
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <button
                          className="btn btn-danger fs-5 mx-3"
                          //   onClick={() => onSubmitRemove(rule._id)}
                        >
                          حذف اسلایدر
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

export default SlidersDetails;
