import axios from "axios";
import { TChatProps } from "../../utils/types/chat.types";

export const chatSend = async ({
  star,
  model,
  id,
  chat_limit,
  is_rag,
  message,
  temperature,
}: TChatProps) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_URL}/chat`, {
      star,
      model,
      id,
      chat_limit,
      is_rag,
      message,
      temperature,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const chatScript = async ({
  star,
  model,
  id,
  chat_limit,
  is_rag,
  message,
  temperature,
}: TChatProps) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_URL}/chat`, {
      star,
      model,
      id,
      chat_limit,
      is_rag,
      message,
      temperature,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const resetChat = async ({ id, star }: any) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_URL}/reset`, {
      star,
      id,
    });
    return response;
  } catch (error) {
    return error;
  }
};
