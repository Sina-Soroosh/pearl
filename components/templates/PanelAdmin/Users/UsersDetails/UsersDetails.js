import React, { useState } from "react";
import styles from "@/panelAdminStyles/Users/UsersDetails/UsersDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const columns = [
  { id: 1, label: "نام کاربری" },
  { id: 2, label: "ایمیل" },
  { id: 3, label: "نقش" },
  { id: 4, label: "تاریخ عضویت" },
  { id: 5, label: "" },
];

function UsersDetails(props) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([...props.users]);
  const swal = withReactContent(Swal);

  const getUsers = async () => {
    const res = await fetch(`/api/users`);

    if (res.status === 200) {
      const data = await res.json();

      const newUsers = data.sort(
        (prev, next) => new Date(next.createdAt) - new Date(prev.createdAt)
      );

      setUsers(newUsers);
    }
  };

  const updateHandler = async (values, Swal, username) => {
    const res = await fetch(`/api/users/${username}`, {
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
          title: "کاربری با این نام کاربری یا ایمیل وجود دارد",
          confirmButtonText: "باشه",
          icon: "error",
        });
        break;
      case 200:
        swal.fire({
          title: "کاربر با موفقیت بروزرسانی شد",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getUsers();
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

  const removeHandler = async (values, Swal, username) => {
    const res = await fetch(`/api/users/${username}`, {
      method: "DELETE",
    });

    Swal.close();

    switch (res.status) {
      case 200:
        swal.fire({
          title: "کاربر با موفقیت حذف شد",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getUsers();
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

  const loader = async (func, values, username) => {
    swal.fire({
      title: "لطفا چند لحظه صبر کنید",
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();

        func(values, Swal, username);
      },
    });
  };

  const onSubmitUpdate = (user) => {
    let username = user.username;
    let email = user.email;
    let password = "";

    swal
      .fire({
        title: "اطلاعات جدید را وارد کنید",
        html: (
          <>
            <div className={styles.form_update}>
              <label htmlFor="username">نام کاربری</label>
              <input
                type="text"
                id="username"
                defaultValue={username}
                onChange={(e) => (username = e.target.value)}
              />
              <label htmlFor="email">ایمیل</label>
              <input
                type="email"
                id="email"
                defaultValue={email}
                onChange={(e) => (email = e.target.value)}
              />
              <label htmlFor="password">رمز عبور</label>
              <input
                type="password"
                id="password"
                defaultValue={password}
                onChange={(e) => (password = e.target.value)}
              />
            </div>
          </>
        ),
        confirmButtonText: "ثبت اطلاعات",
        confirmButtonColor: "#eb7025",
      })
      .then((res) => {
        if (res.isConfirmed) {
          loader(
            updateHandler,
            { username, email, password: password || undefined },
            user.username
          );
        }
      });
  };

  const onSubmitChangeRole = (user) => {
    swal
      .fire({
        title: "آیا مطمئنید که میخواهید نقش این کاربر را تغییر دهید؟",
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
          loader(
            updateHandler,
            { role: user.role === "ADMIN" ? "USER" : "ADMIN" },
            user.username
          );
        }
      });
  };

  const onSubmitDelete = (user) => {
    swal
      .fire({
        title: "آیا مطمئنید که میخواهید این کاربر را حذف کنید؟",
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
          loader(removeHandler, {}, user.username);
        }
      });
  };

  return (
    <div className={styles.details}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h3>کاربران</h3>
        </div>
        <div className={styles.table}>
          <TableDetails
            columns={columns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            rowsLength={users.length}
            isPagination={true}
          >
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <TableRow key={user._id} hover role="checkbox" tabIndex={-1}>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      {user.username}
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      {user.role === "ADMIN" ? "مدیر" : "کاربر"}
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      {user.createdAt.slice(0, 4)}/{user.createdAt.slice(5, 7)}/
                      {user.createdAt.slice(8, 10)}
                    </TableCell>
                    <TableCell style={{ fontSize: "15px" }} align="right">
                      <button
                        className="btn btn-warning fs-5 mx-2"
                        onClick={() => onSubmitUpdate(user)}
                      >
                        تغییر اطلاعات
                      </button>
                      <button
                        className="btn btn-primary fs-5 mx-2"
                        onClick={() => onSubmitChangeRole(user)}
                      >
                        تغییر نقش
                      </button>
                      <button
                        className="btn btn-danger fs-5 mx-2"
                        onClick={() => onSubmitDelete(user)}
                      >
                        حذف کاربر
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

export default UsersDetails;
