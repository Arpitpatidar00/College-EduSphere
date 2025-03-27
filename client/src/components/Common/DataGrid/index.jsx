import { alpha, Paper, Box, MenuItem, Select, Switch, Button, Chip, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import DOMPurify from "isomorphic-dompurify";
import { APP_COLORS } from '../../../enums/Colors';

const chipStatusColor = {
  active: "success",
  pending: "warning",
  inactive: "error",
};

const renderActionCell = (
  column,
  params,
  handleEdit,
  handleDelete,
  handleStatusChange
) => (
  <Stack my={1} spacing={1} alignItems="center">
    {!column.hideEdit && (
      <Button
        isCircleBtn
        btnVariant="icon"
        icon={<TbEdit />}
        onClick={(e) => {
          e.stopPropagation();
          handleEdit(params.row);
        }}
      />
    )}
    {column.isToggleDelete && !column.isSelectOption ? (
      <Switch
        checked={!!params.row?.isActive}
        onChange={(e) => {
          e.stopPropagation();
          handleDelete(params.id, !!params.row?.isActive);
        }}
        inputProps={{ "aria-label": "controlled" }}
      />
    ) : column.isSelectOption ? (
      <Select
        size="small"
        value={params.row.activeStatus || ""}
        onChange={(event) => {
          event.stopPropagation();
          handleStatusChange(params.id, event.target.value);
        }}
      >
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="inactive">Inactive</MenuItem>
      </Select>
    ) : (
      <Button
        btnVariant="icon"
        textColor="error.main"
        icon={<AiOutlineDelete />}
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(params.id);
        }}
      />
    )}
  </Stack>
);

const renderSanitizedHTML = (value) => (
  <span
    dangerouslySetInnerHTML={{
      __html: `${DOMPurify.sanitize(value).substring(0, 20)}...`,
    }}
  />
);

const renderStatusChip = (status) => (
  <Chip label={status} color={chipStatusColor[status] || "default"} />
);

const renderImageCell = (value) => (
  <Box sx={{ width: "100px", height: "50px" }}>
    <img
      src={value}
      alt={value}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  </Box>
);

const AppDataGrid = ({
  rows,
  columns,
  paginationModel,
  setPaginationModel,
  loading,
  rowCount,
  onRowClick,
  handleEdit = () => { },
  handleDelete = () => { },
  handleStatusChange = () => { },
  ...rest
}) => {
  const enhancedColumns = columns.map((column) => {
    if (column.action) {
      return {
        ...column,
        renderCell: (params) =>
          renderActionCell(
            column,
            params,
            handleEdit,
            handleDelete,
            handleStatusChange
          ),
        sortable: false,
        filterable: false,
      };
    }
    if (column.parseHTML) {
      return {
        ...column,
        renderCell: (params) => renderSanitizedHTML(params.value),
        sortable: false,
      };
    }
    if (column.status) {
      return {
        ...column,
        renderCell: (params) => renderStatusChip(params.value),
        sortable: false,
      };
    }
    if (column.showImage) {
      return {
        ...column,
        renderCell: (params) => renderImageCell(params.value),
        sortable: false,
      };
    }
    return { flex: 1, ...column };
  });

  return (
    <Paper elevation={1} sx={{ width: "100%", height: "450px", overflow: "hidden", borderRadius: 4 }}>
      <Stack col width="100%" sx={{ height: "100%" }}>
        <Box sx={{ height: "100%", overflow: "auto" }}>
          <DataGrid
            paginationMode="server"
            loading={loading}
            pageSizeOptions={[10, 25, 50]}
            rows={rows}
            columns={enhancedColumns}
            rowCount={rowCount}
            onRowClick={onRowClick}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            getRowId={(row) => row._id}
            sx={{
              border: "none",
              "& .MuiDataGrid-main": { overflow: "auto" }, // Ensures scrolling stays inside
              "& .MuiDataGrid-row": {
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: alpha(APP_COLORS.primary[500], 0.1),
                },
                borderBottom: "1px solid",
                borderColor: "grey.100",
              },
              "& .MuiDataGrid-columnHeaders": {
                ".MuiDataGrid-columnHeader": {
                  backgroundColor: "primary.500",
                  color: "secondary.main",
                },
                ".MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                  width: "200px",
                },
                ".MuiDataGrid-menuIcon button": {
                  color: "secondary.main", marginTop: "0px",
                },
                "& .MuiDataGrid-iconButtonContainer button": {
                  color: "secondary.main",
                },
              },
              "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
                outline: "none",
              },
              "& .MuiDataGrid-cell:hover": { color: "primary.main" },
            }}
            {...rest}
          />
        </Box>
      </Stack>
    </Paper>

  );
};

export default AppDataGrid;
