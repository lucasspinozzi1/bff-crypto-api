//OFF CHAIN TRANSACTIONS
import RoutesConfig from "../../http/httpRoutes";

const CLIENT = { post: (a: any, b: any) => {}, get: (a: any) => {} };
const size = 10;
const offset = 0;
const count = true;
const getLedgerTransactionsList = async () =>
  await CLIENT.post(
    `${RoutesConfig.ledgerTransaction}/ledger?pageSize=${size}&offset=${offset}&count=${count}`,
    {
      account: "5e6be8e9e6aa436299950c41",
      counterAccount: "5e6be8e9e6aa436299950c41",
      currency: "BTC",
      from: 1571833231000,
      amount: [
        {
          op: "gte",
          value: "1.5",
        },
        {
          op: "gte",
          value: "1.5",
        },
      ],
      currencies: ["BTC", "BTC"],
      transactionType: "do deserunt",
      transactionTypes: ["CREDIT_PAYMENT", "CREDIT_PAYMENT"],
      opType: "PAYMENT",
      transactionCode: "1_01_EXTERNAL_CODE",
      paymentId: "65426",
      recipientNote: "65426",
      senderNote: "65426",
      to: 1571833231000,
    }
  );

const EXAMPLE_RESPONSE = [
  {
    accountId: "5e6645712b55823de7ea82f1",
    reference: "5e6be8e9e6aa436299950c41",
    anonymous: false,
    amount: "0.1",
    marketValue: {
      amount: "1235.56",
      currency: "EUR",
      sourceDate: 1572031674384,
      source: "fixer.io",
    },
    created: 1572031674384,
    operationType: "PAYMENT",
    transactionType: "CREDIT_PAYMENT",
    currency: "BTC",
    counterAccountId: "5e6645712b55823de7ea82f1",
    transactionCode: "1_01_EXTERNAL_CODE",
    senderNote: "Sender note",
    recipientNote: "Private note",
    paymentId: "65426",
    attr: "123",
    address: "qrppgud79n5h5ehqt9s7x8uc82pcag82es0w9tada0",
    txId: "c6c176e3f6705596d58963f0ca79b34ffa5b78874a65df9c974e22cf86a7ba67",
  },
  {
    accountId: "5e6645712b55823de7ea82f1",
    reference: "5e6be8e9e6aa436299950c41",
    anonymous: false,
    amount: "0.1",
    marketValue: {
      amount: "1235.56",
      currency: "EUR",
      sourceDate: 1572031674384,
      source: "fixer.io",
    },
    created: 1572031674384,
    operationType: "PAYMENT",
    transactionType: "CREDIT_PAYMENT",
    currency: "BTC",
    counterAccountId: "5e6645712b55823de7ea82f1",
    transactionCode: "1_01_EXTERNAL_CODE",
    senderNote: "Sender note",
    recipientNote: "Private note",
    paymentId: "65426",
    attr: "123",
    address: "qrppgud79n5h5ehqt9s7x8uc82pcag82es0w9tada0",
    txId: "c6c176e3f6705596d58963f0ca79b34ffa5b78874a65df9c974e22cf86a7ba67",
  },
];
