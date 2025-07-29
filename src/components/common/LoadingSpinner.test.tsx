import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders with default message", () => {
    render(<LoadingSpinner />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders with custom message", () => {
    render(<LoadingSpinner message="Custom loading message" />);
    expect(screen.getByText("Custom loading message")).toBeInTheDocument();
  });

  it("renders with default size", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toHaveStyle("width: 40px; height: 40px;");
  });

  it("renders with custom size", () => {
    render(<LoadingSpinner size={60} />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toHaveStyle("width: 60px; height: 60px;");
  });

  it("renders spinner element", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
  });

  it("renders with custom message and size", () => {
    render(<LoadingSpinner message="Processing data..." size={50} />);

    expect(screen.getByText("Processing data...")).toBeInTheDocument();
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toHaveStyle("width: 50px; height: 50px;");
  });

  it("has proper accessibility attributes", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole("progressbar");
    expect(spinner).toHaveAttribute("role", "progressbar");
  });
});
