import React from "react";
import styles from "@/panelAdminStyles/Dashboard/Charts/Charts.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

function Charts({ dataSeals, dataUsers }) {
  return (
    <div className={styles.charts}>
      <div className={styles.content}>
        <div className="row">
          <div className="col-lg-6">
            <div className={styles.chart}>
              <div className={styles.title}>
                <h3>مقدار فروش</h3>
              </div>
              <ResponsiveContainer>
                <AreaChart data={dataSeals}>
                  <XAxis dataKey="month" dy={5} />
                  <YAxis dx={-40} />
                  <Tooltip
                    formatter={(value) => [
                      "مقدار فروش",
                      `${value.toLocaleString()} تومان`,
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#eb7025"
                    fill="#f9d4bd"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-lg-6">
            <div className={styles.chart}>
              <div className={styles.title}>
                <h3>کاربران ثبت نام شده</h3>
              </div>
              <ResponsiveContainer>
                <BarChart data={dataUsers}>
                  <XAxis dataKey="month" dy={5} />
                  <YAxis dx={-40} />
                  <Tooltip
                    formatter={(value) => ["کاربران ثبت نامی", value]}
                    itemStyle={{ color: "#eb7025" }}
                  />
                  <Bar
                    type="monotone"
                    dataKey="value"
                    stroke="#eb7025"
                    fill="#f9d4bd"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
