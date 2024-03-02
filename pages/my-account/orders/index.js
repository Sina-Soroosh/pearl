import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/MyAccount/Orders/Main";
import { connectToDB } from "@/config/db";
import orderModel from "@/models/order";
import { getMe } from "@/utils/myAccount";
import Head from "next/head";
import React from "react";

function Orders({ orders }) {
  return (
    <>
      <Head>
        <title>Pearl - سفارش ها من</title>
      </Head>

      <Transition>
        <Main orders={orders} />
      </Transition>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await connectToDB();
  const user = await getMe(ctx.req.cookies);

  if (user === false) {
    return {
      redirect: { destination: "/login" },
    };
  }

  const orders = await orderModel.find(
    { userID: user._id },
    "createdAt status total orderID"
  );

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}

export default Orders;
