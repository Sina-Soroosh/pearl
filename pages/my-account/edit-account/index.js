import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/MyAccount/EditAccount/Main";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import Head from "next/head";
import React from "react";

function EditAccount({ user }) {
  return (
    <>
      <Head>
        <title>Pearl - جزییات حساب کاربری</title>
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

export default EditAccount;
