import React from "react";
import styles from "@/panelAdminStyles/Orders/Order/OrderDetails/OrderDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { Rating, TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";

const columnsProducts = [
  { id: 1, label: "محصول" },
  { id: 2, label: "مجموع" },
];

const columnsDetails = [
  { id: 1, label: "عنوان" },
  { id: 2, label: "مقدار" },
];

function OrderDetails() {
  return (
    <>
      <div className={styles.details}>
        <div className={styles.content}>
          <div className={styles.top_details}>
            <div className={styles.title}>
              <h3>جزییات سفارش</h3>
            </div>
            <div className={styles.buttons}>
              <button className="btn btn-primary fs-5">تغییر وضعیت</button>
              <button className="btn btn-danger fs-5">حذف سفارش</button>
            </div>
          </div>
          <div className={styles.text}>
            <p>
              سفارش #<span>10005</span> در تاریخ <span>2024/02/12</span> ثبت شده
              است و در حال حاضر در وضعیت در <span>درحال بررسی</span> می‌باشد.
            </p>
          </div>

          <div className={styles.table}>
            <TableDetails columns={columnsProducts} isPagination={false}>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  میز × 2
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  2,000,000 تومان
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  میز × 2
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  2,000,000 تومان
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  میز × 2
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  2,000,000 تومان
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  قیمت نهایی
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  6,000,000 تومان
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
                  سینا سروش فر
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  ایمیل
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  <a href={`mailto:`}>sina@gmail.com</a>
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  شماره تلفن
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  <a href={`tel:`}>09176009832</a>
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  استان
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  فارس
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  شهر
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  جهرم
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  ادرس
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  خیابان عبرت
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  کدپستی
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  0732434838
                </TableCell>
              </TableRow>
              <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  توضیحات
                </TableCell>
                <TableCell align="right" style={{ fontSize: "15px" }}>
                  توسیبتیبا
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
