import React, { useState } from "react";
import styles from "@/panelAdminStyles/Orders/OrdersDetails/OrdersDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { Rating, TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";

const columns = [
  { id: 1, label: "سفارش" },
  { id: 2, label: "نام گیرنده" },
  { id: 3, label: "تاریخ" },
  { id: 4, label: "وضعیت" },
  { id: 5, label: "مجموع" },
  { id: 6, label: "" },
];

function OrdersDetails() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState([{ _id: 1 }]);

  return (
    <div className={styles.details}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h3>سفارشات</h3>
        </div>
        <div className={styles.table}>
          <TableDetails
            columns={columns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            rowsLength={orders.length}
          >
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => {
                return (
                  <TableRow key={order._id} hover role="checkbox" tabIndex={-1}>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <Link href={`/p-admin/orders/1000`}>#1000</Link>
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      سینا سروش فر
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      2024-02-10
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      در حال ارسال
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      2,000,000 تومان
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <button className="btn btn-primary fs-5">
                        تغییر وضعیت
                      </button>
                      <button className="btn btn-danger fs-5 mx-3">
                        حذف سفارش
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

export default OrdersDetails;
