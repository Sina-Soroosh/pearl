import React from "react";
import CreateCategory from "@/panelAdminTemplates/Categories/CreateCategory/CreateCategory";
import CategoriesDetails from "@/panelAdminTemplates/Categories/CategoriesDetails/CategoriesDetails";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import categoryModel from "@/models/category";
import Head from "next/head";

function Categories({ categories }) {
  return (
    <>
      <Head>
        <title>پنل مدیریت - دسته بندی ها</title>
      </Head>

      <CreateCategory />
      <CategoriesDetails categories={categories} />
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

  const categories = await categoryModel.find({}, "title shortName");

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};

export default Categories;
