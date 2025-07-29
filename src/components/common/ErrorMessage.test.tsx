import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders error message", () => {
    render(<ErrorMessage message="Test error message" />);
    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("renders with default error severity", () => {
    render(<ErrorMessage message="Test error" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-standardError");
  });

  it("renders with warning severity", () => {
    render(<ErrorMessage message="Test warning" severity="warning" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-standardWarning");
  });

  it("renders with info severity", () => {
    render(<ErrorMessage message="Test info" severity="info" />);
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-standardInfo");
  });

  it("renders retry button when onRetry is provided", () => {
    const mockRetry = jest.fn();
    render(<ErrorMessage message="Test error" onRetry={mockRetry} />);

    const retryButton = screen.getByText("Retry");
    expect(retryButton).toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", () => {
    const mockRetry = jest.fn();
    render(<ErrorMessage message="Test error" onRetry={mockRetry} />);

    const retryButton = screen.getByText("Retry");
    fireEvent.click(retryButton);

    expect(mockRetry).toHaveBeenCalledTimes(1);
  });

  it("does not render retry button when onRetry is not provided", () => {
    render(<ErrorMessage message="Test error" />);

    expect(screen.queryByText("Retry")).not.toBeInTheDocument();
  });

  it("renders with custom message and retry functionality", () => {
    const mockRetry = jest.fn();
    render(
      <ErrorMessage
        message="Custom error message"
        onRetry={mockRetry}
        severity="warning"
      />
    );

    expect(screen.getByText("Custom error message")).toBeInTheDocument();
    expect(screen.getByText("Retry")).toBeInTheDocument();

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-standardWarning");
  });
});
