import environment from "../../../config/env";
import TransferInToExCreate from "./internal-to-external/create";
import {
  IReloadFromAccountCreate,
  IReloadFromAccountDetails,
  ITransferInToExCreate,
  ITransferInToExDetails,
  ITransferInToInCreate,
  ITransferInToInDetails,
} from "./transferTypes";
import TransferInToInCreate from "./internal-to-internal/create";
import TransferInToExDetails from "./internal-to-external/detail";
import TransferInToInDetails from "./internal-to-internal/detail";
import ReloadFromAccountCreate from "./reload-from-account/create";
import ReloadFromAccountDetails from "./reload-from-account/detail";

export const CREATETRANSFERINTOEX_SERVICES: {
  [id: string]: ITransferInToExCreate;
} = {
  A: new TransferInToExCreate(),
};

export const TRANSFERINTOEX_DETAILS: { [id: string]: ITransferInToExDetails } =
  {
    A: new TransferInToExDetails(),
  };

export const transferInToExCreateService =
  CREATETRANSFERINTOEX_SERVICES[environment.service];

export const transferInToExtDetails =
  TRANSFERINTOEX_DETAILS[environment.service];

export const CREATETRANSFERINTOIN_SERVICES: {
  [id: string]: ITransferInToInCreate;
} = {
  A: new TransferInToInCreate(),
};

export const TRANSFERINTOIN_DETAILS: { [id: string]: ITransferInToInDetails } =
  {
    A: new TransferInToInDetails(),
  };

export const transferInToInCreateService =
  CREATETRANSFERINTOIN_SERVICES[environment.service];
export const transferInToInDetails =
  TRANSFERINTOIN_DETAILS[environment.service];

export const RELOADFROMACCOUNT_SERVICES: {
  [id: string]: IReloadFromAccountCreate;
} = {
  A: new ReloadFromAccountCreate(),
};

export const IRELOADFROMACCOUNT_DETAILS: {
  [id: string]: IReloadFromAccountDetails;
} = {
  A: new ReloadFromAccountDetails(),
};

export const reloadFromAccountCreateService =
  RELOADFROMACCOUNT_SERVICES[environment.service];
export const reloadFromAccountDetails =
  IRELOADFROMACCOUNT_DETAILS[environment.service];
