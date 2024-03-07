import React from "react";
import styles from "@/panelAdminStyles/Orders/Order/OrderDetails/OrderDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const columnsProducts = [
  { id: 1, label: "محصول" },
  { id: 2, label: "مجموع" },
];

const columnsDetails = [
  { id: 1, label: "عنوان" },
  { id: 2, label: "مقدار" },
];
function OrderDetails({ order }) {
  const router = useRouter();

  const changeStatus = async (swal) => {
    const res = await fetch(`/api/orders/changeStatus/${order.orderID}`, {
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

        router.push("/p-admin/orders");
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

  const removeOrder = async (swal) => {
    const res = await fetch(`/api/orders/${order.orderID}`, {
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

        router.replace("/p-admin/orders");
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

        func(Swal);
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
        loader(changeStatus);
      }
    });
  };

  const onSubmitRemove = () => {
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
        loader(removeOrder);
      }
    });
  };

  return (
    <>
      <div className={styles.details}>
        <div className={styles.content}>
          <div className={styles.top_details}>
            <div className={styles.title}>
              <h3>جزییات سفارش</h3>
            </div>
            <div className={styles.buttons}>
              <button
                className="btn btn-primary fs-5"
                onClick={onSubmitChangeStatus}
              >
                تغییر وضعیت
              </button>
              <button className="btn btn-danger fs-5" onClick={onSubmitRemove}>
                حذف سفارش
              </button>
            </div>
          </div>
          <div className={styles.text}>
            <p>
              سفارش #<span>{order.orderID}</span> در تاریخ{" "}
              <span>
                {" "}
                {order.createdAt.slice(0, 4)}/{order.createdAt.slice(5, 7)}/
                {order.createdAt.slice(8, 10)}
              </span>{" "}
              ثبت شده است و در حال حاضر در وضعیت در{" "}
              <span>
                {(order.status === "pending" && "در حال بررسی") ||
                  (order.status === "shipped" && "در حال ارسال") ||
                  (order.status === "delivered" && "تحویل داده شده")}
              </span>{" "}
              می‌باشد.
            </p>
          </div>

          <div className={styles.table}>
            <TableDetails columns={columnsProducts} isPagination={false}>
              {order.products.map((product) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={product._id}>
                  <TableCell align="right" style={{ fontSize: "15px" }}>
                    {product.title} × {product.count}
                  </TableCell>
                  <TableCell align="right" style={{ fontSize: "15px" }}>
                    {(product.price * product.count).toLocaleString()} تومان
                  </TableCell>
                </TableRow>
              ))}
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  قیمت نهایی
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  {order.total.toLocaleString()} تومان
                </TableCell>
              </TableRow>
            </TableDetails>
          </div>
          <div className={styles.table}>
            <TableDetails columns={columnsDetails} isPagination={false}>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  نام گیرنده
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  {order.user.firstName} {order.user.lastName}
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  ایمیل
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  شماره تلفن
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  <a href={`tel:${order.user.phone}`}>{order.user.phone}</a>
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  استان
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  {order.address.province}
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  شهر
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  {order.address.city}
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  ادرس
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  {order.address.address}
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  کدپستی
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  {order.address.postalCode}
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  توضیحات
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  {order.desc}
                </TableCell>
              </TableRow>
            </TableDetails>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
