import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import FeatureFlagManager from "./FeatureFlagManager";
import Api from "../../api/Api";

jest.mock("../../api/Api", () => ({
  get: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("FeatureFlagManager", () => {
  beforeEach(() => {
    (Api.get as jest.Mock).mockResolvedValue([
      {
        flagId: "1",
        environmentId: "env-1",
        name: "Flag 1",
        enabled: true,
        rules: "{}",
        version: 1,
        updatedAt: "2023-01-02T00:00:00Z",
      },
      {
        flagId: "2",
        environmentId: "env-2",
        name: "Flag 2",
        enabled: false,
        rules: "{}",
        version: 2,
        updatedAt: "2023-01-04T00:00:00Z",
      },
    ]);
  });

  test("renders the feature flags table correctly after API call", async () => {
    render(<FeatureFlagManager />);
    await waitFor(() => {
      expect(screen.getByText("Flag 1")).toBeInTheDocument();
      expect(screen.getByText("Flag 2")).toBeInTheDocument();
    });

    // Check that the table headers are correct
    expect(screen.getByText("Feature Name")).toBeInTheDocument();
    expect(screen.getByText("Environment ID")).toBeInTheDocument();
    expect(screen.getByText("Enabled")).toBeInTheDocument();
    expect(screen.getByText("Version")).toBeInTheDocument();
    expect(screen.getByText("Last updated")).toBeInTheDocument();

    expect(screen.getByText("env-1")).toBeInTheDocument();
    expect(screen.getByText("env-2")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });
});
