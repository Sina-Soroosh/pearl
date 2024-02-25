import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/MyAccount/Orders/OrderID/Main";
import orderModel from "@/models/order";
import { getMe } from "@/utils/myAccount";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function OrderID({ order }) {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Pearl - سفارش #{query.orderID}</title>
      </Head>

      <Transition>
        <Main order={order} />
      </Transition>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const user = await getMe(ctx.req.cookies);

  if (user === false) {
    return {
      redirect: { destination: "/login" },
    };
  }

  const { orderID } = ctx.query;
  const order = await orderModel.findOne(
    { userID: user._id, orderID },
    "-address -user"
  );

  if (!order) {
    return {
      redirect: { destination: "/my-account/orders" },
    };
  }

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default OrderID;
