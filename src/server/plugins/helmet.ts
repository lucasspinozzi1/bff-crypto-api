import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyPluginOptions,
} from "fastify";
import fp from "fastify-plugin";
import FastifyHelmet from "fastify-helmet";

const helmet: FastifyPluginCallback<FastifyPluginOptions> = fp(
  (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
    next: (err?: Error) => void
  ) => {
    fastify.register(FastifyHelmet);
    next();
  }
);

export default helmet;
