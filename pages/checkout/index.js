import React from "react";
import Head from "next/head";
import Main from "@/components/templates/Checkout/Main";
import { getMe } from "@/utils/myAccount";
import cartModel from "@/models/cart";
import addressModel from "@/models/address";
import Transition from "@/components/modules/Transition/Transition";

function Checkout(props) {
  return (
    <>
      <Head>
        <title>Pearl - صورت حساب</title>
      </Head>

      <Transition>
        <Main {...props} />
      </Transition>
    </>
  );
}

export const getServerSideProps = async (context) => {
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

  if (cart.products.length === 0) {
    return {
      redirect: { destination: "/cart" },
    };
  }

  const address = await addressModel.findOne({ user: user._id });

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
      address: JSON.parse(JSON.stringify(address)),
      total,
    },
  };
};

export default Checkout;
