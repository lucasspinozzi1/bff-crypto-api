import environment from "../../../config/env";
import { ICreateClient } from "./clientTypes";

import Client from "./create/create";

export const CLIENT_SERVICES: { [id: string]: ICreateClient } = {
  A: new Client()
};

export const service = CLIENT_SERVICES[environment.service];

