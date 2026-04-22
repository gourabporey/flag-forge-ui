import React from "react";
import "./App.css";
import FeatureFlagManager from "./components/FeatureFlagManager/FeatureFlagManager";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header/Header";
import AddFeatureFlag from "./components/AddFeatureFlag/AddFeatureFlag";
import TenantEnvironmentManager from "./components/TenantEnvironmentManager/TenantEnvironmentManager";
import AuthPage from "./components/Auth/AuthPage";
import Api from "./api/Api";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return Api.isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <FeatureFlagManager />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-feature-flag"
          element={
            <ProtectedRoute>
              <AddFeatureFlag />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setup"
          element={
            <ProtectedRoute>
              <TenantEnvironmentManager />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
