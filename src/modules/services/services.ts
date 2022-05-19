import environment from "../../config/env";
import SACMock from "./ospiPro/mock/SACMock";
import EHRClient from "./ospiPro/ehr/EHRClient";
import { IOspiProService } from "./types";

export const OSPI_PRO_SERVICES: { [id: string]: IOspiProService } = {
  "OSPI-PRO-EHR-1": new EHRClient(),
  "OSPI-PRO-MOCK-1": new SACMock(),
};

export const ospiProService = OSPI_PRO_SERVICES[environment.opsiProService];
