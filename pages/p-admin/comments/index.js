import React from "react";
import CommentsDetails from "@/panelAdminTemplates/Comments/CommentsDetails/CommentsDetails";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import commentModel from "@/models/comment";
import Head from "next/head";

function Comments({ comments }) {
  return (
    <>
      <Head>
        <title>پنل مدیریت - لیست کامنت ها</title>
      </Head>

      <CommentsDetails comments={comments} />
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

  const comments = await commentModel.find().populate([
    { path: "product", select: "shortName title" },
    { path: "creator", select: "username email" },
  ]);

  return {
    props: {
      comments: JSON.parse(JSON.stringify(comments.reverse())),
    },
  };
};

export default Comments;
