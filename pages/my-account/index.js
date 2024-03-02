import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/MyAccount/Main";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import Head from "next/head";
import React from "react";

function MyAccount({ user }) {
  return (
    <>
      <Head>
        <title>Pearl - حساب کاربری من</title>
      </Head>

      <Transition>
        <Main user={user} />
      </Transition>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await connectToDB();

  const user = await getMe(ctx.req.cookies);

  if (user === false) {
    return {
      redirect: { destination: "/login" },
    };
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default MyAccount;
