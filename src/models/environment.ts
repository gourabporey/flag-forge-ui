export interface Environment {
  environmentId: string;
  tenantId: string;
  name: string;
}

export interface CreatedEnvironment extends Environment {
  apiKey: string;
}
