import {
  FastifyInstance,
  FastifyPluginCallback,
  FastifyPluginOptions,
} from "fastify";
import fp from "fastify-plugin";
import FastifyOas from "fastify-oas";
import environment from "../../config/env";
import { SWAGGER_TAG_DEFINITIONS } from "../tags";

const oas: FastifyPluginCallback<FastifyPluginOptions> = fp(
  (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions,
    next: (err?: Error) => void
  ) => {
    fastify.register(FastifyOas, {
      routePrefix: "/api/docs",
      swagger: {
        info: {
          title: environment.PACKAGE.packageName,
          description: environment.PACKAGE.packageDescription,
          version: environment.PACKAGE.packageVersion,
        },
        externalDocs: {
          url: "https://swagger.io",
          description: "Find more info here",
        },
        host: environment.SERVER_URL.replace(/^https?:\/\//, ""),
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        tags: SWAGGER_TAG_DEFINITIONS,
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
      exposeRoute: true,
    });

    next();
  }
);

export default oas;
