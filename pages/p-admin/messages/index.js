import React from "react";
import MessagesDetails from "@/panelAdminTemplates/Messages/MessagesDetails/MessagesDetails";
import Head from "next/head";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import messageModel from "@/models/message";

function Messages({ messages }) {
  return (
    <>
      <Head>
        <title>پنل مدیریت - پیام ها</title>
      </Head>

      <MessagesDetails messages={messages} />
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

  const messages = await messageModel.find();

  return {
    props: {
      messages: JSON.parse(JSON.stringify(messages.reverse())),
    },
  };
};

export default Messages;
