import { FeatureToggle } from "../components/AddFeatureFlag/types";
import flagForgeApiClient from "./clients/flagforge.client";

export const getFeatureFlags = async () => {
  const { data } = await flagForgeApiClient.get("v1/feature-flags");
  return data;
};

export const createFeatureFlag = async (featureToggle: FeatureToggle) => {
  const { data } = await flagForgeApiClient.post(
    "v1/feature-flags",
    featureToggle,
  );
  return data;
};
