export const APPWRITE_CONFIG = {
  endpoint:
    process.env.APPWRITE_ENDPOINT ?? "https://appwrite-dev.omnisalud.net/v1",
  project: process.env.APPWRITE_PROJECT ?? "61d5ccdc67ee5",
  key:
    process.env.APPWRITE_KEY ??
    "7b83d78f48d53b3a5a9e93f915766e6b56399e9a152176fa87e5e5b90aade9c8d78fc1523a923bfe12b2b9bce35b93bbb30c80c87ea730cdad95e1f4df9f64376fcda4d9eb630d7062f9846557610cb7d6e21e239d722efb9fd13b66316b2d049d769820485522c208555329ec59d516ddd5c8fdd418a96630ced81c42ab674f",
};

export default APPWRITE_CONFIG;
