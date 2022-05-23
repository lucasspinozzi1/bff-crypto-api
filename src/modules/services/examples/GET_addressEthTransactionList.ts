//ON CHAIN TRANSACTIONS
import RoutesConfig from "../../http/httpRoutes";

const CLIENT = { post: (a: any, b: any) => {}, get: (a: any) => {} };
const address = "TEST";
const size = 10;
const offset = 0;
const getLedgerTransactionsList = async () =>
  await CLIENT.get(
    `${RoutesConfig.ethereumTransactions}/${address}?pageSize=${size}&offset=${offset}`
  );

const EXAMPLE_RESPONSE = [
  {
    blockHash:
      "0xcf2c40f475e78c7c19778e1ae999a0e371c9319b38182ea15dc94536f13f9137",
    status: true,
    blockNumber: 6470854,
    from: "0x81b7E08F65Bdf5648606c89998A9CC8164397647",
    gas: 21000,
    gasPrice: "1000000000",
    transactionHash:
      "0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7",
    input: "0x",
    nonce: 26836405,
    to: "0xbC546fa1716Ed886967cf73f40e8F2F5e623a92d",
    transactionIndex: 3,
    value: "1000000000000000000",
    gasUsed: 21000,
    cumulativeGasUsed: 314159,
    contractAddress: "0x81b7E08F65Bdf5648606c89998A9CC8164397647",
    logs: [
      {
        address: "0x81b7E08F65Bdf5648606c89998A9CC8164397647",
        topics: [
          "0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234",
          "0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234",
        ],
        data: "in quis voluptate aute",
        logIndex: 39477970.716037124,
        transactionIndex: -21736418.066416174,
        transactionHash:
          "0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7",
      },
      {
        address: "0x81b7E08F65Bdf5648606c89998A9CC8164397647",
        topics: [
          "0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234",
          "0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234",
        ],
        data: "aliquip Ut Duis quis",
        logIndex: -78931723.67153051,
        transactionIndex: -40051063.11719646,
        transactionHash:
          "0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7",
      },
    ],
  },
  {
    blockHash:
      "0xcf2c40f475e78c7c19778e1ae999a0e371c9319b38182ea15dc94536f13f9137",
    status: true,
    blockNumber: 6470854,
    from: "0x81b7E08F65Bdf5648606c89998A9CC8164397647",
    gas: 21000,
    gasPrice: "1000000000",
    transactionHash:
      "0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7",
    input: "0x",
    nonce: 26836405,
    to: "0xbC546fa1716Ed886967cf73f40e8F2F5e623a92d",
    transactionIndex: 3,
    value: "1000000000000000000",
    gasUsed: 21000,
    cumulativeGasUsed: 314159,
    contractAddress: "0x81b7E08F65Bdf5648606c89998A9CC8164397647",
    logs: [
      {
        address: "0x81b7E08F65Bdf5648606c89998A9CC8164397647",
        topics: [
          "0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234",
          "0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234",
        ],
        data: "ut deserunt Ut consequat",
        logIndex: -3011928.934626654,
        transactionIndex: 32501671.24803798,
        transactionHash:
          "0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7",
      },
      {
        address: "0x81b7E08F65Bdf5648606c89998A9CC8164397647",
        topics: [
          "0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234",
          "0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234",
        ],
        data: "ut aute",
        logIndex: 44861256.02370876,
        transactionIndex: 56349248.22471428,
        transactionHash:
          "0xe6e7340394958674cdf8606936d292f565e4ecc476aaa8b258ec8a141f7c75d7",
      },
    ],
  },
];
