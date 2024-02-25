import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/Register/Main";
import Head from "next/head";
import React from "react";

function Login() {
  return (
    <>
      <Head>
        <title>Pearl - ثبت نام</title>
      </Head>

      <Transition>
        <Main />
      </Transition>
    </>
  );
}

export default Login;
