import Main from "@/components/templates/MyAccount/Main";
import { getMe } from "@/utils/myAccount";
import Head from "next/head";
import React from "react";

function MyAccount({ user }) {
  return (
    <>
      <Head>
        <title>Pearl - حساب کاربری من</title>
      </Head>

      <Main user={user} />
    </>
  );
}

export async function getServerSideProps(ctx) {
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
