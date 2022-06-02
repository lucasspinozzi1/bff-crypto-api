import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Static, Type } from "@sinclair/typebox";
import Boom from "@hapi/boom";
import { SWAGGER_TAGS } from "../../server/tags";
import { accountService } from "../../modules/services/account/accountService";

const RequestParamsSchema = Type.Object({
  accountId: Type.Number(),
  client_id: Type.String(),
  max_widthdrawal_amount: Type.Number(),
  description: Type.String(),
  name: Type.String(),
  providerAccountId: Type.String(),
  currency: Type.String(),
  providerMetadata: Type.String(),
  status: Type.String(),
  statusUpdateDateTime: Type.Number(),
  type: Type.String(),
  network: Type.String()
});

const ResponseSchema = Type.Object({});

type RequestParamsType = Static<typeof RequestParamsSchema>;

export default (_server: FastifyInstance): StrictResource => ({
  post: {
    schema: {
      body: RequestParamsSchema,
      tags: [SWAGGER_TAGS.ACCOUNT],
      response: {
        200: {
          ...ResponseSchema,
          description: "Successful account",
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
        const response = await accountService.createAccount(config);
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
