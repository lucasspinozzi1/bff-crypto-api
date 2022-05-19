import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Static, Type } from "@sinclair/typebox";
import Boom from "@hapi/boom";
import { SWAGGER_TAGS } from "../../server/tags";
import { ospiProService } from "../../modules/services/services";
import userAuth from "../../modules/services/auth/appwriteAuth";
import { encodeB64JSON } from "../../utils/enconding";

const RequestParamsSchema = Type.Object({
  userId: Type.String(),
});

const ResultSchema = Type.Union([
  Type.String(),
  Type.Array(
    Type.Object({
      name: Type.String(),
      value: Type.String(),
      unit: Type.String(),
      referenceRange: Type.String(),
    })
  ),
]);

const ExamSchema = Type.Object({
  userId: Type.String(),
  id: Type.String(),
  type: Type.String(),
  name: Type.String(),
  date: Type.String(),
  performer: Type.String(),
  result: Type.Optional(ResultSchema),
  procedureZone: Type.Optional(Type.String()),
  diagnostic: Type.Optional(Type.String()),
  interpretation: Type.Optional(Type.String()),
});

const ResponseSchema = Type.Array(ExamSchema, {
  example: {
    userId: "ee957013-b02f-45b2-b837-092b490242ea",
    id: "7df0a037-1c07-44a5-9475-6d2f8a975b24",
    type: "laboratory",
    name: "Perfil Lipidico",
    date: "2022-01-25T00:00:00.000Z",
    performer: "Dra. Clotilde Miraflores",
    result: [
      {
        name: "apariencia del suero",
        value: "23",
        unit: "n/a",
        referenceRange: "17-40",
      },
      {
        name: "colesterol total",
        value: "231",
        unit: "mg/dl",
        referenceRange: "200-400",
      },
      {
        name: "colesterol hdl",
        value: "213",
        unit: "mg/dl",
        referenceRange: "200-400",
      },
    ],
    procedureZone: "Torax",
    diagnostic: "El paciente presenta un volumen pulmonar bajo",
    interpretation: "Se observan anomalias en el volumen del pulmon derecho",
  },
});

type RequestParamsType = Static<typeof RequestParamsSchema>;

export default (_server: FastifyInstance): StrictResource => ({
  get: {
    schema: {
      tags: [SWAGGER_TAGS.PATIENT],
      response: {
        200: {
          ...ResponseSchema,
          description: "Patient exams",
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
          description: "Medical consultation not found",
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
        const result = await ospiProService.getPatientExams({
          userId,
        });
        reply.status(200).send(result);
      } catch (error) {
        if (Boom.isBoom(error)) {
          if (error.output.statusCode === 404) {
            reply.redirect(
              303,
              `/api/sync/start-sync?params=${encodeB64JSON({
                collection: "EHR_EXAMS",
              })}`
            );
          } else {
            reply.status(error.output.statusCode).send(error.output.payload);
          }
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
