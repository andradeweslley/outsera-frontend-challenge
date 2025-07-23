import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DashboardPage from "./DashboardPage";

describe("DashboardPage", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );
  });
});
