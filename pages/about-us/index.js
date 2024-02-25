import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/AboutUs/Main";
import Head from "next/head";
import React from "react";

function AboutUs() {
  return (
    <>
      <Head>
        <title>Pearl - درباره ما</title>
      </Head>

      <Transition>
        <Main />
      </Transition>
    </>
  );
}

export default AboutUs;
