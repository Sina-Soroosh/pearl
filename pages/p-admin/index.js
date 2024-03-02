import React from "react";
import Details from "@/panelAdminTemplates/Dashboard/Details/Details";
import Charts from "@/panelAdminTemplates/Dashboard/Charts/Charts";
import Tables from "@/panelAdminTemplates/Dashboard/Tables/Tables";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import userModel from "@/models/user";
import productModel from "@/models/product";
import commentModel from "@/models/comment";
import orderModel from "@/models/order";

function PanelAdmin(props) {
  return (
    <>
      <Details {...props.details} />
      <Charts {...props.charts} />
      <Tables {...props.tables} />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  await connectToDB();

  const user = await getMe(ctx.req.cookies);

  if (user === false || user.role !== "ADMIN") {
    return {
      redirect: { destination: "/login" },
    };
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let lastYear = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
  let month = lastYear.getMonth() + 2 > 12 ? 1 : lastYear.getMonth() + 2;
  let year =
    lastYear.getMonth() + 2 > 12
      ? lastYear.getFullYear() + 1
      : lastYear.getFullYear();
  const users = await userModel.find({}, "username email createdAt");
  const products = await productModel.find();
  const comments = await commentModel.find();
  const orders = await orderModel.find({}, "status orderID total createdAt");

  const ordersInLastYear = await orderModel.find({
    createdAt: {
      $gte: `${year}/${month}/01`,
    },
  });
  const usersInLastYear = await userModel.find({
    createdAt: {
      $gte: `${year}/${month}/01`,
    },
  });
  let orderRowsChart = [];
  let userRowsChart = [];

  for (let i = 0; i < 12; i++) {
    const orderInThisMonth = ordersInLastYear.filter((order) => {
      return order.createdAt.getMonth() + 1 === month;
    });

    const userInThisMonth = usersInLastYear.filter((user) => {
      return user.createdAt.getMonth() + 1 === month;
    });

    const total = orderInThisMonth.reduce((prev, next) => prev + next.total, 0);

    orderRowsChart.push({ month: months[month - 1], value: total });
    userRowsChart.push({
      month: months[month - 1],
      value: userInThisMonth.length,
    });

    month++;

    if (month > 12) {
      month = 1;
    }
  }

  const lastUsers = [...users]
    .reverse()
    .splice(0, 5)
    .map((user) => {
      const month =
        user.createdAt.getMonth() + 1 > 9
          ? user.createdAt.getMonth() + 1
          : "0" + (user.createdAt.getMonth() + 1);
      const day =
        user.createdAt.getDate() > 9
          ? user.createdAt.getDate()
          : "0" + user.createdAt.getDate();

      return {
        id: user._id,
        username: user.username,
        email: user.email,
        date: `${user.createdAt.getFullYear()}/${month}/${day}`,
      };
    });

  const lastOrders = [...orders]
    .reverse()
    .splice(0, 5)
    .map((order) => {
      const month =
        order.createdAt.getMonth() + 1 > 9
          ? order.createdAt.getMonth() + 1
          : "0" + (order.createdAt.getMonth() + 1);
      const day =
        order.createdAt.getDate() > 9
          ? order.createdAt.getDate()
          : "0" + order.createdAt.getDate();

      return {
        id: order.orderID,
        total: `${order.total.toLocaleString()} تومان`,
        status:
          (order.status === "pending" && "در حال بررسی") ||
          (order.status === "shipped" && "در حال ارسال") ||
          (order.status === "delivered" && "تحویل داده شده"),
        date: `${order.createdAt.getFullYear()}/${month}/${day}`,
      };
    });

  return {
    props: {
      details: {
        users: users.length,
        products: products.length,
        comments: comments.length,
        orders: orders.length,
      },
      charts: {
        dataSeals: orderRowsChart,
        dataUsers: userRowsChart,
      },
      tables: {
        lastUsers: JSON.parse(JSON.stringify(lastUsers)),
        lastOrders: JSON.parse(JSON.stringify(lastOrders)),
      },
    },
  };
};

export default PanelAdmin;
