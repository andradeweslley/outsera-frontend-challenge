import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./index";

describe("Navbar", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });
});
