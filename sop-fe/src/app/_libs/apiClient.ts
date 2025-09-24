import https from "node:https";
import axios from "axios";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent: httpsAgent,
  timeout: 10000,
});
