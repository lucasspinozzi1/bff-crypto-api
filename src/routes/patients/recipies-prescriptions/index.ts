import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Static, Type } from "@sinclair/typebox";
import Boom from "@hapi/boom";
import { SWAGGER_TAGS } from "../../../server/tags";
import { ospiProService } from "../../../modules/services/services";
import userAuth from "../../../modules/services/auth/appwriteAuth";
import { encodeB64JSON } from "../../../utils/enconding";

const RequestParamsSchema = Type.Object({
  userId: Type.String(),
});

const ResponseSchema = Type.Array(
  Type.Object(
    {
      userId: Type.String(),
      id: Type.String(),
      type: Type.String(),
      details: Type.Object({
        description: Type.Optional(Type.String()),
        indications: Type.Optional(Type.String()),
        drug: Type.Optional(Type.String()),
        power: Type.Optional(Type.Number()),
        take: Type.Optional(Type.Number()),
        frequency: Type.Optional(Type.String()),
        quantity: Type.Optional(Type.Number()),
        via: Type.Optional(Type.String()),
        days: Type.Optional(Type.Number()),
        status: Type.Optional(Type.String()),
        statusDate: Type.Optional(Type.String()),
      }),
      reportDate: Type.String(),
      reporter: Type.Object({
        name: Type.String(),
        speciality: Type.String(),
      }),
    },
    {
      example: {
        userId: "c654cebf-3dd6-4c2c-bbee-29305e962a71",
        id: "c801d924-802c-4f6d-a24c-53f3a9605dcc",
        type: "'recipe' | 'prescription'",
        details: {
          description: "Ivermicina 0.6% solución oral",
          indications: "Tomar 1 pastilla cada 24 por 6 días.",
          drug: "Acidfol - Ácido Fólico",
          power: 1,
          take: 3,
          frequency: "Cada 8 horas",
          quantity: 50,
          via: "Oral",
          days: 5,
          status: "prescripted",
          statusDate: "2022-01-11T20:03:07+0000",
        },
        reportDate: "2022-02-25T20:03:07+0000",
        reporter: {
          name: "Dra. Clotilde Miraflores",
          speciality: "Medicina General",
        },
      },
    }
  )
);

type RequestParamsType = Static<typeof RequestParamsSchema>;

export default (_server: FastifyInstance): StrictResource => ({
  get: {
    schema: {
      tags: [SWAGGER_TAGS.PATIENT],
      response: {
        200: {
          description: "Recipe and prescriptions information",
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
          description: "Recipes and prescriptions not found",
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
        const result = await ospiProService.getPatientRecipiesAndPrescriptions({
          userId,
        });
        reply.status(200).send(result);
      } catch (error) {
        if (Boom.isBoom(error)) {
          if (error.output.statusCode === 404) {
            reply.redirect(
              303,
              `/api/sync/start-sync?params=${encodeB64JSON({
                collection: "EHR_RECIPES",
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
