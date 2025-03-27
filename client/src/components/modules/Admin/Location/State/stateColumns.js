export const columns = [
  { field: "name", headerName: "State Name", flex: 1 },
  { field: "abbreviation", headerName: "Abbreviation", flex: 1 },
  { field: "countryName", headerName: "Country", flex: 1 },
  {
    field: "isActive",
    headerName: "Status",
    status: true,
    flex: 1,
    valueGetter: (params) => (params.value ? "active" : "inactive"),
  },
  {
    field: "actions",
    headerName: "Actions",
    action: true,
    isToggleDelete: true,
    hideEdit: false,
    width: 150,
  },
];
