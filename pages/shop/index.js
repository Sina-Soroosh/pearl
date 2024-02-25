import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/Shop/Main";
import { connectToDB } from "@/config/db";
import categoryModel from "@/models/category";
import productModel from "@/models/product";
import Head from "next/head";
import React from "react";

function Shop({ products, minPrice, maxPrice, lastPage, categories }) {
  return (
    <>
      <Head>
        <title>فروشگاه - Pearl</title>
      </Head>
      <Transition>
        <Main
          products={products}
          minPrice={minPrice}
          maxPrice={maxPrice}
          lastPage={lastPage}
          categories={categories}
        />
      </Transition>
    </>
  );
}

export const getServerSideProps = async (context) => {
  await connectToDB();

  const { page = 1, min_price, max_price, orderBy = "default" } = context.query;
  let products = await productModel.find();
  let categories = await categoryModel.find();
  let maxPrice = products.reduce(
    (prev, next) =>
      prev > next.price * ((100 - next.discount) / 100)
        ? prev
        : next.price * ((100 - next.discount) / 100),
    -1
  );
  let minPrice = products.reduce(
    (prev, next) =>
      prev < next.price * ((100 - next.discount) / 100)
        ? prev
        : next.price * ((100 - next.discount) / 100),
    maxPrice
  );

  if (min_price && !isNaN(min_price)) {
    products = products.filter((product) => {
      return product.price * ((100 - product.discount) / 100) >= min_price;
    });
  }

  if (max_price && !isNaN(max_price)) {
    products = products.filter((product) => {
      return product.price * ((100 - product.discount) / 100) <= max_price;
    });
  }

  let lastPage = Math.ceil(products.length / 8);

  if (page > lastPage) {
    return {
      redirect: { destination: "/404" },
    };
  }

  switch (orderBy) {
    case "rating": {
      products.sort((prev, next) => next.rating - prev.rating);

      break;
    }
    case "date": {
      products.sort((prev, next) => next.createdAt - prev.createdAt);

      break;
    }
    case "cheapest": {
      products.sort((prev, next) => prev.price - next.price);

      break;
    }
    case "expensive": {
      products.sort((prev, next) => next.price - prev.price);

      break;
    }
    default: {
      break;
    }
  }

  let endIndex = page * 8;
  let startIndex = endIndex - 8;

  products = products.slice(startIndex, endIndex);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
      minPrice,
      maxPrice,
      lastPage,
    },
  };
};

export default Shop;
