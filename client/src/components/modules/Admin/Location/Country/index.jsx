import { Box, Typography } from "@mui/material";
import AppDataGrid from "../../../../Common/DataGrid/index";
import ActionsDataGrid from "../../../../Common/MasterEntries/ActionsDataGrid";
import { CommonHeader } from "../../../../Common/MasterEntries/CommonHeader";
import { ConfirmModal } from "../../../../Common/MasterEntries/ConfirmModal";
import { columns } from "./countryColumns";
import { useCountryData } from '@services/api/Common/hookFactory';

const Country = () => {
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
    search, // Get search value
    setSearch, // Get setSearch handler
  } = useCountryData();

  if (error) {
    return (
      <Box>
        <Typography color="error">
          Error loading countries: {error.message}
        </Typography>
      </Box>
    );
  }

  const entityType = "Countries";

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
          search={search} // Pass search value
          setSearch={setSearch} // Pass setSearch handler
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
        content={`Are you sure you want to delete this ${entityType.slice(0, -1)}?`}
      />
    </Box>
  );
};

export default Country;