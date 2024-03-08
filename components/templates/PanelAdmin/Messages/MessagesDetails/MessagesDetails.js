import React, { useState } from "react";
import styles from "@/panelAdminStyles/Messages/MessagesDetails/MessagesDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { Rating, TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";

const columns = [
  { id: 1, label: "نام" },
  { id: 2, label: "ایمیل" },
  { id: 3, label: "متن" },
  { id: 4, label: "تاریخ ارسال پیام" },
  { id: 5, label: "" },
];

function MessagesDetails(props) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [messages, setMessages] = useState([...props.messages]);

  const getMessages = async () => {
    const res = await fetch("/api/messages");

    if (res.status === 200) {
      const data = await res.json();

      setMessages(data.reverse());
    }
  };

  const showMessageHandler = (text) => {
    Swal.fire({
      title: text,
      confirmButtonText: "پیام را دیدم",
    });
  };

  const removeMessage = async (swal, ID) => {
    const res = await fetch(`/api/messages/${ID}`, {
      method: "DELETE",
    });

    Swal.close();

    switch (res.status) {
      case 200:
        swal.fire({
          title: "پیام با موفقیت حذف شد",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getMessages();
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

  const onSubmitRemove = (ID) => {
    Swal.fire({
      title: "آیا مطمئنید که میخواهید این پیام را حذف کنید؟",
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "نه",
      showCancelButton: true,
      confirmButtonColor: "rgb(69 71 76)",
      cancelButtonColor: "var(--orange)",
      focusCancel: true,
    }).then((res) => {
      if (res.isConfirmed) {
        loader(removeMessage, ID);
      }
    });
  };

  return (
    <>
      <div className={styles.details}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>پیام ها</h3>
          </div>
          <div className={styles.table}>
            <TableDetails
              columns={columns}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              rowsLength={messages.length}
              isPagination={true}
            >
              {messages
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((message) => {
                  return (
                    <TableRow
                      key={message._id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        {message.name}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <a href={`mailto:${message.email}`}>{message.email}</a>
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <button
                          className="btn btn-primary fs-5 mx-3"
                          onClick={() => showMessageHandler(message.message)}
                        >
                          دیدن پیام
                        </button>
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        {message.createdAt.slice(0, 4)}/
                        {message.createdAt.slice(5, 7)}/
                        {message.createdAt.slice(8, 10)}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <button
                          className="btn btn-danger fs-5 mx-3"
                          onClick={() => onSubmitRemove(message._id)}
                        >
                          حذف پیام
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

export default MessagesDetails;
