import React from "react";
import styles from "@/styles/templates/Search/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";
import FilterProducts from "@/components/modules/FilterProducts/FilterProducts";
import OrderBy from "@/components/modules/OrderBy/OrderBy";
import ProductCart from "@/components/modules/ProductCart/ProductCart";
import Pagination from "@/components/modules/Pagination/Pagination";
import { useRouter } from "next/router";

function Main(props) {
  const {
    query: { q },
  } = useRouter();

  return (
    <>
      <Breadcrumb
        links={[
          { id: 1, title: "فروشگاه", href: "/shop" },
          { id: 2, title: `نتیجه جستجو "${q}"`, href: `/search/?q=${q}` },
        ]}
        title="فروشگاه"
      />

      <div className={styles.content}>
        <div className={styles.top_content}>
          <div className={styles.filter}>
            {props.products.length ? (
              <FilterProducts
                min={props.minPrice}
                max={props.maxPrice}
                categories={props.categories}
              />
            ) : null}
          </div>
          <div className={styles.order}>
            {props.products.length ? <OrderBy /> : null}
          </div>
        </div>
        <div className={styles.main_content}>
          <div className="row">
            {props.products.map((product) => (
              <ProductCart {...product} key={product._id} />
            ))}

            {props.products.length ? null : (
              <div className="alert alert-primary">محصولی یافت نشد</div>
            )}
          </div>
        </div>
        {props.products.length ? (
          <Pagination lastPage={props.lastPage} />
        ) : null}
      </div>
    </>
  );
}

export default Main;
