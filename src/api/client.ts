import axios from "axios";

/* eslint-disable no-console */
const apiClient = axios.create({
  baseURL: "https://challenge.outsera.tech/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for logging and common headers
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response?.status === 404) {
      console.error("Resource not found:", error.config?.url);
    } else if (error.response?.status >= 500) {
      console.error("Server error:", error.response?.status);
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
