import { MethodTypesEnum } from "../../../enums/ApiMethord";
import { apiEndPoints } from "../../apiEndpoint";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useGenericMutation } from "../../../hook/useGenericMutation";
import { createServerAction } from "../../../hook/createServerAction";

// Posts Actions

export const getAllPostsAction = async (params, showSuccessToast) => {
  return createServerAction({
    url: apiEndPoints.getAllPosts,
    body: params,
    method: MethodTypesEnum.GET,
    showSuccessToast,
  });
};

export const createPostAction = async (body) => {
  return createServerAction({
    url: apiEndPoints.createPost,
    body,
    method: MethodTypesEnum.POST,
  });
};

export const updatePostAction = async ({ body, id }) => {
  return createServerAction({
    method: MethodTypesEnum.PUT,
    url: `${apiEndPoints.updatePost}/${id}`,
    body,
  });
};

export const deletePostAction = async (id) => {
  return createServerAction({
    url: `${apiEndPoints.deletePost}/${id}`,
    method: MethodTypesEnum.DELETE,
  });
};

export const togglePostAction = async (id) => {
  return createServerAction({
    url: `${apiEndPoints.togglePost}/${id}`,
    method: MethodTypesEnum.PATCH,
  });
};

export const likePostAction = async (id) => {
  return createServerAction({
    url: `${apiEndPoints.likePost}/${id}`,
    method: MethodTypesEnum.POST,
  });
};

export const unlikePostAction = async (id) => {
  return createServerAction({
    url: `${apiEndPoints.unlikePost}/${id}`,
    method: MethodTypesEnum.POST,
  });
};

export const incrementPostViewAction = async (id) => {
  return createServerAction({
    url: `${apiEndPoints.incrementPostView}/${id}`,
    method: MethodTypesEnum.POST,
  });
};

// Posts Hooks

export const useGetAllPosts = (params, initialData, paginationModel) =>
  useQuery({
    queryKey: ["posts", params, paginationModel],
    queryFn: async () => {
      const response = await getAllPostsAction(params, "", false);
      if (!response.code) {
        throw response;
      }
      return response.result;
    },
    initialData: () => initialData,
    placeholderData: keepPreviousData,
  });

export const useCreatePost = () => {
  return useGenericMutation(createPostAction, ["posts"]);
};

export const useUpdatePost = () => {
  return useGenericMutation(updatePostAction, ["posts"]);
};

export const useDeletePost = () => {
  return useGenericMutation(deletePostAction, ["posts"]);
};

export const useToggleStatusPost = () => {
  return useGenericMutation(togglePostAction, ["posts"]);
};

export const useLikePost = () => {
  return useGenericMutation(likePostAction, ["posts"]);
};

export const useUnlikePost = () => {
  return useGenericMutation(unlikePostAction, ["posts"]);
};

export const useIncrementPostView = () => {
  return useGenericMutation(incrementPostViewAction, ["posts"]);
};
