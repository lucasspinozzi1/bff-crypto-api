import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Static, Type } from "@sinclair/typebox";
import Boom from "@hapi/boom";
import { TypeParse, Types as T } from "typeparse";
import { SWAGGER_TAGS } from "../../server/tags";
import { ospiProService } from "../../modules/services/services";
import userAuth, { decodeJWT } from "../../modules/services/auth/appwriteAuth";
import ApiConnect from "../../modules/services/apiConnect/apiConnect";
import { decodeB64JSON } from "../../utils/enconding";

const parametersParser = new TypeParse(T.Object({ collection: T.String() }));

const RequestParamsSchema = Type.Object({
  params: Type.String(),
});

const ResponseSchema = Type.Object(
  {
    token: Type.String(),
  },
  {
    example: {
      token: "626c078cdef1fc052ae3",
    },
  }
);

type RequestParamsType = Static<typeof RequestParamsSchema>;

export default (_server: FastifyInstance): StrictResource => ({
  get: {
    schema: {
      querystring: RequestParamsSchema,
      tags: [SWAGGER_TAGS.GUIDE],
      response: {
        201: {
          description: "Token created successfully",
          ...ResponseSchema,
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
    preValidation: userAuth(),
    handler: async (request, reply) => {
      const { params } = request.query as RequestParamsType;
      try {
        const { collection } = parametersParser.parse(decodeB64JSON(params));
        const userId: string = decodeJWT(
          request.headers.authorization as string
        )?.userId;
        const syncRequest = {
          collection,
          source: "SAC",
          destination: "OSPI_PATIENT_AW",
          parameters: {
            userId,
          },
        };
        const result = await ospiProService.createSyncToken(syncRequest);
        reply.status(201).send(result);
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
