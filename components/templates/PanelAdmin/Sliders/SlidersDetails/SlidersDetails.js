import React, { useState } from "react";
import styles from "@/panelAdminStyles/Sliders/SlidersDetails/SlidersDetails.module.css";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import { TableCell, TableRow } from "@mui/material";
import Swal from "sweetalert2";
import Link from "next/link";

const columns = [
  { id: 1, label: "" },
  { id: 2, label: "عنوان" },
  { id: 3, label: "نوشته" },
  { id: 4, label: "محصول" },
  { id: 5, label: "" },
];

function SlidersDetails(props) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [sliders, setSliders] = useState([...props.sliders]);

  const getSliders = async () => {
    const res = await fetch("/api/sliders");

    if (res.status === 200) {
      const data = await res.json();

      setSliders(data);
    }
  };

  const removeSlider = async (swal, ID) => {
    const res = await fetch(`/api/sliders/${ID}`, {
      method: "DELETE",
    });

    Swal.close();

    switch (res.status) {
      case 200:
        swal.fire({
          title: "اسلایدر با موفقیت حذف شد",
          confirmButtonText: "باشه",
          icon: "success",
        });

        getSliders();
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
      title: "آیا مطمئنید که میخواهید این اسلایدر را حذف کنید؟",
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "نه",
      showCancelButton: true,
      confirmButtonColor: "rgb(69 71 76)",
      cancelButtonColor: "var(--orange)",
      focusCancel: true,
    }).then((res) => {
      if (res.isConfirmed) {
        loader(removeSlider, ID);
      }
    });
  };

  return (
    <>
      <div className={styles.details}>
        <div className={styles.content}>
          <div className={styles.title}>
            <h3>اسلایدرها</h3>
          </div>
          <div className={styles.table}>
            <TableDetails
              columns={columns}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              rowsLength={sliders.length}
              isPagination={true}
            >
              {sliders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((slider) => {
                  return (
                    <TableRow
                      key={slider._id}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell style={{ fontSize: "15px" }} align="center">
                        <img src={slider.image} alt={slider.title} />
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        {slider.title}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        {slider.text}
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <Link href={`/p-admin/products/${slider.product}`}>
                          {slider.product}
                        </Link>
                      </TableCell>
                      <TableCell style={{ fontSize: "15px" }} align="right">
                        <button
                          className="btn btn-danger fs-5 mx-3"
                          disabled={sliders.length < 4}
                          onClick={() => onSubmitRemove(slider._id)}
                        >
                          حذف اسلایدر
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

export default SlidersDetails;
