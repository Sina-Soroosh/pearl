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
  { field: "total", headerName: "مجموع", width: 100 },
  { field: "status", headerName: "وضعیت", width: 100 },
];

const columnsUsers = [
  { field: "username", headerName: "نام کاربری", width: 200 },
  { field: "email", headerName: "ایمیل", width: 250 },
];

function Tables() {
  return (
    <div className={styles.tables}>
      <div className={styles.content}>
        <div className="row">
          <div className="col-lg-6">
            <div className={styles.table}>
              <div className={styles.title}>
                <h3>آخرین سفارشات</h3>
                <Table
                  rows={[
                    {
                      id: 1,
                      date: "2023/11/20",
                      total: "127,000 تومان",
                      status: "درحال ارسال",
                    },
                    {
                      id: 2,
                      date: "2023/11/20",
                      total: "127,000 تومان",
                      status: "درحال ارسال",
                    },
                    {
                      id: 3,
                      date: "2023/11/20",
                      total: "127,000 تومان",
                      status: "درحال ارسال",
                    },
                    {
                      id: 4,
                      date: "2023/11/20",
                      total: "127,000 تومان",
                      status: "درحال ارسال",
                    },
                  ]}
                  columns={columnsOrders}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className={styles.table}>
              <div className={styles.title}>
                <h3>جدیدترین کاربران</h3>
                <Table
                  rows={[
                    { id: 1, username: "SinaSoroosh", email: "sina@gmail.com" },
                    { id: 2, username: "SinaSoroosh", email: "sina@gmail.com" },
                    { id: 3, username: "SinaSoroosh", email: "sina@gmail.com" },
                    { id: 4, username: "SinaSoroosh", email: "sina@gmail.com" },
                  ]}
                  columns={columnsUsers}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tables;
