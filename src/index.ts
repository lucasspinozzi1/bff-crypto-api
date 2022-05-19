import buildServer from "./server/buildServer";
import environment from "./config/env";

const fastifyOptions = environment.FASTIFY_OPTIONS;

const server = buildServer(fastifyOptions);

(async () => {
  try {
    await server.listen(environment.SERVER_CONFIG.port, "0.0.0.0");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();

export default server;
