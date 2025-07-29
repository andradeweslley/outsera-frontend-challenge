import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./index";

describe("Navbar", () => {
  it("renders the app title and menu button", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Golden Raspberry Awards")).toBeInTheDocument();
    expect(screen.getByLabelText("menu")).toBeInTheDocument();
  });

  it("opens drawer and shows navigation links when menu button is clicked", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);

    // Navigation links should be visible when drawer is open
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Movies")).toBeInTheDocument();
  });

  it("renders with correct toolbar structure", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Check that the toolbar contains the menu button and title
    const menuButton = screen.getByLabelText("menu");
    const title = screen.getByText("Golden Raspberry Awards");

    expect(menuButton).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
