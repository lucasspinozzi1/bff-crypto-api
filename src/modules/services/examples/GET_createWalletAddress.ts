import RoutesConfig from "../../http/httpRoutes";

const CLIENT = { post: () => {}, get: (a: any) => {} };
const xpub = "xpub";
const index = 1;
const createWalletAddress = async () =>
  await CLIENT.get(`${RoutesConfig.ethBalanceAddress}/${xpub}/${index}`);

const EXAMPLE_RESPONSE = {
  address: "n36h3pAH7sC3z8KMB47BjbqvW2aJd2oTi7",
};
