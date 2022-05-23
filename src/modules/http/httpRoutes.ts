export default class RoutesConfig {
  static get endpoint() {
    return `https://api-us-west1.tatum.io`; // MOVE TO ENVIRONMENT VAR
  }
  static get tronWallet() {
    return `/v3/tron/wallet`;
  }
  static get ethereumWallet() {
    return `/v3/ethereum/wallet`;
  }
  static get ledger() {
    return `/v3/ledger`;
  }
  static get ledgerAccount() {
    return `${RoutesConfig.ledger}/account`;
  }
  static get ledgerAccountCustomer() {
    return `${RoutesConfig.ledgerAccount}/customer`;
  }
  static get ethereum() {
    return `/v3/ethereum`;
  }
  static get tron() {
    return `/v3/tron`;
  }
  static get ethereumTransactions() {
    return `${RoutesConfig.ethereum}/account/transaction`;
  }
  static get ethDepositAddress() {
    return `${RoutesConfig.ethereum}/address`;
  }
  static get ethBalanceAddress() {
    return `${RoutesConfig.ethDepositAddress}/balance`;
  }
  static get tronDepositAddress() {
    return `${RoutesConfig.tron}/address`;
  }
  static get tronBalanceAddress() {
    return `${RoutesConfig.tronDepositAddress}/balance`;
  }
  static get ledgerTransaction() {
    return `${RoutesConfig.ledger}/transaction`;
  }
}
