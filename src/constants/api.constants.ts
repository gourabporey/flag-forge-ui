import { config } from "../configurations/app-config";

export const FLAG_FORGE_API_BASE_URL = config.flagForgeApiBaseUrl;

export const ACCESS_TOKEN_STORAGE_KEY = "flagforge.accessToken";

export const REFRESH_TOKEN_STORAGE_KEY = "flagforge.refreshToken";

export const ContentType = {
  ApplicationJson: "application/json",
};

export const HttpMethod = {
  POST: "POST",
  GET: "GET",
};
