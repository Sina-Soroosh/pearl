import React from "react";
import styles from "@/styles/templates/Shop/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import FilterProducts from "@/components/modules/FilterProducts/FilterProducts";
import OrderBy from "@/components/modules/OrderBy/OrderBy";
import ProductCart from "@/components/modules/ProductCart/ProductCart";
import Pagination from "@/components/modules/Pagination/Pagination";

function Main({ products, minPrice, maxPrice, lastPage, categories }) {
  return (
    <>
      <Breadcrumb
        links={[{ id: 1, title: "فروشگاه", href: "/shop" }]}
        title="فروشگاه"
      />

      <div className={styles.content}>
        <div className={styles.top_content}>
          <div className={styles.filter}>
            <FilterProducts
              min={minPrice}
              max={maxPrice}
              categories={categories}
            />
          </div>
          <div className={styles.order}>
            <OrderBy />
          </div>
        </div>
        <div className={styles.main_content}>
          <div className="row">
            {products.map((product) => (
              <ProductCart {...product} key={product._id} />
            ))}
          </div>
        </div>
        <Pagination lastPage={lastPage} />
      </div>
    </>
  );
}

export default Main;
