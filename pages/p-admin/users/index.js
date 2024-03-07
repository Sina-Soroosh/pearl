import React from "react";
import CreateUser from "@/panelAdminTemplates/Users/CreateUser/CreateUser";
import UsersDetails from "@/panelAdminTemplates/Users/UsersDetails/UsersDetails";

function Users() {
  return (
    <>
      <CreateUser />
      <UsersDetails />
    </>
  );
}

export default Users;
