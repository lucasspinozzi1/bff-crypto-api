import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyPluginOptions,
} from "fastify";
import fp from "fastify-plugin";
import FastifyCors from "fastify-cors";

const cors: FastifyPluginCallback<FastifyPluginOptions> = fp(
  (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
    next: (err?: Error) => void
  ) => {
    // With this CORS configuration we can receive requests from
    // any domain for the GET, PUT, POST and DELETE methods
    if (typeof jest === "undefined") {
      fastify.register(FastifyCors, {
        methods: ["GET", "PUT", "POST", "DELETE"],
        origin: "*",
      });
    }
    next();
  }
);

export default cors;
