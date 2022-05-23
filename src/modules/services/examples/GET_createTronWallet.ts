import RoutesConfig from "../../http/httpRoutes";

const CLIENT = { post: () => {}, get: (a: any) => {} };
const dynamicMnemonic = "TODO";
const createTronWallet = async () =>
  await CLIENT.get(`${RoutesConfig.tronWallet}?mnemonic=${dynamicMnemonic}`);

const EXAMPLE_RESPONSE = {
  mnemonic:
    "urge pulp usage sister evidence arrest palm math please chief egg abuse",
  xpub: "0244b3f40c6e570ae0032f6d7be87737a6c4e5314a4a1a82e22d0460a0d0cd794936c61f0c80dc74ace4cd04690d4eeb1aa6555883be006e1748306faa7ed3a26a",
};
