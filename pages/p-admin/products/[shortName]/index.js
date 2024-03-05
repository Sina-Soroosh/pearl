import React from "react";
import UpdateForm from "@/panelAdminTemplates/Products/Product/UpdateForm/UpdateForm";
import CommentsTable from "@/panelAdminTemplates/Products/Product/CommentsTable/CommentsTable";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import categoryModel from "@/models/category";
import productModel from "@/models/product";
import Head from "next/head";

function Product(props) {
  return (
    <>
      <Head>
        <title>پنل مدیریت - {props.product.title}</title>
      </Head>

      <UpdateForm categories={props.categories} product={props.product} />
      <CommentsTable {...props.commentsDetails} />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  await connectToDB();

  const { shortName } = ctx.query;
  const user = await getMe(ctx.req.cookies);

  if (user === false || user.role !== "ADMIN") {
    return {
      redirect: { destination: "/login" },
    };
  }

  const product = await productModel.findOne({ shortName }).populate([
    { path: "category" },
    {
      path: "comments",
      populate: [{ path: "creator", select: "username email" }],
    },
  ]);

  if (!product) {
    return {
      redirect: { destination: "/p-admin/products" },
    };
  }

  const categories = await categoryModel.find();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      product: JSON.parse(JSON.stringify(product)),
      commentsDetails: {
        shortName,
        commentsInfos: JSON.parse(
          JSON.stringify([...product.comments].reverse())
        ),
      },
    },
  };
};

export default Product;
