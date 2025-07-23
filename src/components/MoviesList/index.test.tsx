import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MoviesList from "./index";

describe("MoviesList", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <MoviesList />
      </MemoryRouter>
    );
  });
});
