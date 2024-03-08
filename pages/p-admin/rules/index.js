import React from "react";
import CreateRule from "@/panelAdminTemplates/Rules/CreateRule/CreateRule";
import RulesDetails from "@/panelAdminTemplates/Rules/RulesDetails/RulesDetails";
import Head from "next/head";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import ruleModel from "@/models/rule";

function Rules({ rules }) {
  return (
    <>
      <Head>
        <title>پنل مدیریت - قوانین</title>
      </Head>

      <CreateRule />
      <RulesDetails rules={rules} />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  await connectToDB();

  const user = await getMe(ctx.req.cookies);

  if (user === false || user.role !== "ADMIN") {
    return {
      redirect: { destination: "/login" },
    };
  }

  const rules = await ruleModel.find();

  return {
    props: {
      rules: JSON.parse(JSON.stringify(rules)),
    },
  };
};

export default Rules;
