import Tenant from "../models/tenant";
import flagForgeApiClient from "./clients/flagforge.client";

export const getTenants = async () => {
  const { data } = await flagForgeApiClient.get("v1/tenants");
  return data;
};

export const createTenant = async (name: string) => {
  const { data } = await flagForgeApiClient.post("v1/tenants", { name });
  return data as Tenant;
};
