// src/api/chatActions.js
import { MethodTypesEnum } from "../../../enums/ApiMethord";
import { apiEndPoints } from "../../apiEndpoint";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useGenericMutation } from "../../../hook/useGenericMutation";
import { createServerAction } from "../../../hook/createServerAction";

// Chat Actions

export const getMessagesAction = async (params, showSuccessToast = false) => {
  return createServerAction({
    url: `${apiEndPoints.getMessages}?conversationId=${params.conversationId}`,
    method: MethodTypesEnum.GET,
    showSuccessToast,
  });
};

export const sendMessageAction = async (body) => {
  return createServerAction({
    url: apiEndPoints.sendMessage,
    body,
    method: MethodTypesEnum.POST,
  });
};

export const createDirectChatAction = async (body) => {
  return createServerAction({
    url: apiEndPoints.createDirectChat,
    body,
    method: MethodTypesEnum.POST,
  });
};

export const createGroupChatAction = async (body) => {
  return createServerAction({
    url: apiEndPoints.createGroupChat,
    body,
    method: MethodTypesEnum.POST,
  });
};

// Chat Hooks

export const useGetMessages = (conversationId, initialData) =>
  useQuery({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      const response = await getMessagesAction({ conversationId });
      if (!response.code) {
        throw response;
      }
      return response.result;
    },
    initialData: () => initialData,
    placeholderData: keepPreviousData,
    enabled: !!conversationId, // Only fetch if conversationId exists
  });

export const useSendMessage = () => {
  return useGenericMutation(sendMessageAction, ["messages"]);
};

export const useCreateDirectChat = () => {
  return useGenericMutation(createDirectChatAction, ["chats"]);
};

export const useCreateGroupChat = () => {
  return useGenericMutation(createGroupChatAction, ["chats"]);
};
