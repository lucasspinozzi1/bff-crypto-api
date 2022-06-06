import environment from "../../../config/env";
import { ITransferInToExCreate, ITransferInToExDetails } from "./transferTypes";
import TransferInToExCreate from "./internal-to-external/create";

export const CREATEINTOEX_SERVICES: {
  [id: string]: ITransferInToExCreate;
} = {
  A: new TransferInToExCreate(),
};

export const INTOEX_DETAILS: { [id: string]: ITransferInToExDetails } = {
  A: new transferInToExtDetails(),
};

export const transferInToExCreateService = TRANSFERINTOEX_CREATE[environment.service];
export const transferInToExtDetails = TRANSFERINTOEX_DETAILS[environment.service];
export const transferInToInCreateService = TRANSFERINTOIN_CREATE[environment.service];
export const transferInToInDetails = TRANSFERINTOIN_DETAILS[environment.service];
