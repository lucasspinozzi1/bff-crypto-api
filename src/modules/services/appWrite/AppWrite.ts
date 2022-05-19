import { Account, Client, Database, Models, Users } from "node-appwrite";
import environment from "../../../config/env";

export interface AppwriteDocument extends Models.Document {
  [attributeName: string]:
    | string
    | string[]
    | number
    | number[]
    | boolean
    | boolean[]
    | undefined;
}

export default class AppWrite {
  private static instance = new AppWrite();

  private client: Client;

  private database: Database;

  private users: Users;

  private account: Account;

  private constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(environment.APPWRITE_CONFIG.endpoint)
      .setProject(environment.APPWRITE_CONFIG.project)
      .setKey(environment.APPWRITE_CONFIG.key);
    this.database = new Database(this.client);
    this.users = new Users(this.client);
    this.account = new Account(this.client);
  }

  public static getUserClient(): Users {
    return AppWrite.instance.users;
  }

  public static getAccount(): Account {
    return AppWrite.instance.account;
  }

  public static getDatabase(): Database {
    return AppWrite.instance.database;
  }
}
