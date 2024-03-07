import React, { useState } from "react";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import styles from "@/panelAdminStyles/Products/ProductsDetails/ProductsDetails.module.css";
import Link from "next/link";
import { Add } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const columns = [
  { id: 1, label: "" },
  { id: 2, label: "نام" },
  { id: 3, label: "نام کوتاه" },
  { id: 5, label: "قیمت" },
  { id: 6, label: "نخفیف" },
  { id: 7, label: "وضعیت" },
  { id: 8, label: "" },
];

function ProductsDetails(props) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([...props.products]);
  const swal = withReactContent(Swal);

  const getProducts = async () => {
    const res = await fetch(`/api/products`);

    if (res.status === 200) {
      const data = await res.json();

      setProducts(data);
    }
  };

  const removeHandler = async (values, Swal, shortName) => {
    const res = await fetch(`/api/products/${shortName}`, {
      method: "DELETE",
    });

    Swal.close();

    switch (res.status) {
      case 200:
        swal.fire({
          title: "محصول با موفقیت حذف شد",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getProducts();
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

  const changeStatus = async (values, Swal, shortName) => {
    const res = await fetch(`/api/products/changeStatus/${shortName}`, {
      method: "PUT",
    });

    Swal.close();

    switch (res.status) {
      case 200:
        swal.fire({
          title: "وضعیت محصول با موفقیت تغییر کرد.",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getProducts();
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

  const discountHandler = async (values, Swal, shortName) => {
    const res = await fetch(`/api/products/${shortName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ discount: values.discount }),
    });

    Swal.close();

    switch (res.status) {
      case 200:
        swal.fire({
          title: "تخفیف با موفقیت اعمال شد",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getProducts();
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

  const loader = async (func, values, shortName) => {
    swal.fire({
      title: "لطفا چند لحظه صبر کنید",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        func(values, Swal, shortName);
      },
    });
  };

  const onSubmitChangeStatus = (product) => {
    swal
      .fire({
        title: "آیا مطمئنید که میخواهید وضعیت این محصول را تغییر دهید؟",
        icon: "question",
        confirmButtonText: "بله",
        cancelButtonText: "نه",
        showCancelButton: true,
        confirmButtonColor: "rgb(69 71 76)",
        cancelButtonColor: "var(--orange)",
        focusCancel: true,
      })
      .then((res) => {
        if (res.isConfirmed) {
          loader(changeStatus, {}, product.shortName);
        }
      });
  };

  const onSubmitDelete = (product) => {
    swal
      .fire({
        title: "آیا مطمئنید که میخواهید این محصول را حذف کنید؟",
        icon: "question",
        confirmButtonText: "بله",
        cancelButtonText: "نه",
        showCancelButton: true,
        confirmButtonColor: "rgb(69 71 76)",
        cancelButtonColor: "var(--orange)",
        focusCancel: true,
      })
      .then((res) => {
        if (res.isConfirmed) {
          loader(removeHandler, {}, product.shortName);
        }
      });
  };

  const onSubmitDiscount = (product) => {
    let discount = product.discount;

    swal
      .fire({
        title: "تخفیف جدید را وارد کنید",
        html: (
          <>
            <div className={styles.form_update}>
              <input
                type="number"
                id="title"
                min={0}
                max={100}
                defaultValue={discount}
                onChange={(e) => (discount = +e.target.value)}
              />
            </div>
          </>
        ),
        confirmButtonText: "ثبت تخفیف",
        confirmButtonColor: "#eb7025",
      })
      .then((res) => {
        if (res.isConfirmed) {
          if (discount < 0 || discount > 100) {
            swal
              .fire({
                title: "لطفا یک مقدار درست وارد نمایید.",
                icon: "error",
                confirmButtonText: "باشه",
              })
              .then(() => onSubmitDiscount(product));
          } else {
            loader(discountHandler, { discount }, product.shortName);
          }
        }
      });
  };

  return (
    <>
      <div className={styles.products}>
        <div className={styles.content}>
          <div className={styles.top_products}>
            <div className={styles.title}>
              <h3>لیست محصولات</h3>
            </div>
            <div className={styles.create_product}>
              <Link href="/p-admin/products/create" className="btn btn-primary">
                <Add />
                افزودن محصول
              </Link>
            </div>
          </div>
          <div className={styles.table}>
            <TableDetails
              columns={columns}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              rowsLength={products.length}
              isPagination={true}
            >
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product) => {
                  return (
                    <TableRow
                      key={product._id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell className={styles.cell} align="right">
                        <img
                          src={product.image}
                          alt={product.title}
                          className={styles.image}
                        />
                      </TableCell>
                      <TableCell className={styles.cell} align="right">
                        <Link href={`/p-admin/products/${product.shortName}`}>
                          {product.title}
                        </Link>
                      </TableCell>
                      <TableCell className={styles.cell} align="right">
                        <Link href={`/p-admin/products/${product.shortName}`}>
                          {product.shortName}
                        </Link>
                      </TableCell>
                      <TableCell className={styles.cell} align="right">
                        {product.price.toLocaleString()} تومان
                      </TableCell>
                      <TableCell className={styles.cell} align="right">
                        {product.discount}%
                      </TableCell>
                      <TableCell className={styles.cell} align="right">
                        {product.isAvailable ? "موجود" : "ناموجود"}
                      </TableCell>
                      <TableCell className={styles.cell} align="right">
                        <button
                          className={`btn ${
                            product.isAvailable ? "btn-danger" : "btn-success"
                          }`}
                          onClick={() => onSubmitChangeStatus(product)}
                        >
                          تغییر وضعیت
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={() => onSubmitDiscount(product)}
                        >
                          افزودن تخفیف
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => onSubmitDelete(product)}
                        >
                          حذف
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

export default ProductsDetails;
