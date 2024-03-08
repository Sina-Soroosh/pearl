import React, { useState } from "react";
import styles from "@/panelAdminStyles/Rules/RulesDetails/RulesDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";

const columns = [
  { id: 1, label: "عنوان" },
  { id: 2, label: "متن" },
  { id: 3, label: "" },
];

function RulesDetails(props) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [rules, setRules] = useState([...props.rules]);

  const getRules = async () => {
    const res = await fetch("/api/rules");

    if (res.status === 200) {
      const data = await res.json();

      setRules(data);
    }
  };

  const showRuleHandler = (text) => {
    Swal.fire({
      title: text,
      confirmButtonText: "قانون را دیدم",
    });
  };

  const removeRule = async (swal, ID) => {
    const res = await fetch(`/api/rules/${ID}`, {
      method: "DELETE",
    });

    Swal.close();

    switch (res.status) {
      case 200:
        swal.fire({
          title: "قانون با موفقیت حذف شد",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getRules();
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
      title: "آیا مطمئنید که میخواهید این قانون را حذف کنید؟",
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "نه",
      showCancelButton: true,
      confirmButtonColor: "rgb(69 71 76)",
      cancelButtonColor: "var(--orange)",
      focusCancel: true,
    }).then((res) => {
      if (res.isConfirmed) {
        loader(removeRule, ID);
      }
    });
  };

  return (
    <>
      <div className={styles.details}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>قوانین</h3>
          </div>
          <div className={styles.table}>
            <TableDetails
              columns={columns}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              rowsLength={rules.length}
              isPagination={true}
            >
              {rules
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((rule) => {
                  return (
                    <TableRow
                      key={rule._id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        {rule.title}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <button
                          className="btn btn-primary fs-5 mx-3"
                          onClick={() => showRuleHandler(rule.body)}
                        >
                          دیدن قانون
                        </button>
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <button
                          className="btn btn-danger fs-5 mx-3"
                          onClick={() => onSubmitRemove(rule._id)}
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

export default RulesDetails;
