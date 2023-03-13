import axios from "axios";
import config from "./config";

export const instance = axios.create({
    baseURL: config.url,
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });