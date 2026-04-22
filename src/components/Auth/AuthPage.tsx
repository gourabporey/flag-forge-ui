import React, { useState } from "react";
import {
  Alert,
  Button,
  Container,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api";

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    try {
      if (mode === "register") {
        await Api.register({
          email,
          password,
          firstName,
          lastName,
          tenantName,
        });
        setMessage("Registration complete. Sign in to continue.");
        setMode("login");
        setPassword("");
        return;
      }

      await Api.login(email, password);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h5">FlagForge Account</Typography>
          <Tabs
            value={mode}
            onChange={(_, value) => {
              setMode(value);
              setError(null);
              setMessage(null);
            }}>
            <Tab value="login" label="Login" />
            <Tab value="register" label="Register" />
          </Tabs>

          {error && <Alert severity="error">{error}</Alert>}
          {message && <Alert severity="success">{message}</Alert>}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {mode === "register" && (
                <>
                  <TextField
                    label="First name"
                    value={firstName}
                    onChange={event => setFirstName(event.target.value)}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Last name"
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Workspace name"
                    value={tenantName}
                    onChange={event => setTenantName(event.target.value)}
                    fullWidth
                  />
                </>
              )}
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
                fullWidth
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                required
                fullWidth
              />
              <Button type="submit" variant="contained">
                {mode === "register" ? "Create account" : "Login"}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Container>
  );
};

export default AuthPage;
