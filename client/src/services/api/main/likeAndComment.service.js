// src/api/likeAndCommentActions.js
import { MethodTypesEnum } from "../../../enums/ApiMethord";
import { apiEndPoints } from "../../apiEndpoint";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useGenericMutation } from "../../../hook/useGenericMutation";
import { createServerAction } from "../../../hook/createServerAction";

// Like Actions

export const toggleLikeAction = async (body, showSuccessToast = true) => {
  return createServerAction({
    url: apiEndPoints.toggleLike,
    body,
    method: MethodTypesEnum.POST,
    showSuccessToast,
  });
};

// Comment Actions

export const createCommentAction = async (body, showSuccessToast = true) => {
  return createServerAction({
    url: apiEndPoints.createComment,
    body,
    method: MethodTypesEnum.POST,
    showSuccessToast,
  });
};

export const deleteCommentAction = async (
  commentId,
  showSuccessToast = true
) => {
  return createServerAction({
    url: `${apiEndPoints.deleteComment}/${commentId}`,
    method: MethodTypesEnum.DELETE,
    showSuccessToast,
  });
};

export const getCommentsAction = async (params, showSuccessToast = false) => {
  const { postId, limit = 50, skip = 0 } = params;
  return createServerAction({
    url: `${apiEndPoints.getComments}?postId=${postId}&limit=${limit}&skip=${skip}`,
    method: MethodTypesEnum.GET,
    showSuccessToast,
  });
};

// Like Hooks

export const useToggleLike = () => {
  return useGenericMutation(toggleLikeAction, ["likes", "posts"], {
    onSuccess: (data) => {
      // Optionally invalidate related queries, e.g., post details
      console.log("Like toggled successfully:", data);
    },
  });
};

// Comment Hooks

export const useGetComments = (postId, initialData) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const response = await getCommentsAction({ postId });
      if (!response.code) {
        throw response;
      }
      return response.result;
    },
    initialData: () => initialData,
    placeholderData: keepPreviousData,
    enabled: !!postId,
  });
};
export const useCreateComment = () => {
  return useGenericMutation(createCommentAction, ["comments", "posts"], {
    onSuccess: (data) => {
      console.log("Comment created successfully:", data);
    },
  });
};

export const useDeleteComment = () => {
  return useGenericMutation(deleteCommentAction, ["comments", "posts"], {
    onSuccess: (data) => {
      console.log("Comment deleted successfully:", data);
    },
  });
};
