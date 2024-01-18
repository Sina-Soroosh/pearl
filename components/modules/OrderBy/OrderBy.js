import { MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "@/styles/modules/OrderBy/OrderBy.module.css";
import { useRouter } from "next/router";

function OrderBy() {
  const router = useRouter();
  const { query, pathname } = router;
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    setSelectValue(query.orderBy ? query.orderBy : "default");
  }, [query]);

  const changeOrderBy = (e, value) => {
    let newAddress = pathname + "?";

    for (const [key, value] of Object.entries(query)) {
      if (key !== "orderBy") {
        newAddress += `${key}=${value}&`;
      }
    }

    newAddress += `orderBy=${value.props.value}`;

    router.push(newAddress);
  };

  return (
    <>
      <Select
        value={selectValue}
        onChange={changeOrderBy}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        className={styles.order}
        style={{ fontSize: "16px" }}
      >
        <MenuItem
          style={{ fontSize: "16px" }}
          className={styles.order_item}
          value="default"
        >
          مرتب سازی براساس پیش فرض
        </MenuItem>
        <MenuItem
          style={{ fontSize: "16px" }}
          className={styles.order_item}
          value={"rating"}
        >
          مرتب سازی براساس امتیاز
        </MenuItem>
        <MenuItem
          style={{ fontSize: "16px" }}
          className={styles.order_item}
          value={"date"}
        >
          مرتب سازی براساس جدیدترین
        </MenuItem>
        <MenuItem
          style={{ fontSize: "16px" }}
          className={styles.order_item}
          value={"cheapest"}
        >
          مرتب سازی براساس ارزان ترین
        </MenuItem>
        <MenuItem
          style={{ fontSize: "16px" }}
          className={styles.order_item}
          value={"expensive"}
        >
          مرتب سازی براساس گران ترین
        </MenuItem>
      </Select>
    </>
  );
}

export default OrderBy;
