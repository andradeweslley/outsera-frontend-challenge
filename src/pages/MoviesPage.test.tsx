import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MoviesPage from "./MoviesPage";

describe("MoviesPage", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <MoviesPage />
      </MemoryRouter>
    );
  });
});
