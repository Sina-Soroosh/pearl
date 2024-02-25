import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/ProductCategory/Main";
import { connectToDB } from "@/config/db";
import categoryModel from "@/models/category";
import productModel from "@/models/product";
import Head from "next/head";
import React from "react";

function Category(props) {
  return (
    <>
      <Head>
        <title>Pearl - دسته بندی {props.title}</title>
      </Head>

      <Transition>
        <Main {...props} />
      </Transition>
    </>
  );
}

export const getServerSideProps = async (context) => {
  await connectToDB();

  const {
    page = 1,
    min_price,
    max_price,
    orderBy = "default",
    category,
  } = context.query;
  let categories = await categoryModel.find();
  const mainCategory = categories.find(
    (categoryItem) => categoryItem.shortName === category
  );

  if (!mainCategory) {
    return {
      redirect: { destination: "/404" },
    };
  }

  let products = await productModel.find({ category: mainCategory._id });
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
      active: category,
      title: mainCategory.title,
    },
  };
};

export default Category;
