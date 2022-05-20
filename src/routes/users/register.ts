import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Static, Type } from "@sinclair/typebox";
import Boom from "@hapi/boom";
import { service } from "../../modules/services/services";
import ApiConnect from "../../modules/services/apiConnect/apiConnect";
import { SWAGGER_TAGS } from "../../server/tags";

const RequestParamsSchema = Type.Object({
  clientId: Type.String(),
  firstName: Type.String(),
  lastName: Type.String(),
  email: Type.String(),
  identification: Type.String(),
  allowReload: Type.Boolean(),
  allowSend: Type.Boolean(),
  maximum_transaction: Type.Number(),
  maximum_recharge: Type.Number(),
});

const ResponseSchema = Type.Object({
  userId: Type.String(),
});

type RequestParamsType = Static<typeof RequestParamsSchema>;

export default (_server: FastifyInstance): StrictResource => ({
  post: {
    schema: {
      body: RequestParamsSchema,
      tags: [SWAGGER_TAGS.USER],
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
          description: "User already registered",
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
        const response = await service.registerUser(config);
        reply.status(200).send(response);

        const syncRequest = {
          source: "AW",
          destination: "SAC",
          collection: "",
          parameters: {
            userId: response.userId,
          },
        };

        const result = await service.createSyncToken(syncRequest);
        ApiConnect.sync({
          ...syncRequest,
          token: result.token,
        });
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
