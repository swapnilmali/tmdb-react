import axios from "axios";
import { API_KEY, BASE_API_URL } from "../config";

// Created axios instance.
//Attached cacel token to cancel the async call when users move to different page.
export const getInstance = () => {
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
