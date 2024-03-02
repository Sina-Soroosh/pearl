import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/Cart/Main";
import { connectToDB } from "@/config/db";
import cartModel from "@/models/cart";
import { getMe } from "@/utils/myAccount";
import Head from "next/head";
import React from "react";

function Cart(props) {
  return (
    <>
      <Head>
        <title>سبد خرید - Pearl</title>
      </Head>

      <Transition>
        <Main {...props} />
      </Transition>
    </>
  );
}

export const getServerSideProps = async (context) => {
  await connectToDB();

  const user = await getMe(context.req.cookies);

  if (!user) {
    return {
      redirect: { destination: "/login" },
    };
  }

  const cart = await cartModel.findOne({ user: user._id }).populate([
    {
      path: "products.product",
      select: "shortName title price discount image",
    },
  ]);

  let total = 0;

  cart.products.forEach((product) => {
    total +=
      product.product.price *
      ((100 - product.product.discount) / 100) *
      product.count;
  });

  return {
    props: {
      cart: JSON.parse(JSON.stringify(cart)),
      total,
    },
  };
};

export default Cart;
