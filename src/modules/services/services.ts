import environment from "../../config/env";
import SACMock from "./clientService/mock/SACMock";
import Client from "./clientService/client/Client";
import { IOspiProService } from "./types";

export const CLIENT_SERVICES: { [id: string]: IOspiProService } = {
  "OSPI-PRO-EHR-1": new Client(),
  "OSPI-PRO-MOCK-1": new SACMock(),
};

export const ospiProService = CLIENT_SERVICES[environment.opsiProService];
