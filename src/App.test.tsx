import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

test("renders app with navigation functionality", async () => {
  render(<App />);

  // Wait for any async operations to complete
  await waitFor(() => {
    expect(screen.getByText("Golden Raspberry Awards")).toBeInTheDocument();
  });

  // Test navigation drawer functionality
  const menuButton = screen.getByLabelText("menu");
  fireEvent.click(menuButton);

  // Verify navigation links are present
  expect(screen.getByText("Dashboard")).toBeInTheDocument();
  expect(screen.getByText("Movies")).toBeInTheDocument();
});
