import React from "react";
import UpdateForm from "@/panelAdminTemplates/Products/Product/UpdateForm/UpdateForm";
import CommentsTable from "@/panelAdminTemplates/Products/Product/CommentsTable/CommentsTable";

function Product() {
  return (
    <>
      <UpdateForm />
      <CommentsTable />
    </>
  );
}

export default Product;
