import React from "react";
import styles from "@/styles/templates/Shop/Main.module.css";
import Breadcrumb from "@/components/modules/Breadcrumb/Breadcrumb";

function Main() {
  return (
    <>
      <Breadcrumb
        links={[{ id: 1, title: "فروشگاه", href: "/shop" }]}
        title="فروشگاه"
      />
    </>
  );
}

export default Main;
