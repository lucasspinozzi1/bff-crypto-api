import environment from "../../../config/env";
import { ICreateTransfer } from "./transferTypes";

import Transfer from "./create/create";

export const TRANSFER_SERVICES: { [id: string]: ICreateTransfer } = {
  A: new Transfer()
};

export const service = TRANSFER_SERVICES[environment.service];

