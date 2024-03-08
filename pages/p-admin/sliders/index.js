import React from "react";
import CreateSlider from "@/panelAdminTemplates/Sliders/CreateSlider/CreateSlider";
import SlidersDetails from "@/panelAdminTemplates/Sliders/SlidersDetails/SlidersDetails";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import productModel from "@/models/product";
import sliderModel from "@/models/slider";
import Head from "next/head";

function Sliders({ createForm, slidersDetails }) {
  return (
    <>
      <Head>
        <title>پنل مدیریت - اسلایدرها</title>
      </Head>

      <CreateSlider {...createForm} />
      <SlidersDetails {...slidersDetails} />
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

  const products = await productModel.find({}, "title shortName");
  const sliders = await sliderModel.find();

  return {
    props: {
      createForm: {
        products: JSON.parse(JSON.stringify(products)),
      },
      slidersDetails: {
        sliders: JSON.parse(JSON.stringify(sliders)),
      },
    },
  };
};

export default Sliders;
