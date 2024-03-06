import React, { useState } from "react";
import styles from "@/panelAdminStyles/Orders/OrdersDetails/OrdersDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { Rating, TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";

const columns = [
  { id: 1, label: "سفارش" },
  { id: 2, label: "نام گیرنده" },
  { id: 4, label: "شماره" },
  { id: 5, label: "ایمیل" },
  { id: 6, label: "تاریخ" },
  { id: 7, label: "وضعیت" },
  { id: 8, label: "مجموع" },
  { id: 9, label: "" },
];

function OrdersDetails(props) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState([...props.orders]);

  const getOrders = async () => {
    const res = await fetch(`/api/orders/getAll`);

    if (res.status === 200) {
      const data = await res.json();

      setOrders([...data].reverse());
    }
  };

  const changeStatus = async (swal, ID) => {
    const res = await fetch(`/api/orders/changeStatus/${ID}`, {
      method: "PUT",
    });

    Swal.close();

    switch (res.status) {
      case 200:
        swal.fire({
          title: "وضعیت سفارش با موفقیت تغییر کرد.",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getOrders();
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

  const removeOrder = async (swal, ID) => {
    const res = await fetch(`/api/orders/${ID}`, {
      method: "DELETE",
    });

    Swal.close();

    switch (res.status) {
      case 200:
        swal.fire({
          title: "سفارش با موفقیت حذف شد",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getOrders();
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
      title: "آیا مطمئنید که میخواهید وضعیت این سفارش را تغییر دهید؟",
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
      title: "آیا مطمئنید که میخواهید این سفارش را حذف کنید؟",
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "نه",
      showCancelButton: true,
      confirmButtonColor: "rgb(69 71 76)",
      cancelButtonColor: "var(--orange)",
      focusCancel: true,
    }).then((res) => {
      if (res.isConfirmed) {
        loader(removeOrder, ID);
      }
    });
  };

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
                      <Link href={`/p-admin/orders/${order.orderID}`}>
                        #{order.orderID}
                      </Link>
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      {order.user.firstName} {order.user.lastName}
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <a href={`tel:${order.user.phone}`}>{order.user.phone}</a>
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      {order.createdAt.slice(0, 4)}/
                      {order.createdAt.slice(5, 7)}/
                      {order.createdAt.slice(8, 10)}
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      {(order.status === "pending" && "در حال بررسی") ||
                        (order.status === "shipped" && "در حال ارسال") ||
                        (order.status === "delivered" && "تحویل داده شده")}
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      {order.total.toLocaleString()} تومان
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <button
                        className="btn btn-primary fs-5"
                        onClick={() => onSubmitChangeStatus(order.orderID)}
                      >
                        تغییر وضعیت
                      </button>
                      <button
                        className="btn btn-danger fs-5 mx-3"
                        onClick={() => onSubmitRemove(order.orderID)}
                      >
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
