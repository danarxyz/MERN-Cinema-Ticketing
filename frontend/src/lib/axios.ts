import axios from "axios";
import { getSession } from "./utils";

const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export const globalInstance = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  withCredentials: true, // tambahkan ini
  headers: { "Content-Type": "application/json" },
});

globalInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      return Promise.reject({
        ...error,
        message: "Invalid email or password",
      });
    }
    return Promise.reject(error);
  }
);

export const privateInstance = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
});

privateInstance.interceptors.request.use((config) => {
  const session = getSession();

  config.headers.Authorization = `JWT ${session?.token}`;

  return config;
});
