import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/WarrantyAndServices/Main";
import Head from "next/head";
import React from "react";

function WarrantyAndServices() {
  return (
    <>
      <Head>
        <title>Pearl - گارانتی و خدمات</title>
      </Head>

      <Transition>
        <Main />
      </Transition>
    </>
  );
}

export default WarrantyAndServices;
