import { Box, Typography } from "@mui/material";
import AppDataGrid from "../../../../Common/DataGrid/index";
import ActionsDataGrid from "../../../../Common/MasterEntries/ActionsDataGrid";
import { CommonHeader } from "../../../../Common/MasterEntries/CommonHeader";
import { ConfirmModal } from "../../../../Common/MasterEntries/ConfirmModal";
import { columns } from "./cityColumns";
import { useCityData } from "@services/api/Common/hookFactory";

const City = () => {
  const {
    paginationModel,
    setPaginationModel,
    rows,
    rowCount,
    isLoading,
    error,
    handleEdit,
    handleDelete,
    handleConfirmDelete,
    handleCloseModal,
    handleStatusChange,
    openModal,
    search,
    setSearch,
  } = useCityData();

  if (error) {
    return (
      <Box>
        <Typography color="error">
          Error loading cities: {error.message}
        </Typography>
      </Box>
    );
  }

  const entityType = "Cities";
  const singularEntity = "City";

  return (
    <Box sx={{ p: 2 }}>
      <CommonHeader
        title={`${entityType} Management`}
        caption={`${entityType} Data Management`}
        description={`Manage and organize all ${entityType.toLowerCase()} entries from here.`}
      />
      <Box>
        <ActionsDataGrid
          entityType={entityType}
          rows={rows}
          search={search}
          setSearch={setSearch}
        />
      </Box>
      <AppDataGrid
        rows={rows}
        columns={columns}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        loading={isLoading}
        rowCount={rowCount}
        pageSizeOptions={[5, 10, 25]}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleStatusChange={handleStatusChange}
      />
      <ConfirmModal
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title={`Confirm Action for ${entityType}`}
        content={`Are you sure you want to delete this ${singularEntity}?`}
      />
    </Box>
  );
};

export default City;
