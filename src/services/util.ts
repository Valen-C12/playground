import axios from "axios";

const baseURL = "http://192.168.1.33:10081/api";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    common: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },
});
