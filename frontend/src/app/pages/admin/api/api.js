// api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://myticketsystem-production.up.railway.app", // works in Vite
  withCredentials: true,
});

export default API;
