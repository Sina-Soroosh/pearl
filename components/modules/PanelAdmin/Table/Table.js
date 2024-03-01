import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

function Table({ rows, columns }) {
  return (
    <div style={{ height: "fit-content", width: "100%", marginTop: "20px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        style={{ fontSize: "14px" }}
      />
    </div>
  );
}

export default Table;
