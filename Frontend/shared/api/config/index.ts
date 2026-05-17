import axios from "axios";

export const apiURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const serverApiURL = process.env.INTERNAL_API_URL || apiURL;

export const axiosApi = axios.create({
  baseURL: typeof window === "undefined" ? serverApiURL : apiURL,
});
