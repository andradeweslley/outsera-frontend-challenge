import React from "react";
import { render } from "@testing-library/react";
import ProducersIntervals from "./ProducersIntervals";
import { ProducersIntervals as ProducersIntervalsType } from "../../types";

describe("ProducersIntervals", () => {
  it("renders without crashing", () => {
    const mockData: ProducersIntervalsType = {
      min: [],
      max: [],
    };
    render(<ProducersIntervals data={mockData} />);
  });
});
