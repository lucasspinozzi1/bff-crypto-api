import { API_KEY_GOD_MODE } from "./const";
export const APPWRITE_CONFIG = {
  endpoint: process.env.APPWRITE_ENDPOINT ?? "http://212e-186-12-184-169.ngrok.io/v1",
  project: process.env.APPWRITE_PROJECT ?? "62868821688a84ff78ee",
  key: API_KEY_GOD_MODE,
};

export default APPWRITE_CONFIG;
