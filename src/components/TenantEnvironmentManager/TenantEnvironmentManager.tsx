import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Tenant from "../../models/tenant";
import { CreatedEnvironment, Environment } from "../../models/environment";
import { createTenant, getTenants } from "../../api/tenants.api";
import { createEnvironment, getEnvironments } from "../../api/environments.api";

const TenantEnvironmentManager: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [selectedTenantId, setSelectedTenantId] = useState<string>("");
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [tenantName, setTenantName] = useState<string>("");
  const [environmentName, setEnvironmentName] = useState<string>("");
  const [createdEnvironment, setCreatedEnvironment] =
    useState<CreatedEnvironment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadTenants = useCallback(
    async (preferredTenantId?: string) => {
      const tenantList = await getTenants();
      setTenants(tenantList);

      const nextTenantId = preferredTenantId ?? selectedTenantId;
      if (!nextTenantId && tenantList.length > 0) {
        setSelectedTenantId(tenantList[0].tenantId);
      }
    },
    [selectedTenantId],
  );

  useEffect(() => {
    loadTenants().catch(err => setError(err.message));
  }, [loadTenants]);

  useEffect(() => {
    if (!selectedTenantId) {
      setEnvironments([]);
      return;
    }

    getEnvironments(selectedTenantId)
      .then(setEnvironments)
      .catch(err => setError(err.message));
  }, [selectedTenantId]);

  const handleCreateTenant = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError(null);

    try {
      const tenant = await createTenant(tenantName);
      setTenantName("");
      setSelectedTenantId(tenant.tenantId);
      await loadTenants(tenant.tenantId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create tenant.");
    }
  };

  const handleCreateEnvironment = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError(null);
    setCreatedEnvironment(null);

    try {
      const environment = await createEnvironment(
        selectedTenantId,
        environmentName,
      );
      setEnvironmentName("");
      setCreatedEnvironment(environment);
      setEnvironments(await getEnvironments(selectedTenantId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create environment.",
      );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Stack spacing={3}>
        <Typography variant="h5">Tenant and Environment Setup</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {createdEnvironment && (
          <Alert severity="success">
            API key for {createdEnvironment.name}: {createdEnvironment.apiKey}
          </Alert>
        )}

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleCreateTenant}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                label="Tenant name"
                value={tenantName}
                onChange={event => setTenantName(event.target.value)}
                required
                fullWidth
              />
              <Button type="submit" variant="contained">
                Create tenant
              </Button>
            </Stack>
          </form>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleCreateEnvironment}>
            <Stack spacing={2}>
              <FormControl fullWidth required>
                <InputLabel id="tenant-select-label">Tenant</InputLabel>
                <Select
                  labelId="tenant-select-label"
                  label="Tenant"
                  value={selectedTenantId}
                  onChange={event => setSelectedTenantId(event.target.value)}>
                  {tenants.map(tenant => (
                    <MenuItem key={tenant.tenantId} value={tenant.tenantId}>
                      {tenant.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Environment name"
                  value={environmentName}
                  onChange={event => setEnvironmentName(event.target.value)}
                  required
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!selectedTenantId}>
                  Create environment
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Environment</TableCell>
                <TableCell>Environment ID</TableCell>
                <TableCell>Tenant ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {environments.map(environment => (
                <TableRow key={environment.environmentId}>
                  <TableCell>{environment.name}</TableCell>
                  <TableCell>{environment.environmentId}</TableCell>
                  <TableCell>{environment.tenantId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
};

export default TenantEnvironmentManager;
