import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Type } from "@sinclair/typebox";
import Boom from "@hapi/boom";
import { SWAGGER_TAGS } from "../../server/tags";
import { accountList } from "../../modules/services/account/accountService";


const ResponseSchema = Type.Object({
  
      clientId: Type.String(),
      accounts: Type.Array(
        Type.Object({
          accountId: Type.String(),
          clientId: Type.String(),
          status: Type.String(),
          statusUpdateDateTime: Type.String(),
          nickName: Type.String(),
          adress: Type.String(),
          currency: Type.String(),
          availableBalance: Type.String(),
          xpub: Type.String(),
        })
      )
});


export default (_server: FastifyInstance): StrictResource => ({
  get: {
    schema: {
      tags: [SWAGGER_TAGS.ACCOUNT],
      response: {
        200: {
          ...ResponseSchema,
          description: "Successful request",
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
        const response = await accountList.listAccounts();
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
