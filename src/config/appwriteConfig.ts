import { API_KEY_GOD_MODE } from "./const";
export const APPWRITE_CONFIG = {
  endpoint: process.env.APPWRITE_ENDPOINT ?? "http://3366-2803-9800-9886-48b5-eb-9797-f1e7-598e.ngrok.io/v1",
  project: process.env.APPWRITE_PROJECT ?? "62868821688a84ff78ee",
  key: API_KEY_GOD_MODE,
};

export default APPWRITE_CONFIG;
