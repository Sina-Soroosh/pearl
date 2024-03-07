import React from "react";
import CreateUser from "@/panelAdminTemplates/Users/CreateUser/CreateUser";
import UsersDetails from "@/panelAdminTemplates/Users/UsersDetails/UsersDetails";
import { connectToDB } from "@/config/db";
import { getMe } from "@/utils/myAccount";
import userModel from "@/models/user";
import Head from "next/head";

function Users({ users }) {
  return (
    <>
      <Head>
        <title>پنل مدیریت - لیست کاربران</title>
      </Head>

      <CreateUser />
      <UsersDetails users={users} />
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

  const users = await userModel.find(
    {
      $nor: [{ username: user.username }],
    },
    "-password"
  );

  users.sort((prev, next) => next.createdAt - prev.createdAt);

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
};

export default Users;
