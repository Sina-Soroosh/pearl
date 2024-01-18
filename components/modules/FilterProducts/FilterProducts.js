import React, { useState } from "react";
import styles from "@/styles/modules/FilterProducts/FilterProducts.module.css";
import Link from "next/link";
import { Slider } from "@mui/material";
import { useRouter } from "next/router";

function FilterProducts() {
  const [valueSlider, setValueSlider] = useState([50_000, 500_000]);
  const [isShowFilterContent, setIsShowFilterContent] = useState(false);
  const router = useRouter();

  const { max_price, min_price } = router.query;

  const activeFilter = () => {
    const { query, pathname } = router;

    let newAddress = pathname + "?";

    for (const [key, value] of Object.entries(query)) {
      if (key !== "min_price" && key !== "max_price") {
        newAddress += `${key}=${value}&`;
      }
    }

    router.push(
      `${newAddress}min_price=${valueSlider[0]}&max_price=${valueSlider[1]}`
    );

    hideFilterHandler();
  };

  const showFilterHandler = () => {
    setIsShowFilterContent(true);
  };

  const hideFilterHandler = () => {
    setIsShowFilterContent(false);
  };

  const removeMinPrice = () => {
    const { query, pathname } = router;

    let newAddress = pathname + "?";

    for (const [key, value] of Object.entries(query)) {
      if (key !== "min_price") {
        newAddress += `${key}=${value}&`;
      }
    }

    router.push(newAddress);
  };

  const removeMaxPrice = () => {
    const { query, pathname } = router;

    let newAddress = pathname + "?";

    for (const [key, value] of Object.entries(query)) {
      if (key !== "max_price") {
        newAddress += `${key}=${value}&`;
      }
    }

    router.push(newAddress);
  };

  return (
    <>
      {isShowFilterContent && (
        <div className={styles.cover_page} onClick={hideFilterHandler}></div>
      )}

      <div
        className={`${styles.content_filter} ${
          isShowFilterContent ? styles.active : ""
        }`}
      >
        <div className={styles.close}>
          <p onClick={hideFilterHandler}>بستن -</p>
        </div>
        <div className={styles.categories}>
          <div className={styles.title}>
            <h3>دسته بندی محصولات</h3>
          </div>
          <ul>
            <li>
              <Link href="/shop">دسته بندی نشده</Link>
            </li>
            <li>
              <Link href="/product-category/test" className={styles.active}>
                مبل
              </Link>
            </li>
            <li>
              <Link href="/product-category/test">صندلی</Link>
            </li>
            <li>
              <Link href="/product-category/test">دکور</Link>
            </li>
          </ul>
        </div>
        <div className={styles.price}>
          <div className={styles.title}>
            <h3>فیلتر بر اساس قیمت</h3>
          </div>
          <div className={styles.slider}>
            <Slider
              value={valueSlider}
              onChange={(e, value) => setValueSlider(value)}
              min={0}
              max={500_000}
              valueLabelDisplay="off"
              className={styles.slider_input}
              disableSwap
            />
          </div>
          <div className={styles.price}>
            <p>
              قیمت : تومان {valueSlider[0].toLocaleString()} - تومان{" "}
              {valueSlider[1].toLocaleString()}
            </p>
            <button onClick={activeFilter}>اعمال فیلتر قیمت</button>
          </div>
        </div>
      </div>

      <div className={styles.btn_filter}>
        <button onClick={showFilterHandler}>
          <span>+</span> فیلتر کردن
        </button>
        {(min_price || max_price) && (
          <div className={styles.active_filter}>
            <div className="title">
              <p>فیلترهای فعال :</p>
            </div>
            <div className={styles.boxes_filter}>
              {min_price && (
                <div className={styles.box_filter} onClick={removeMinPrice}>
                  <span>حداقل {(+min_price).toLocaleString()} تومان</span>
                </div>
              )}
              {max_price && (
                <div className={styles.box_filter} onClick={removeMaxPrice}>
                  <span>حداکثر {(+max_price).toLocaleString()} تومان</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FilterProducts;
