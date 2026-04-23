import { Env } from "./env";

type Environment = "development" | "production" | "test";

export interface AppConfig {
  flagForgeApiBaseUrl: string;
  appName: string;
  env: Environment;
}

function validateEnv(): void {
  if (!Env.FLAG_FORGE_API_BASE_URL) {
    throw new Error("Missing VITE_FLAG_FORGE_API_BASE_URL");
  }
}
validateEnv();

export const config: AppConfig = {
  flagForgeApiBaseUrl: Env.FLAG_FORGE_API_BASE_URL + "/api",
  appName: Env.APP_NAME || "FlagForge",
  env: Env.MODE as Environment,
};
