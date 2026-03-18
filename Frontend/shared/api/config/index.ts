import axios from "axios";

export const apiURL = process.env.API_URL || "http://127.0.0.1:5000"

export const axiosApi = axios.create({
  baseURL: apiURL,
});