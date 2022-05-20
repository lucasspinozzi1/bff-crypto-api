import environment from "../../config/env";
import SACMock from "./clientService/mock/SACMock";
import Client from "./clientService/client/Client";
import { IService } from "./types";

export const CLIENT_SERVICES: { [id: string]: IService } = {
  A: new Client(),
  B: new SACMock(),
};

export const service = CLIENT_SERVICES[environment.service];
