import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://challenge.outsera.tech/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
