import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./index";

describe("Layout", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Test Child</div>
        </Layout>
      </MemoryRouter>
    );
  });
});
