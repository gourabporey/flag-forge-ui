import React from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Api from "../../api/Api";

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = Api.isAuthenticated();

  const handleLogout = () => {
    Api.logout();
    navigate("/login");
  };

  return (
    <Container
      style={{
        backgroundColor: "green",
        marginBottom: "20px",
        padding: "10px",
        color: "white",
      }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between">
        <Typography variant="h4">Feature Flag Manager</Typography>
        <Stack direction="row" spacing={1}>
          {isAuthenticated ? (
            <>
              <Button component={RouterLink} to="/" variant="contained" color="success">
                Flags
              </Button>
              <Button component={RouterLink} to="/setup" variant="contained" color="success">
                Setup
              </Button>
              <Button variant="contained" color="success" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button component={RouterLink} to="/login" variant="contained" color="success">
              Login
            </Button>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Header;
