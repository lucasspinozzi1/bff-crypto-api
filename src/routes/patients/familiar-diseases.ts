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
    diseases: Type.Object({
      diabetes: Type.Array(Type.String()),
      highPressure: Type.Array(Type.String()),
      cancer: Type.Array(Type.String()),
      heartDisease: Type.Array(Type.String()),
      mentalDiseases: Type.Array(Type.String()),
      alzheimer: Type.Array(Type.String()),
      depression: Type.Array(Type.String()),
      anxiety: Type.Array(Type.String()),
      personalityProblems: Type.Array(Type.String()),
      stroke: Type.Array(Type.String()),
      epilepsy: Type.Array(Type.String()),
      tuberculosis: Type.Array(Type.String()),
    }),
    details: Type.String(),
  },
  {
    example: {
      userId: "cdd4f245-9a6b-4b1d-841d-5378b7bb8ded",
      diseases: {
        diabetes: ["uncles", "otherFamily"],
        highPressure: ["father", "uncles"],
        cancer: ["paternalGrandparents", "maternalGrandparents"],
        heartDisease: ["uncles"],
        mentalDiseases: [],
        alzheimer: ["otherFamily"],
        depression: ["siblings", "nephew/niece"],
        anxiety: ["siblings", "nephew/niece"],
        personalityProblems: [],
        stroke: [],
        epilepsy: [],
        tuberculosis: [],
      },
      details: "Sin detalles",
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
          description: "Patient familiar diseases",
          ...ResponseSchema,
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
          description: "Familiar diseases not found",
        },
        422: {
          type: "object",
          properties: {
            message: { type: "string" },
            error: { type: "string" },
            statusCode: { type: "number" },
          },
          description: "Bad request",
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
        const result = await ospiProService.getFamiliarDiseases({
          userId,
        });
        reply.status(200).send(result);
      } catch (error) {
        handleExceptionReply(reply, error, "EHR_FAMILIAR_DISEASES");
      }
    },
  },
});
