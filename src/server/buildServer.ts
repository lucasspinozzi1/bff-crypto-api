import Fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";
import FastifyAutoload from "fastify-autoload";
import FastifyAutoRoutes from "fastify-autoroutes";
import environment from "../config/env";

export default function buildServer(
  options: FastifyPluginOptions
): FastifyInstance {
  const server = Fastify(options);

  server.register(FastifyAutoload, {
    dir: environment.DIRECTORY_PATHS.pluginsDir,
    options,
  });

  server.register(FastifyAutoRoutes, {
    dir: environment.DIRECTORY_PATHS.routesDir,
    prefix: "/api",
  });

  // Redirect base route to docs
  server.route({
    method: "GET",
    url: "/",
    handler: (_, reply) => {
      reply.redirect(302, "/api/docs");
    },
  });

  return server;
}
