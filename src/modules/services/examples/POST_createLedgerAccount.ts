import RoutesConfig from "../../http/httpRoutes";

const CLIENT = { post: (a: any, b: any) => {}, get: (a: any) => {} };
const createLedgerAccount = async () =>
  await CLIENT.post(`${RoutesConfig.ledgerAccount}`, {
    currency: "TRON",
    xpub: "tronXpub",
    customer: {
      externalId: "38646582",
      accountingCurrency: "USD",
      customerCountry: "AR",
      providerCountry: "AR",
    },
    compliant: false,
    accountCode: "LUCAS_TEST",
    accountingCurrency: "USD",
    accountNumber: "38646582",
  });

const EXAMPLE_RESPONSE = {
  id: "5e68c66581f2ee32bc354087",
  active: true,
  frozen: false,
  currency: "BTC",
  balance: {
    accountBalance: "1000000",
    availableBalance: "1000000",
  },
  customerId: "5e68c66581f2ee32bc354087",
  accountCode: "03_ACC_01",
  xpub: "xpub6FB4LJzdKNkkpsjggFAGS2p34G48pqjtmSktmK2Ke3k1LKqm9ULsg8bGfDakYUrdhe2EHw5uGKX9DrMbrgYnVfDwrksT4ZVQ3vmgEruo3Ka",
};
