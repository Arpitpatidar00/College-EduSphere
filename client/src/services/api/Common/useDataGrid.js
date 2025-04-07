import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useGetAllCountries,
  useGetAllStates,
  useGetAllCities,
  toggleCountryAction,
  toggleStateAction,
  toggleCityAction,
} from "../master/location.service";
import { EntityTypesEnum } from "./ApiEnums";

export const useDataGrid = ({
  entityType,
  params = {},
  initialData,
  editHandler,
  deleteHandler,
  statusChangeHandler,
}) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState(""); // Add search state

  const queryClient = useQueryClient();

  const fetchHookMap = {
    [EntityTypesEnum.COUNTRIES]: useGetAllCountries,
    [EntityTypesEnum.STATES]: useGetAllStates,
    [EntityTypesEnum.CITIES]: useGetAllCities,
  };

  const toggleActionMap = {
    [EntityTypesEnum.COUNTRIES]: toggleCountryAction,
    [EntityTypesEnum.STATES]: toggleStateAction,
    [EntityTypesEnum.CITIES]: toggleCityAction,
  };

  const useFetchHook = fetchHookMap[entityType];
  if (!useFetchHook) {
    throw new Error(`No fetch hook defined for entity type: ${entityType}`);
  }

  // Merge paginationModel and search into params
  const updatedParams = {
    ...params,
    page: paginationModel.page + 1, // 1-based indexing; adjust if 0-based
    limit: paginationModel.pageSize,
    search: search || undefined, // Include search; omit if empty
  };

  // Pass updatedParams to the fetch hook
  const { data, isLoading, error } = useFetchHook(updatedParams, initialData);

  // Default handlers (can be overridden)
  const handleEdit = editHandler || ((row) => {});

  const handleConfirmAction = (item) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleDelete =
    deleteHandler ||
    (async (id) => {
      try {
        const toggleAction = toggleActionMap[entityType];
        if (!toggleAction) {
          throw new Error(
            `No toggle action defined for entity type: ${entityType}`
          );
        }
        await toggleAction(id);
        queryClient.invalidateQueries([entityType]);
      } catch (err) {
        console.error(`Error toggling status for ${entityType}:`, err);
      }
    });

  const handleConfirmDelete = async () => {
    if (selectedItem) {
      await handleDelete(selectedItem._id); // Assuming id is in _id field
      setOpenModal(false);
      setSelectedItem(null);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
  };

  const handleStatusChange = statusChangeHandler || (() => {});

  const rows = data?.data || [];
  const rowCount = data?.totalCount || 0;

  return {
    paginationModel,
    setPaginationModel,
    rows,
    rowCount,
    isLoading,
    error,
    handleEdit,
    handleDelete: handleConfirmAction,
    handleConfirmDelete,
    handleCloseModal,
    handleStatusChange,
    openModal,
    selectedItem,
    search, // Expose search state
    setSearch, // Expose setSearch handler
  };
};
