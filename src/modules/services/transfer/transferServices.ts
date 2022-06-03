import environment from "../../../config/env";
import { ITransferInToExCreate, ITransferInToExDetails } from "./transferTypes";
import InToExCreate from "./internal-to-external/create";

export const CREATEINTOEX_SERVICES: {
  [id: string]: ITransferInToExCreate;
} = {
  A: new InToExCreate(),
};

export const INTOEX_DETAILS: { [id: string]: ITransferInToExDetails } = {
  A: new InToExtDetails(),
};

export const inToExCreateService = INTOEX_CREATE[environment.service];
export const inToExtDetails = INTOEX_DETAILS[environment.service];
export const inToInCreateService = INTOIN_CREATE[environment.service];
export const inToInDetails = INTOIN_DETAILS[environment.service];
