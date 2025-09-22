import https from "node:https";
import axios from "axios";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const apiClient = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  httpsAgent: httpsAgent,
});

export default apiClient;
