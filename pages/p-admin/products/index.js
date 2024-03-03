import React from "react";
import ProductsDetails from "@/panelAdminTemplates/Products/ProductsDetails/ProductsDetails";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import productModel from "@/models/product";
import Head from "next/head";

function Products({ products }) {
  return (
    <>
      <Head>
        <title>پنل مدیریت - لیست محصولات</title>
      </Head>

      <ProductsDetails products={products} />
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

  const products = await productModel.find();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};

export default Products;
