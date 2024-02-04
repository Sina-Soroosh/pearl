import Categories from "@/components/templates/Home/Categories";
import PopularProducts from "@/components/templates/Home/PopularProducts";
import Slider from "@/components/templates/Home/Slider";
import { connectToDB } from "@/config/db";
import categoryModel from "@/models/category";
import productModel from "@/models/product";
import Head from "next/head";
import React from "react";

function Home({ categories, products }) {
  return (
    <>
      <Head>
        <title>صفحه اصلی فروشگاه Pearl</title>
      </Head>
      <Slider />
      <PopularProducts products={products} />
      <Categories categories={categories} />
    </>
  );
}

export async function getStaticProps() {
  await connectToDB();

  const categories = await categoryModel.find().populate("products").lean();
  const products = await productModel.find();
  const popularProducts = products
    .sort((prev, next) => next.rating - prev.rating)
    .splice(0, 8);

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      products: JSON.parse(JSON.stringify(popularProducts)),
    },
    revalidate: 60 * 60 * 12,
  };
}

export default Home;
