import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Static, Type } from "@sinclair/typebox";
import { SWAGGER_TAGS } from "../../server/tags";
import { ospiProService } from "../../modules/services/services";
import userAuth from "../../modules/services/auth/appwriteAuth";
import { handleExceptionReply } from "../../modules/redirects/CollectionException";

const RequestParamsSchema = Type.Object({
  userId: Type.String(),
});

const ResponseSchema = Type.Object(
  {
    firstName: Type.String(),
    firstLastName: Type.String(),
    secondLastName: Type.Optional(Type.String()),
    birthDate: Type.String(),
    height: Type.Number(),
    weight: Type.Number(),
    biologicSex: Type.String(),
    pronoun: Type.String(),
    civilStatus: Type.String(),
    ocupation: Type.String(),
    address: Type.String(),
  },
  {
    example: {
      userId: "ee957013-b02f-45b2-b837-092b490242ea",
      firstName: "Tatiana",
      firstLastName: "Vega",
      secondLastName: "Madrigal",
      birthDate: "19984-05-16T00:00:00Z",
      height: 170,
      weight: 80,
      biologicSex: "Femenino",
      pronoun: "Ella",
      civilStatus: "Soltera",
      ocupation: "Agente de Ventas",
      address: "Montes de Oca",
    },
  }
);

type RequestParamsType = Static<typeof RequestParamsSchema>;

export default (_server: FastifyInstance): StrictResource => ({
  get: {
    schema: {
      tags: [SWAGGER_TAGS.PATIENT],
      response: {
        200: {
          ...ResponseSchema,
          description: "Patient general information",
        },
        401: {
          type: "object",
          properties: {
            statusCode: { type: "number" },
            error: { type: "string" },
            message: { type: "string" },
          },
          description: "Invalid credentials",
        },
        404: {
          type: "object",
          properties: {
            message: { type: "string" },
            error: { type: "string" },
            statusCode: { type: "number" },
          },
          description: "Patient not found",
        },
        500: {
          type: "object",
          properties: {
            message: { type: "string" },
            error: { type: "string" },
            statusCode: { type: "number" },
          },
          description: "Internal Server Error",
        },
      },
    },
    preValidation: userAuth(),
    handler: async (request, reply) => {
      const { userId } = request.params as RequestParamsType;
      try {
        const result = await ospiProService.getPatientInfo({
          userId,
        });
        reply.status(200).send(result);
      } catch (error) {
        handleExceptionReply(reply, error, "PATIENT");
      }
    },
  },
});
