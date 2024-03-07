import React from "react";
import OrderDetails from "@/panelAdminTemplates/Orders/Order/OrderDetails/OrderDetails";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import orderModel from "@/models/order";
import Head from "next/head";

function Order({ order }) {
  return (
    <>
      <Head>
        <title>پنل مدیریت - جزییات سفارش</title>
      </Head>

      <OrderDetails order={order} />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  await connectToDB();

  const { orderID } = ctx.query;
  const user = await getMe(ctx.req.cookies);

  if (user === false || user.role !== "ADMIN") {
    return {
      redirect: { destination: "/login" },
    };
  }

  const order = await orderModel.findOne({ orderID });

  if (!order) {
    return {
      redirect: { destination: "/p-admin/orders" },
    };
  }

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
};

export default Order;
