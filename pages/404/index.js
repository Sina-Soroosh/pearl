import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/404/Main";
import Head from "next/head";
import React from "react";

function Error404() {
  return (
    <>
      <Head>
        <title>Pearl - صفحه پیدا نشد</title>
      </Head>

      <Transition>
        <Main />
      </Transition>
    </>
  );
}

export default Error404;
