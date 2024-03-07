import React, { useState } from "react";
import styles from "@/panelAdminStyles/categories/CategoriesDetails/CategoriesDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { IconButton, TableCell, TableRow } from "@mui/material";
import Link from "next/link";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const columns = [
  { id: 1, label: "نام" },
  { id: 2, label: "نام کوتاه" },
  { id: 3, label: "بروزرسانی" },
  { id: 4, label: "حذف" },
];

function CategoriesDetails(props) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const swal = withReactContent(Swal);
  const [categories, setCategories] = useState([...props.categories]);

  const getCategories = async () => {
    const res = await fetch(`/api/categories`);

    if (res.status === 200) {
      const data = await res.json();

      setCategories(data);
    }
  };

  const removeHandler = async (values, Swal, shortName) => {
    const res = await fetch(`/api/categories/${shortName}`, {
      method: "DELETE",
    });

    Swal.close();

    switch (res.status) {
      case 200:
        swal.fire({
          title: "دسته بندی با موفقیت حذف شد",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getCategories();
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

  const updateHandler = async (values, Swal, shortName) => {
    const res = await fetch(`/api/categories/${shortName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    Swal.close();

    switch (res.status) {
      case 400:
        swal.fire({
          title: "مقادیر وارد شده معتبر نیست",
          confirmButtonText: "باشه",
          icon: "error",
        });
        break;
      case 422:
        swal.fire({
          title: "دسته بندی با این نام کوتاه وجود دارد",
          confirmButtonText: "باشه",
          icon: "error",
        });
        break;
      case 200:
        swal.fire({
          title: "دسته بندی با موفقیت بروزرسانی شد",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getCategories();
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

  const onSubmitUpdate = (category) => {
    let title = category.title;
    let shortName = category.shortName;

    swal
      .fire({
        title: "اطلاعات جدید را وارد کنید",
        html: (
          <>
            <div className={styles.form_update}>
              <label htmlFor="title">نام</label>
              <input
                type="text"
                id="title"
                defaultValue={title}
                onChange={(e) => (title = e.target.value)}
              />
              <label htmlFor="shortName">نام کوتاه</label>
              <input
                type="text"
                id="shortName"
                defaultValue={shortName}
                onChange={(e) => (shortName = e.target.value)}
              />
            </div>
          </>
        ),
        confirmButtonText: "ثبت اطلاعات",
        confirmButtonColor: "#eb7025",
      })
      .then((res) => {
        if (res.isConfirmed) {
          loader(updateHandler, { title, shortName }, category.shortName);
        }
      });
  };

  const onSubmitDelete = (category) => {
    swal
      .fire({
        title: "آیا مطمئنید که میخواهید این دسته بندی را حذف کنید؟",
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
          loader(removeHandler, {}, category.shortName);
        }
      });
  };

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
            rowsLength={categories.length}
            isPagination={true}
          >
            {categories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category) => {
                return (
                  <TableRow
                    key={category._id}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      {category.title}
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <Link
                        href={`/product-category/${category.shortName}`}
                        style={{ color: "#000" }}
                      >
                        {category.shortName}
                      </Link>
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        size="large"
                        onClick={() => onSubmitUpdate(category)}
                      >
                        <FaPencilAlt />
                      </IconButton>
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <IconButton
                        aria-label="delete"
                        color="error"
                        size="large"
                        onClick={() => onSubmitDelete(category)}
                      >
                        <FaTrash />
                      </IconButton>
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

export default CategoriesDetails;
