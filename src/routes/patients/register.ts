import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Static, Type } from "@sinclair/typebox";
import Boom from "@hapi/boom";
import { ospiProService } from "../../modules/services/services";
import OspiConnect from "../../modules/services/ospiConnect/ospiConnect";
import { SWAGGER_TAGS } from "../../server/tags";

const RequestParamsSchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
  fullName: Type.String(),
  documentType: Type.String(),
  documentNumber: Type.String(),
  birthDate: Type.String(),
  biologicalSex: Type.String(),
  pronoun: Type.String(),
  phoneNumbers: Type.Array(Type.String()),
  province: Type.String(),
  canton: Type.String(),
  district: Type.String(),
  country: Type.String(),
});

const ResponseSchema = Type.Object({
  userId: Type.String(),
});

type RequestParamsType = Static<typeof RequestParamsSchema>;

export default (_server: FastifyInstance): StrictResource => ({
  post: {
    schema: {
      body: RequestParamsSchema,
      tags: [SWAGGER_TAGS.PATIENT],
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
        const response = await ospiProService.registerPatient(config);
        reply.status(200).send(response);

        const syncRequest = {
          source: "OSPI_PATIENT_AW",
          destination: "SAC",
          collection: "PATIENT",
          parameters: {
            userId: response.userId,
          },
        };

        const result = await ospiProService.createSyncToken(syncRequest);
        OspiConnect.sync({
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
