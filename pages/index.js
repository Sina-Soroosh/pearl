import Transition from "@/components/modules/Transition/Transition";
import Categories from "@/components/templates/Home/Categories";
import PopularProducts from "@/components/templates/Home/PopularProducts";
import Slider from "@/components/templates/Home/Slider";
import { connectToDB } from "@/config/db";
import categoryModel from "@/models/category";
import productModel from "@/models/product";
import sliderModel from "@/models/slider";
import Head from "next/head";
import React from "react";

function Home({ categories, products, sliders }) {
  return (
    <>
      <Head>
        <title>صفحه اصلی فروشگاه Pearl</title>
      </Head>
      <Transition>
        <Slider sliders={sliders} />
        <PopularProducts products={products} />
        <Categories categories={categories} />
      </Transition>
    </>
  );
}

export async function getServerSideProps() {
  await connectToDB();

  const categories = await categoryModel.find().populate("products").lean();
  const products = await productModel.find();
  const popularProducts = products
    .sort((prev, next) => next.rating - prev.rating)
    .splice(0, 8);
  const sliders = await sliderModel.find({}, "-__v -createdAt -updatedAt");

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      products: JSON.parse(JSON.stringify(popularProducts)),
      sliders: JSON.parse(JSON.stringify(sliders)),
    },
  };
}

export default Home;
