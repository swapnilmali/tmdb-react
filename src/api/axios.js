import axios from "axios";
import { API_KEY, BASE_API_URL } from "../config";

export default axios.create({
  baseURL: BASE_API_URL,
  params: {
    api_key: API_KEY
  }
});
