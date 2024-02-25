import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/Login/Main";
import Head from "next/head";
import React from "react";

function Login() {
  return (
    <>
      <Head>
        <title>Pearl - ورود به حساب کاربری</title>
      </Head>

      <Transition>
        <Main />
      </Transition>
    </>
  );
}

export default Login;
