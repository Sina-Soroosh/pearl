import Main from "@/components/templates/Shop/Product/Main";
import { connectToDB } from "@/config/db";
import commentModel from "@/models/comment";
import productModel from "@/models/product";
import Head from "next/head";
import React from "react";

function Product(props) {
  console.log(props.relatedProducts);

  return (
    <>
      <Head>
        <title>Pearl - {props.product.title}</title>
      </Head>

      <Main {...props} />
    </>
  );
}

export const getServerSideProps = async (context) => {
  await connectToDB();

  const { shortName } = context.query;
  const product = await productModel
    .findOne({ shortName })
    .populate([{ path: "category", select: "title shortName" }]);

  if (!product) {
    return {
      redirect: { destination: "/404" },
    };
  }

  const comments = await commentModel
    .find(
      {
        product: product._id,
        isShow: true,
      },
      "-product"
    )
    .populate([{ path: "creator", select: "username email" }]);

  const relatedProducts = await productModel.find({
    category: product.category._id,
    $nor: [{ _id: product._id }],
  });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      comments: JSON.parse(JSON.stringify(comments)),
      relatedProducts: JSON.parse(JSON.stringify(relatedProducts.slice(0, 4))),
    },
  };
};

export default Product;
