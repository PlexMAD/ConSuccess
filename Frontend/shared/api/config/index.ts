import axios from "axios";

export const apiURL = process.env.API_URL || "http://localhost:5000"

export const axiosApi = axios.create({
  baseURL: apiURL,
});