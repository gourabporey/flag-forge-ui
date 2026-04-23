const env = import.meta.env;

export const Env = {
  FLAG_FORGE_API_BASE_URL: env.VITE_FLAG_FORGE_API_BASE_URL,
  APP_NAME: env.VITE_APP_NAME,
  MODE: env.MODE,
};
