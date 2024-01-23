import Main from "@/components/templates/MyAccount/Orders/OrderID/Main";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function OrderID() {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Pearl - سفارش #{query.orderID}</title>
      </Head>

      <Main />
    </>
  );
}

export default OrderID;
