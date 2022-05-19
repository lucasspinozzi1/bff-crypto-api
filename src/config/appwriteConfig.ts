export const APPWRITE_CONFIG = {
  endpoint: process.env.APPWRITE_ENDPOINT ?? "http://localhost/v1",
  project: process.env.APPWRITE_PROJECT ?? "primer-proyecto-de-prueba",
  key:
    process.env.APPWRITE_KEY ??
    "53499c50bcd4521ad64e931604f0b3e66c8eb86f27624063f875fbba7333d2fc47af2609381af0f2310f6426b91ac726fe59e5ee78a166808c68f4dc26aec5588ccedf5ca48677342dded59bf0a89f753b4288c35af02f6e52a72afa8c1ec58f25f79f6656a87e6e8e4ce57e00edad61f7a735c36d89fe832382c81771d103dd",
};

export default APPWRITE_CONFIG;
