export interface FeatureToggle {
  name: string;
  description?: string;
  isEnabled: boolean;
  environment: string;
  tags?: string[];
}
