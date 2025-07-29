// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Polyfill for TextEncoder in Jest (for MUI DataGrid)
import { TextEncoder, TextDecoder } from "util";
if (typeof global.TextEncoder === "undefined") {
  // @ts-ignore
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === "undefined") {
  // @ts-ignore
  global.TextDecoder = TextDecoder;
}

// Mock axios to prevent real HTTP requests in component tests
// This will be overridden by specific test mocks when needed
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn().mockResolvedValue({
      data: {
        years: [
          { year: 1986, winnerCount: 2 },
          { year: 1990, winnerCount: 2 },
        ],
        studios: [
          { name: "Studio A", winCount: 5 },
          { name: "Studio B", winCount: 3 },
        ],
        min: [
          {
            producer: "Producer A",
            interval: 1,
            previousWin: 1990,
            followingWin: 1991,
          },
        ],
        max: [
          {
            producer: "Producer B",
            interval: 10,
            previousWin: 1980,
            followingWin: 1990,
          },
        ],
        content: [
          {
            id: 1,
            year: 1990,
            title: "Movie A",
            studios: ["Studio A"],
            producers: ["Producer A"],
            winner: true,
          },
        ],
        totalElements: 1,
        totalPages: 1,
        size: 10,
        number: 0,
      },
    }),
    post: jest.fn().mockResolvedValue({ data: {} }),
    put: jest.fn().mockResolvedValue({ data: {} }),
    delete: jest.fn().mockResolvedValue({ data: {} }),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
    defaults: {
      baseURL: "https://challenge.outsera.tech/api",
    },
  })),
}));

// Global test cleanup to handle any remaining open handles
afterAll(async () => {
  // Wait a bit for any pending operations to complete
  await new Promise((resolve) => setTimeout(resolve, 100));
});
