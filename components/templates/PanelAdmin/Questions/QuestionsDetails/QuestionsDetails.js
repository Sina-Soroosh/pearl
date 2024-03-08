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

function QuestionsDetails() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [questions, setQuestions] = useState([{ _id: 1, title: "dsd" }]);

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
                          // onClick={() => showQuestionHandler(question.body)}
                        >
                          دیدن قانون
                        </button>
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <button
                          className="btn btn-danger fs-5 mx-3"
                          // onClick={() => onSubmitRemove(question._id)}
                        >
                          حذف قانون
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
