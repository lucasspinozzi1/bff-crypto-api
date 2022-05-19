import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Static, Type } from "@sinclair/typebox";
import Boom from "@hapi/boom";
import { SWAGGER_TAGS } from "../../../server/tags";
import { ospiProService } from "../../../modules/services/services";
import userAuth from "../../../modules/services/auth/appwriteAuth";
import { encodeB64JSON } from "../../../utils/enconding";

const RequestParamsSchema = Type.Object({
  medicalConsultationYear: Type.Number(),
});

const ParamsSchema = Type.Object({
  userId: Type.String(),
  medicalConsultationYear: Type.Number(),
});

const ResponseSchema = Type.Object(
  {
    userId: Type.String(),
    consultations: Type.Array(
      Type.Object({
        medicalConsultationId: Type.String(),
        month: Type.String(),
        name: Type.String(),
        doctor: Type.String(),
        reason: Type.String(),
        healthSite: Type.String(),
        date: Type.String(),
      })
    ),
  },
  {
    example: {
      userId: "623a34d8ef9e97ce33a3",
      consultations: [
        {
          month: "Marzo",
          name: "Cita Cardiólogo",
          doctor: "Dr. Armando Casas",
          reason: "Revisión corazón",
          healthSite: "Hospital Rafael Ángel Calderón Guardia",
          date: "2022-03-24T00:55:19.596Z",
        },
      ],
    },
  }
);

type RequestParamsType = Static<typeof ParamsSchema>;

export default (_server: FastifyInstance): StrictResource => ({
  get: {
    schema: {
      params: RequestParamsSchema,
      tags: [SWAGGER_TAGS.PATIENT],
      response: {
        200: {
          description: "Patient general information",
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
            statusCode: { type: "number" },
            error: { type: "string" },
            message: { type: "string" },
          },
          description: "Medical consultation not found",
        },
        422: {
          type: "object",
          properties: {
            statusCode: { type: "number" },
            error: { type: "string" },
            message: { type: "string" },
          },
          description: "No date found",
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
      const { userId, medicalConsultationYear } =
        request.params as RequestParamsType;
      try {
        const result = await ospiProService.getMedicalConsultation({
          userId,
          medicalConsultationYear,
        });
        reply.status(200).send(result);
      } catch (error) {
        if (Boom.isBoom(error)) {
          if (error.output.statusCode === 404) {
            reply.redirect(
              303,
              `/api/sync/start-sync?params=${encodeB64JSON({
                collection: "EHG_MEDICAL_CONSULTATION",
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
