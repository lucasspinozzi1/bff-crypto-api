import Boom from "@hapi/boom";
import { Type, Static } from "@sinclair/typebox";
import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { inToInCreateService } from "../../../modules/services/transfer/transferServices";
import { SWAGGER_TAGS } from "../../../server/tags";

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
      tags: [SWAGGER_TAGS.TRANSFER],
      response: {
        200: {
          ...ResponseSchema,
          description: "Successful Transfer",
        },
        409: {
          type: "object",
          properties: {
            statusCode: { type: "number" },
            error: { type: "string" },
            message: { type: "string" },
          },
          description: "Transfer already exist",
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
        const response = await inToInCreateService.createInToIn(config);
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
