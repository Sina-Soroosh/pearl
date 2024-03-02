import React from "react";
import styles from "@/panelAdminStyles/Dashboard/Tables/Tables.module.css";
import Table from "@/panelAdminModules/Table/Table";

const columnsOrders = [
  {
    field: "id",
    headerName: "سفارش",
    valueGetter: (params) => `${params.row.id}#`,
  },
  { field: "date", headerName: "تاریخ", width: 100 },
  { field: "total", headerName: "مجموع", width: 150 },
  { field: "status", headerName: "وضعیت", width: 100 },
];

const columnsUsers = [
  { field: "username", headerName: "نام کاربری", width: 200 },
  { field: "email", headerName: "ایمیل", width: 250 },
  { field: "date", headerName: "تاریخ ثبت نام", width: 100 },
];

function Tables({ lastOrders, lastUsers }) {
  return (
    <div className={styles.tables}>
      <div className={styles.content}>
        <div className="row">
          <div className="col-lg-6">
            <div className={styles.table}>
              <div className={styles.title}>
                <h3>آخرین سفارشات</h3>
                <Table rows={lastOrders} columns={columnsOrders} />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className={styles.table}>
              <div className={styles.title}>
                <h3>جدیدترین کاربران</h3>
                <Table rows={lastUsers} columns={columnsUsers} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tables;
