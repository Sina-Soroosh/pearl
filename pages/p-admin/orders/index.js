import React from "react";
import OrdersDetails from "@/panelAdminTemplates/Orders/OrdersDetails/OrdersDetails";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import orderModel from "@/models/order";
import Head from "next/head";

function Orders({ orders }) {
  return (
    <>
      <Head>
        <title>پنل مدیریت - سفارشات</title>
      </Head>

      <OrdersDetails orders={orders} />
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

  const orders = await orderModel.find();

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders.reverse())),
    },
  };
};

export default Orders;
