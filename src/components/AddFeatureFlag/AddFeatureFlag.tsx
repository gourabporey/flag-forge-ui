import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Container,
  Paper,
  Stack,
} from "@mui/material";
import { FeatureToggle } from "./types";
import { createFeatureFlag } from "../../api/featureflags.api";

const AddFeatureFlag: React.FC = () => {
  const [featureName, setFeatureName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [environment, setEnvironment] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!featureName) {
      setError("Feature name is required");
      return;
    }

    const newFeatureToggle: FeatureToggle = {
      name: featureName,
      description,
      isEnabled,
      environment,
      tags,
    };

    const resetFields = () => {
      setFeatureName("");
      setDescription("");
      setTags([]);
      setEnvironment("");
      setIsEnabled(false);
      setError(null);
    };

    try {
      await createFeatureFlag(newFeatureToggle);
      resetFields();
    } catch (err) {
      console.error(err);
      setError("Failed to add feature toggle. Try again.");
    }
  };

  return (
    <Container component={Paper} maxWidth="sm" sx={{ p: 3, mt: 4 }}>
      <h2>Add New Feature Toggle</h2>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Feature Name"
            variant="outlined"
            value={featureName}
            onChange={e => setFeatureName(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Description"
            variant="outlined"
            value={description}
            onChange={e => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
          <TextField
            label="Environment"
            variant="outlined"
            value={environment}
            onChange={e => setEnvironment(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Tags"
            variant="outlined"
            value={tags.join(", ")}
            onChange={e =>
              setTags(e.target.value.split(",").map(str => str.trim()))
            }
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isEnabled}
                onChange={e => setIsEnabled(e.target.checked)}
              />
            }
            label="Is Enabled?"
          />
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Button type="submit" variant="contained" color="primary">
            Add Feature Toggle
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default AddFeatureFlag;
