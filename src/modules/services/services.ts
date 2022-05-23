import environment from "../../config/env";
import Client from "./client/create/create";
import { IService } from "./types";

export const CLIENT_SERVICES: { [id: string]: IService } = {
  A: new Client()
};

export const service = CLIENT_SERVICES[environment.service];
