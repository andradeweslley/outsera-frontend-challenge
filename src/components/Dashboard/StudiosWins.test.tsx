import React from "react";
import { render } from "@testing-library/react";
import StudiosWins from "./StudiosWins";
import { StudiosWithWinCountResponse } from "../../types";

describe("StudiosWins", () => {
  it("renders without crashing", () => {
    const mockData: StudiosWithWinCountResponse = { studios: [] };
    render(<StudiosWins data={mockData} />);
  });
});
