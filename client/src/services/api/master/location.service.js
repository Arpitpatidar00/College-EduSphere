import { MethodTypesEnum } from "../../../enums/ApiMethord";

import { apiEndPoints } from "../../apiEndpoint";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useGenericMutation } from "../../../hook/useGenericMutation";
import { createServerAction } from "../../../hook/createServerAction";

// Countries Actions

export const getCountryAction = async (params, showSuccessToast) => {
  return createServerAction({
    url: apiEndPoints.getAllCountries,
    body: params,
    method: MethodTypesEnum.GET,
    showSuccessToast,
  });
};

export const createCountryAction = async (body) => {
  return createServerAction({
    url: apiEndPoints.createCountry,
    body,
    method: MethodTypesEnum.POST,
  });
};

export const updateCountryAction = async ({ body, id }) => {
  return createServerAction({
    method: MethodTypesEnum.PUT,
    url: `${apiEndPoints.updateCountry}/${id}`,
    body,
  });
};

export const deleteCountryAction = async (id) => {
  return createServerAction({
    url: `${apiEndPoints.deleteCountry}/${id}`,
    method: MethodTypesEnum.DELETE,
  });
};

export const toggleCountryAction = async (id) => {
  return createServerAction({
    url: `${apiEndPoints.toggleCountry}/${id}`,
    method: MethodTypesEnum.PATCH,
  });
};

// States Actions

export const getStateAction = async (params, authToken, showSuccessToast) => {
  return createServerAction({
    url: apiEndPoints.getAllStates,
    body: params,
    method: MethodTypesEnum.GET,
    authToken,
    showSuccessToast,
  });
};

export const createStateAction = async (body) => {
  return createServerAction({
    url: apiEndPoints.createState,
    body,
    method: MethodTypesEnum.POST,
  });
};

export const updateStateAction = async ({ body, id }) => {
  return createServerAction({
    method: MethodTypesEnum.PUT,
    url: `${apiEndPoints.updateState}/${id}`,
    body,
  });
};

export const deleteStateAction = async (id) => {
  return createServerAction({
    url: `${apiEndPoints.deleteState}/${id}`,
    method: MethodTypesEnum.DELETE,
  });
};

export const toggleStateAction = async (id) => {
  return createServerAction({
    url: `${apiEndPoints.toggleState}/${id}`,
    method: MethodTypesEnum.PATCH,
  });
};

// Cities Actions

export const getCitiesAction = async (params, authToken, showSuccessToast) => {
  return createServerAction({
    url: apiEndPoints.getAllCities,
    body: params,
    method: MethodTypesEnum.GET,
    authToken,
    showSuccessToast,
  });
};

export const createCityAction = async (body) => {
  return createServerAction({
    url: apiEndPoints.createCity,
    body,
    method: MethodTypesEnum.POST,
  });
};

export const updateCityAction = async ({ body, id }) => {
  return createServerAction({
    method: MethodTypesEnum.PUT,
    url: `${apiEndPoints.updateCity}/${id}`,
    body,
  });
};

export const deleteCityAction = async (id) => {
  return createServerAction({
    url: `${apiEndPoints.deleteCity}/${id}`,
    method: MethodTypesEnum.DELETE,
  });
};

export const toggleCityAction = async (id) => {
  return createServerAction({
    url: `${apiEndPoints.toggleCity}/${id}`,
    method: MethodTypesEnum.PATCH,
  });
};

// Countries Hooks

export const useGetAllCountries = (params, initialData, paginationModel) =>
  useQuery({
    queryKey: ["countries", params, paginationModel],
    queryFn: async () => {
      const response = await getCountryAction(params, "", false);
      if (!response.code) {
        throw response;
      }
      return response.result;
    },
    initialData: () => initialData,
    placeholderData: keepPreviousData,
  });

export const useCreateCountry = () => {
  return useGenericMutation(createCountryAction, ["countries"]);
};

export const useUpdateCountry = () => {
  return useGenericMutation(updateCountryAction, ["countries"]);
};

export const useDeleteCountry = () => {
  return useGenericMutation(deleteCountryAction, ["countries"]);
};

export const useToggleStatusCountry = () => {
  return useGenericMutation(toggleCountryAction, ["countries"]);
};

// States Hooks

export const useGetAllStates = (params, initialData, paginationModel) =>
  useQuery({
    queryKey: ["states", params, paginationModel],
    queryFn: async () => {
      const response = await getStateAction(params, "", false);
      if (!response.code) {
        throw response;
      }
      return response.result;
    },
    initialData: () => initialData,
    placeholderData: keepPreviousData,
  });

export const useCreateState = () => {
  return useGenericMutation(createStateAction, ["states"]);
};

export const useUpdateState = () => {
  return useGenericMutation(updateStateAction, ["states"]);
};

export const useDeleteState = () => {
  return useGenericMutation(deleteStateAction, ["states"]);
};

export const useToggleStatusState = () => {
  return useGenericMutation(toggleStateAction, ["states"]);
};

// Cities Hooks

export const useGetAllCities = (params, initialData, paginationModel) =>
  useQuery({
    queryKey: ["cities", params, paginationModel],
    queryFn: async () => {
      const response = await getCitiesAction(params, "", false);
      if (!response.code) {
        throw response;
      }
      return response.result;
    },
    initialData: () => initialData,
    placeholderData: keepPreviousData,
  });

export const useCreateCity = () => {
  return useGenericMutation(createCityAction, ["cities"]);
};

export const useUpdateCity = () => {
  return useGenericMutation(updateCityAction, ["cities"]);
};

export const useDeleteCity = () => {
  return useGenericMutation(deleteCityAction, ["cities"]);
};

export const useToggleStatusCity = () => {
  return useGenericMutation(toggleCityAction, ["cities"]);
};
