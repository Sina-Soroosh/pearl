import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/ContactUs/Main";
import Head from "next/head";
import React from "react";

function ContactUs() {
  return (
    <>
      <Head>
        <title>Pearl - تماس با ما</title>
      </Head>

      <Transition>
        <Main />
      </Transition>
    </>
  );
}

export default ContactUs;
