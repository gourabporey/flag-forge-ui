import axios from "axios";
import { config } from "../../configurations/app-config";
import {
  ACCESS_TOKEN_STORAGE_KEY,
  ContentType,
} from "../../constants/api.constants";

export const getAccessToken = () =>
  localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

const flagForgeApiClient = axios.create({
  baseURL: config.flagForgeApiBaseUrl,
  headers: {
    "Content-Type": ContentType.ApplicationJson,
  },
});

flagForgeApiClient.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

flagForgeApiClient.interceptors.response.use(
  res => res,
  async error => {
    // if (error.response?.status === 401) {
    // refresh token logic
    // }
    return Promise.reject(error);
  },
);

export default flagForgeApiClient;
