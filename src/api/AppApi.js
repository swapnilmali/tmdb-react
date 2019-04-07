import axios from "axios";
import { API_KEY, BASE_API_URL } from "../config";

export const getAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_API_URL,
    params: {
      api_key: API_KEY
    }
  });
  instance.CancelToken = axios.CancelToken;
  instance.isCancel = axios.isCancel;
  return instance;
};
