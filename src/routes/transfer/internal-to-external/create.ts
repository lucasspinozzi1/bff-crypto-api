import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Static, Type } from "@sinclair/typebox";
import Boom from "@hapi/boom";
import { SWAGGER_TAGS } from "../../server/tags";
import { transferService } from "../../modules/services/transfer/transferService;

const RequestParamsSchema = Type.Object({
  firstName: Type.String(),
  lastName: Type.String(),
});

const ResponseSchema = Type.Object({});

type RequestParamsType = Static<typeof RequestParamsSchema>;

export default (_server: FastifyInstance): StrictResource => ({
  post: {
    schema: {
      body: RequestParamsSchema,
      tags: [SWAGGER_TAGS.transfer],
      response: {
        200: {
          ...ResponseSchema,
          description: "Successful registration",
        },
        409: {
          type: "object",
          properties: {
            statusCode: { type: "number" },
            error: { type: "string" },
            message: { type: "string" },
          },
          description: "Account already exist",
        },
        500: {
          type: "object",
          properties: {
            statusCode: { type: "number" },
            error: { type: "string" },
            message: { type: "string" },
          },
          description: "Internal Server Error",
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const config = request.body as RequestParamsType;
        const response = await transferService.createTransfer(config);
        reply.status(200).send(response);
      } catch (error) {
        if (Boom.isBoom(error)) {
          reply.status(error.output.statusCode).send(error.output.payload);
        } else {
          reply.status(500).send({
            statusCode: 500,
            error: error.name,
            message: error.message,
          });
        }
      }
    },
  },
});
