import React from "react";
import styles from "@/styles/templates/ProductCategory/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import FilterProducts from "@/components/modules/FilterProducts/FilterProducts";
import OrderBy from "@/components/modules/OrderBy/OrderBy";
import ProductCart from "@/components/modules/ProductCart/ProductCart";
import Pagination from "@/components/modules/Pagination/Pagination";

function Main(props) {
  return (
    <>
      <Breadcrumb
        links={[
          { id: 1, title: "فروشگاه", href: "/shop" },
          {
            id: 2,
            title: props.title,
            href: `/product-category/${props.active}`,
          },
        ]}
        title={props.title}
      />

      <div className={styles.content}>
        <div className={styles.top_content}>
          <div className={styles.filter}>
            <FilterProducts
              min={props.minPrice}
              max={props.maxPrice}
              categories={props.categories}
              activeCategory={props.active}
            />
          </div>
          <div className={styles.order}>
            <OrderBy />
          </div>
        </div>
        <div className={styles.main_content}>
          <div className="row">
            {props.products.map((product) => (
              <ProductCart {...product} key={product._id} />
            ))}
          </div>
        </div>
        <Pagination lastPage={props.lastPage} />
      </div>
    </>
  );
}

export default Main;
