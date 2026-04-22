const API_BASE_URL = "/api/v1";
const ACCESS_TOKEN_STORAGE_KEY = "flagforge.accessToken";
const REFRESH_TOKEN_STORAGE_KEY = "flagforge.refreshToken";

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

const setAuthTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
};

const clearAuthTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
};

const buildHeaders = () => {
  const headers: Record<string, string> = {
    "content-type": "application/json",
  };
  const token = getAccessToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const post = async <TResponse>(
  url: string,
  content: object,
): Promise<TResponse> => {
  const response = await fetch(url, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(content),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

const get = async <TResponse>(url: string): Promise<TResponse> => {
  const response = await fetch(url, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export interface Tenant {
  tenantId: string;
  name: string;
  plan: string;
  createdAt: string;
}

export interface Environment {
  environmentId: string;
  tenantId: string;
  name: string;
}

export interface CreatedEnvironment extends Environment {
  apiKey: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  tenantName?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  userId: string;
  email: string;
  tenantId: string;
  roles: string[];
  tenants: Tenant[];
}

const register = (request: RegisterRequest) =>
  post<{ userId: string; email: string }>(`${API_BASE_URL}/auth/register`, request);

const login = async (email: string, password: string) => {
  const response = await post<LoginResponse>(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  setAuthTokens(response.accessToken, response.refreshToken);
  return response;
};

const logout = () => clearAuthTokens();
const isAuthenticated = () => Boolean(getAccessToken());

const getTenants = () => get<Tenant[]>(`${API_BASE_URL}/tenants`);
const createTenant = (name: string) => post<Tenant>(`${API_BASE_URL}/tenants`, { name });
const getEnvironments = (tenantId: string) =>
  get<Environment[]>(
    `${API_BASE_URL}/environments/${encodeURIComponent(tenantId)}`,
  );
const createEnvironment = (tenantId: string, name: string) =>
  post<CreatedEnvironment>(`${API_BASE_URL}/environments`, { tenantId, name });

const Api = {
  get,
  post,
  register,
  login,
  logout,
  isAuthenticated,
  getTenants,
  createTenant,
  getEnvironments,
  createEnvironment,
};

export default Api;
