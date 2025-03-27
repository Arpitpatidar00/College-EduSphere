export const columns = [
  { field: "name", headerName: "City Name", flex: 1 },
  { field: "stateName", headerName: "State", flex: 1 },
  { field: "countryName", headerName: "Country", flex: 1 },
  {
    field: "isMetroCity",
    headerName: "Metro City",
    flex: 1,
    valueGetter: (params) => (params.value ? "Yes" : "No"),
  },
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
  },
];
