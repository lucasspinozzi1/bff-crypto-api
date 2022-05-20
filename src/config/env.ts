import { normalize, join } from "path";
import * as os from "os";
import isDocker from "is-docker";
import { FastifyPluginOptions } from "fastify";
import { CONNECT_CONFIG } from "./connectConfig";
import { APPWRITE_CONFIG } from "./appwriteConfig";

const SERVER_CONFIG = {
  hostname: os.hostname(),
  address: isDocker() ? "0.0.0.0" : process.env.HTTP_ADDRESS ?? "127.0.0.1",
  protocol: "http",
  port: process.env.HTTP_PORT ?? 80,
};

const SERVER_URL =
  process.env.SERVER_URL ??
  `${SERVER_CONFIG.protocol}://${SERVER_CONFIG.address}:${SERVER_CONFIG.port}`;

const rootDir = normalize(join(__dirname, "../"));
const DIRECTORY_PATHS = {
  rootDir: normalize(join(__dirname, "../")),
  routesDir: normalize(join(rootDir, "routes")),
  pluginsDir: normalize(join(rootDir, "server", "plugins")),
};

const FASTIFY_OPTIONS: FastifyPluginOptions = process.env.FASTIFY_OPTIONS
  ? JSON.parse(process.env.FASTIFY_OPTIONS)
  : {
      logger: true,
      ignoreTrailingSlash: true,
    };

const PACKAGE = {
  packageName: "SLD-BFF",
  packageDescription: "SLD Backend for Frontend",
  packageVersion: process.env.npm_package_version ?? "0.0.0",
};

const environment = {
  PACKAGE,
  DIRECTORY_PATHS,
  FASTIFY_OPTIONS,
  SERVER_CONFIG,
  SERVER_URL,
  CONNECT_CONFIG,
  APPWRITE_CONFIG,
  service: process.env.SERVICE ?? "",
  sacAPIKey: process.env.SAC_API_KEY ?? "2021b698617a0651d32d036b68884541s9",
  openSSLKey: process.env.OPEN_SSL_KEY ?? "0mn14pIkEyD3v",
  maxRangeMeters: 5000,
};

export default environment;
export { environment as env };
