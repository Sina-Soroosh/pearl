import React from "react";
import CreateQuestion from "@/panelAdminTemplates/Questions/CreateQuestion/CreateQuestion";
import QuestionsDetails from "@/panelAdminTemplates/Questions/QuestionsDetails/QuestionsDetails";

function Questions() {
  return (
    <>
      <CreateQuestion />
      <QuestionsDetails />
    </>
  );
}

export default Questions;
