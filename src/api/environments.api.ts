import flagForgeApiClient from "./clients/flagforge.client.js";

export const getEnvironments = async (tenantId: string) => {
  const { data } = await flagForgeApiClient.get(
    `v1/environments/${encodeURIComponent(tenantId)}`,
  );
  return data;
};

export const createEnvironment = async (tenantId: string, name: string) => {
  const { data } = await flagForgeApiClient.post("v1/environments", {
    tenantId,
    name,
  });
  return data;
};
