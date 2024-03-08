import React from "react";
import CreateQuestion from "@/panelAdminTemplates/Questions/CreateQuestion/CreateQuestion";
import QuestionsDetails from "@/panelAdminTemplates/Questions/QuestionsDetails/QuestionsDetails";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import faqModel from "@/models/faq";
import Head from "next/head";

function Questions({ questions }) {
  return (
    <>
      <Head>
        <title>پنل مدیریت - سوالات متداول</title>
      </Head>

      <CreateQuestion />
      <QuestionsDetails questions={questions} />
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

  const questions = await faqModel.find();

  return {
    props: {
      questions: JSON.parse(JSON.stringify(questions)),
    },
  };
};

export default Questions;
