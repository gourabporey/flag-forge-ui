import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from "../constants/api.constants";
import { RegisterRequest } from "../models/auth";
import flagForgeApiClient, { getAccessToken } from "./clients/flagforge.client";

const setAuthTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
};

const clearAuthTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
};

const register = async (request: RegisterRequest) => {
  const { data } = await flagForgeApiClient.post("v1/auth/register", request);
  return { userId: data.userId, email: data.email };
};

const login = async (email: string, password: string) => {
  const { data } = await flagForgeApiClient.post("v1/auth/login", {
    email,
    password,
  });
  setAuthTokens(data.accessToken, data.refreshToken);
  return data;
};

const logout = () => clearAuthTokens();

const isAuthenticated = () => Boolean(getAccessToken());

const AuthApi = {
  register,
  login,
  logout,
  isAuthenticated,
};

export default AuthApi;
