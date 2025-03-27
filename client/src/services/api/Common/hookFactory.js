import { useDataGrid } from "./useDataGrid";
import { EntityTypesEnum } from "./ApiEnums";

export const createEntityDataHook = (entityType) => {
  return (params = {}, initialData) =>
    useDataGrid({
      entityType,
      params, // Pagination will be merged in useDataGrid
      initialData,
    });
};

// Export specific hooks
export const useCountryData = createEntityDataHook(EntityTypesEnum.COUNTRIES);
export const useStateData = createEntityDataHook(EntityTypesEnum.STATES);
export const useCityData = createEntityDataHook(EntityTypesEnum.CITIES);
