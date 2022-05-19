import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyPluginOptions,
} from "fastify";
import fp from "fastify-plugin";
import FastifySensible from "fastify-sensible";

const sensible: FastifyPluginCallback<FastifyPluginOptions> = fp(
  (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
    next: (err?: Error) => void
  ) => {
    fastify.register(FastifySensible);
    next();
  }
);

export default sensible;
