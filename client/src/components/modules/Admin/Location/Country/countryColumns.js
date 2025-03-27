export const columns = [
  {
    field: "name",
    headerName: "Country Name",
    flex: 1,
  },
  {
    field: "code",
    headerName: "Country Code",
    flex: 1,
  },
  {
    field: "continent",
    headerName: "Continent",
    flex: 1,
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
    hideEdit: true,
  },
];
