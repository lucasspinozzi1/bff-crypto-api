export interface IAccountCreate {
    createAccount(config:any): Promise<any>;
  }
  
export interface IAccountDetails{
  getDetails(config:any): Promise<any>;
}
