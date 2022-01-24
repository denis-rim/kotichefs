import axios from "axios";

const API_SERVER = "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_SERVER,
  // send cookie (jwt)
  withCredentials: true,
});
