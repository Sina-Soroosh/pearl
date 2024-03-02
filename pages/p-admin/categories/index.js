import React from "react";
import CreateCategory from "@/panelAdminTemplates/Categories/CreateCategory/CreateCategory";
import CategoriesDetails from "@/panelAdminTemplates/Categories/CategoriesDetails/CategoriesDetails";

function Categories() {
  return (
    <>
      <CreateCategory />
      <CategoriesDetails categories={[]} />
    </>
  );
}

export default Categories;
