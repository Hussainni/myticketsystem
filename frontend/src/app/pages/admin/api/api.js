// api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://myticketsystem-production.up.railway.app", // works in Vite
  withCredentials: true,
  timeout: 60000
});

export default API;
