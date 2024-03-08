import React, { useState } from "react";
import styles from "@/panelAdminStyles/Questions/QuestionsDetails/QuestionsDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";

const columns = [
  { id: 1, label: "عنوان" },
  { id: 2, label: "متن" },
  { id: 3, label: "" },
];

function QuestionsDetails(props) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [questions, setQuestions] = useState([...props.questions]);

  const getQuestions = async () => {
    const res = await fetch("/api/faqs");

    if (res.status === 200) {
      const data = await res.json();

      setQuestions(data);
    }
  };

  const showQuestionHandler = (text) => {
    Swal.fire({
      title: text,
      confirmButtonText: "سوال را دیدم",
    });
  };

  const removeQuestion = async (swal, ID) => {
    const res = await fetch(`/api/faqs/${ID}`, {
      method: "DELETE",
    });

    Swal.close();

    switch (res.status) {
      case 200:
        swal.fire({
          title: "سوال با موفقیت حذف شد",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getQuestions();
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
      title: "آیا مطمئنید که میخواهید این سوال را حذف کنید؟",
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "نه",
      showCancelButton: true,
      confirmButtonColor: "rgb(69 71 76)",
      cancelButtonColor: "var(--orange)",
      focusCancel: true,
    }).then((res) => {
      if (res.isConfirmed) {
        loader(removeQuestion, ID);
      }
    });
  };

  return (
    <>
      <div className={styles.details}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>سوالات</h3>
          </div>
          <div className={styles.table}>
            <TableDetails
              columns={columns}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              rowsLength={questions.length}
              isPagination={true}
            >
              {questions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((question) => {
                  return (
                    <TableRow
                      key={question._id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        {question.title}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <button
                          className="btn btn-primary fs-5 mx-3"
                          onClick={() => showQuestionHandler(question.body)}
                        >
                          دیدن سوال
                        </button>
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <button
                          className="btn btn-danger fs-5 mx-3"
                          onClick={() => onSubmitRemove(question._id)}
                        >
                          حذف سوال
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

export default QuestionsDetails;
