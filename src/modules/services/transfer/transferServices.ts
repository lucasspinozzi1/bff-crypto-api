import environment from "../../../config/env";
import { ITransferInToExCreate } from "./transferTypes";
import InToExCreate from "./internal-to-external/create";
import { ITransferReloadFromTransferCreate } from "./reload-from-account";

export const TRANSFERCREATEINTOEX_SERVICES: {
  [id: string]: ITransferInToExCreate;
} = {
  A: new InToExCreate()
};

export const inToExCreateService = TRANSFERCREATEINTOEX_SERVICES[environment.service];

