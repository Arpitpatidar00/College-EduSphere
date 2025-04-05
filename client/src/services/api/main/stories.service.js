import { MethodTypesEnum } from "../../../enums/ApiMethord";
import { apiEndPoints } from "../../apiEndpoint";
import { createServerAction } from "../../../hook/createServerAction";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useGenericMutation } from "../../../hook/useGenericMutation";

// ---- Story Actions ----

export const getAllStoriesAction = async (params, showSuccessToast) => {
  return createServerAction({
    url: apiEndPoints.getAllStories,
    body: params,
    method: MethodTypesEnum.GET,
    showSuccessToast,
  });
};

export const createOrUpdateStoryAction = async (body) => {
  return createServerAction({
    url: apiEndPoints.createOrUpdateStory,
    body,
    method: MethodTypesEnum.POST,
  });
};

export const getStoryAction = async (id) => {
  return createServerAction({
    url: `${apiEndPoints.getStory}/${id}`,
    method: MethodTypesEnum.GET,
  });
};

export const deleteStoryAction = async (id) => {
  return createServerAction({
    url: `${apiEndPoints.deleteStory}/${id}`,
    method: MethodTypesEnum.DELETE,
  });
};

export const deleteMediaAction = async ({ id, mediaIndex }) => {
  return createServerAction({
    url: `${apiEndPoints.deleteMedia}/${id}/media/${mediaIndex}`,
    method: MethodTypesEnum.DELETE,
  });
};

export const addStoryViewAction = async ({ id, body }) => {
  return createServerAction({
    url: `${apiEndPoints.addStoryView}/${id}/view`,
    body,
    method: MethodTypesEnum.POST,
  });
};

export const addStoryReactionAction = async ({ id, body }) => {
  return createServerAction({
    url: `${apiEndPoints.addStoryReaction}/${id}/reaction`,
    body,
    method: MethodTypesEnum.POST,
  });
};

export const removeStoryReactionAction = async ({ id, body }) => {
  return createServerAction({
    url: `${apiEndPoints.removeStoryReaction}/${id}/reaction`,
    body,
    method: MethodTypesEnum.DELETE,
  });
};

export const getStoryViewsAction = async (id) => {
  return createServerAction({
    url: `${apiEndPoints.getStoryViews}/${id}/views`,
    method: MethodTypesEnum.GET,
  });
};

// ---- Story Hooks ----

export const useGetAllStories = (params, initialData, paginationModel) =>
  useQuery({
    queryKey: ["stories", params, paginationModel],
    queryFn: async () => {
      const response = await getAllStoriesAction(params);
      if (!response.code) throw response;
      return response.result;
    },
    initialData: () => initialData,
    placeholderData: keepPreviousData,
  });

export const useGetStory = (id, enabled = true) =>
  useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const response = await getStoryAction(id);
      if (!response.code) throw response;
      return response.result;
    },
    enabled: !!id && enabled,
  });

export const useCreateOrUpdateStory = () =>
  useGenericMutation(createOrUpdateStoryAction, ["stories"]);

export const useDeleteStory = () =>
  useGenericMutation(deleteStoryAction, ["stories"]);

export const useDeleteMedia = () =>
  useGenericMutation(deleteMediaAction, ["stories"]);

export const useAddStoryView = () =>
  useGenericMutation(addStoryViewAction, ["stories"]);

export const useAddStoryReaction = () =>
  useGenericMutation(addStoryReactionAction, ["stories"]);

export const useRemoveStoryReaction = () =>
  useGenericMutation(removeStoryReactionAction, ["stories"]);

export const useGetStoryViews = (id, enabled = true) =>
  useQuery({
    queryKey: ["storyViews", id],
    queryFn: async () => {
      const response = await getStoryViewsAction(id);
      if (!response.code) throw response;
      return response.result;
    },
    enabled: !!id && enabled,
  });
