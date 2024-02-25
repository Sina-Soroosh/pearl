import Transition from "@/components/modules/Transition/Transition";
import Main from "@/components/templates/MyAccount/EditAddress/Main";
import addressModel from "@/models/address";
import { getMe } from "@/utils/myAccount";
import Head from "next/head";
import React from "react";

function EditAddress({ user, address }) {
  return (
    <>
      <Head>
        <title>Pearl - آدرس صورتحساب</title>
      </Head>

      <Transition>
        <Main user={user} address={address} />
      </Transition>
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

  const address = await addressModel.findOne({ user: user._id });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      address: JSON.parse(JSON.stringify(address)),
    },
  };
}

export default EditAddress;
