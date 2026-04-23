import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { getFeatureFlags } from "../../api/featureflags.api";

export interface FeatureFlag {
  flagId: string;
  environmentId: string;
  name: string;
  enabled: boolean;
  rules: string;
  version: number;
  updatedAt: string;
}

interface FeatureFlagListProps {
  featureFlags: FeatureFlag[];
}

const FeatureFlagList: React.FC<FeatureFlagListProps> = ({
  featureFlags,
}: FeatureFlagListProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Feature Name</TableCell>
            <TableCell>Environment ID</TableCell>
            <TableCell>Enabled</TableCell>
            <TableCell>Version</TableCell>
            <TableCell>Last updated</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {featureFlags.map((featureFlag: FeatureFlag) => (
            <TableRow key={featureFlag.flagId}>
              <TableCell>{featureFlag.name}</TableCell>
              <TableCell>{featureFlag.environmentId}</TableCell>
              <TableCell>{featureFlag.enabled ? "Yes" : "No"}</TableCell>
              <TableCell>{featureFlag.version}</TableCell>
              <TableCell>
                {new Date(featureFlag.updatedAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const FeatureFlagManager: React.FC = () => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>([]);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const fetchFeatureFlags = async () => {
      const response = await getFeatureFlags();
      setFeatureFlags(response);
    };
    fetchFeatureFlags();
  }, []);

  const redirectToAddToggle = () => {
    navigate("/new-feature-flag");
  };

  return (
    <>
      <Stack>
        <Container>
          <Button
            variant="contained"
            color="success"
            onClick={redirectToAddToggle}>
            Add new flag
          </Button>
        </Container>
        <Container>
          <FeatureFlagList featureFlags={featureFlags} />
        </Container>
      </Stack>
    </>
  );
};

export default FeatureFlagManager;
