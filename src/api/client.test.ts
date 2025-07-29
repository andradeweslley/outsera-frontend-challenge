import client from "./client";

jest.unmock("axios");

describe("API Client", () => {
  it("should be configured with the correct base URL", () => {
    expect(client.defaults.baseURL).toBe("https://challenge.outsera.tech/api");
  });

  it("should be an axios instance", () => {
    expect(client).toBeDefined();
    expect(typeof client.get).toBe("function");
    expect(typeof client.post).toBe("function");
    expect(typeof client.put).toBe("function");
    expect(typeof client.delete).toBe("function");
  });

  it("should have request and response interceptors configured", () => {
    expect(client.interceptors.request).toBeDefined();
    expect(client.interceptors.response).toBeDefined();
  });

  it("should have timeout configured", () => {
    expect(client.defaults.timeout).toBe(10000);
  });

  it("should have correct headers configured", () => {
    expect(client.defaults.headers["Content-Type"]).toBe("application/json");
  });
});
