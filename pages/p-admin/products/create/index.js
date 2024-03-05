import React from "react";
import CreateForm from "@/panelAdminTemplates/Products/Create/CreateForm/CreateForm";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import categoryModel from "@/models/category";

function Create(props) {
  return (
    <>
      <CreateForm categories={props.categories} />
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

  const categories = await categoryModel.find();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};

export default Create;
