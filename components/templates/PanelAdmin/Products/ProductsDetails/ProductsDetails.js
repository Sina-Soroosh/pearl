import React, { useState } from "react";
import TableDetails from "@/panelAdminModules/TableDetails/TableDetails";
import styles from "@/panelAdminStyles/Products/ProductsDetails/ProductsDetails.module.css";
import Link from "next/link";
import { Add } from "@mui/icons-material";
import { Button, TableCell, TableRow } from "@mui/material";

const columns = [
  { id: 1, label: "" },
  { id: 2, label: "نام" },
  { id: 3, label: "نام کوتاه" },
  { id: 5, label: "قیمت" },
  { id: 6, label: "نخفیف" },
  { id: 7, label: "وضعیت" },
  { id: 8, label: "" },
];

function ProductsDetails() {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);

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
                          src="/images/products/520c7dbee04ab52bfd3f4441a.png"
                          alt=""
                          className={styles.image}
                        />
                      </TableCell>
                      <TableCell className={styles.cell} align="right">
                        <Link href={`/products/chairs`}>صندلی</Link>
                      </TableCell>
                      <TableCell className={styles.cell} align="right">
                        <Link href={`/products/chairs`}>chairs</Link>
                      </TableCell>
                      <TableCell className={styles.cell} align="right">
                        130,000 تومان
                      </TableCell>
                      <TableCell className={styles.cell} align="right">
                        30%
                      </TableCell>
                      <TableCell className={styles.cell} align="right">
                        موجود
                      </TableCell>
                      <TableCell className={styles.cell} align="right">
                        <button className="btn btn-success">تغییر وضعیت</button>
                        <button className="btn btn-warning">
                          افزودن تخفیف
                        </button>
                        <button className="btn btn-danger">حذف</button>
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
