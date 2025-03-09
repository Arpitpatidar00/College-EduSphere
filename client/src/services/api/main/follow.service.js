// src/api/followActions.js

import { MethodTypesEnum } from "../../../enums/ApiMethord";
import { apiEndPoints } from "../../apiEndpoint";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useGenericMutation } from "../../../hook/useGenericMutation";
import { createServerAction } from "../../../hook/createServerAction";

// Follow Actions

export const toggleFollowAction = async ({ userId, status }) => {
  return createServerAction({
    url: `${apiEndPoints.followUser}`,
    body: { userId, status },
    method: MethodTypesEnum.POST,
  });
};

export const getFollowersAction = async (userId) => {
  return createServerAction({
    url: `${apiEndPoints.getFollowers}/${userId}/followers`,
    method: MethodTypesEnum.GET,
  });
};

export const getFollowingAction = async (userId) => {
  return createServerAction({
    url: `${apiEndPoints.getFollowing}/${userId}/following`,
    method: MethodTypesEnum.GET,
  });
};

export const blockUserAction = async (userId) => {
  return createServerAction({
    url: `${apiEndPoints.blockUser}/${userId}`,
    method: MethodTypesEnum.POST,
  });
};
// Follow Hooks

export const useToggleFollow = () => {
  return useGenericMutation(toggleFollowAction, [
    "followers",
    "following",
    "students",
  ]);
};

export const useGetFollowers = (userId, initialData) =>
  useQuery({
    queryKey: ["followers", userId],
    queryFn: async () => {
      const response = await getFollowersAction(userId);
      if (!response.code) {
        throw response;
      }
      return response.result;
    },
    initialData: () => initialData,
    placeholderData: keepPreviousData,
    enabled: !!userId, // Only fetch if userId exists
  });

export const useGetFollowing = (userId, initialData) =>
  useQuery({
    queryKey: ["following", userId],
    queryFn: async () => {
      const response = await getFollowingAction(userId);
      if (!response.code) {
        throw response;
      }
      return response.result;
    },
    initialData: () => initialData,
    placeholderData: keepPreviousData,
    enabled: !!userId, // Only fetch if userId exists
  });

export const useBlockUser = () => {
  return useGenericMutation(blockUserAction, ["followers", "following"]);
};
