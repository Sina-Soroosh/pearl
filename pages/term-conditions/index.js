import React from "react";
import Head from "next/head";
import Main from "@/components/templates/TermConditions/Main";
import { connectToDB } from "@/config/db";
import ruleModel from "@/models/rule";
import Transition from "@/components/modules/Transition/Transition";

function TermConditions({ rules }) {
  return (
    <>
      <Head>
        <title>Pearl - قوانین و مقررات</title>
      </Head>

      <Transition>
        <Main rules={rules} />
      </Transition>
    </>
  );
}

export async function getStaticProps() {
  await connectToDB();

  const rules = await ruleModel.find();

  return {
    props: {
      rules: JSON.parse(JSON.stringify(rules)),
    },
    revalidate: 60 * 60 * 24,
  };
}

export default TermConditions;
