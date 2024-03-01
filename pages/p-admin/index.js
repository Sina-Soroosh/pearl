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
      <Tables />
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
  let month = lastYear.getMonth() + 2;
  const users = await userModel.find({}, "username email");
  const products = await productModel.find();
  const comments = await commentModel.find();
  const orders = await orderModel.find({}, "status id total createdAt");
  const ordersInLastYear = await orderModel.find({
    createdAt: {
      $gte: `${lastYear.getFullYear()}/${lastYear.getMonth() + 2}/01`,
    },
  });
  const usersInLastYear = await userModel.find({
    createdAt: {
      $gte: `${lastYear.getFullYear()}/${lastYear.getMonth() + 2}/01`,
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
      tables: {},
    },
  };
};

export default PanelAdmin;
