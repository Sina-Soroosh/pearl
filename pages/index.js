import Categories from "@/components/templates/Home/Categories";
import PopularProducts from "@/components/templates/Home/PopularProducts";
import Slider from "@/components/templates/Home/Slider";
import Head from "next/head";
import React from "react";

function Home() {
  return (
    <>
      <Head>
        <title>صفحه اصلی فروشگاه Pearl</title>
      </Head>
      <Slider />
      <PopularProducts />
      <Categories />
    </>
  );
}

export default Home;
