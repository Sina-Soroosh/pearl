import React from "react";
import Details from "@/panelAdminTemplates/Dashboard/Details/Details";
import Charts from "@/panelAdminTemplates/Dashboard/Charts/Charts";

function PanelAdmin() {
  return (
    <>
      <Details />
      <Charts
        dataSeals={[
          { month: "May", value: 2100 },
          { month: "Feb", value: 1200 },
          { month: "July", value: 1800 },
          { month: "Feb", value: 1900 },
        ]}
        dataUsers={[
          { month: "May", value: 10 },
          { month: "Feb", value: 20 },
          { month: "July", value: 18 },
          { month: "Feb", value: 9 },
        ]}
      />
    </>
  );
}

export default PanelAdmin;
