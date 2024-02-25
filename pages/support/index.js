import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/Support/Main";
import Head from "next/head";
import React from "react";

function Support() {
  return (
    <>
      <Head>
        <title>Pearl - پشتیبانی</title>
      </Head>

      <Transition>
        <Main />
      </Transition>
    </>
  );
}

export default Support;
