import { API_KEY_GOD_MODE } from "./const";
export const APPWRITE_CONFIG = {
  endpoint: process.env.APPWRITE_ENDPOINT ?? "http://localhost/v1",
  project: process.env.APPWRITE_PROJECT ?? "primer-proyecto-de-prueba",
  key: API_KEY_GOD_MODE,
};

export default APPWRITE_CONFIG;
