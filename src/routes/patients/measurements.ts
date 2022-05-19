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
    records: Type.Array(
      Type.Object({
        name: Type.String(),
        type: Type.String(),
        unit: Type.String(),
        measurements: Type.Array(
          Type.Object({
            id: Type.String(),
            time: Type.String(),
            performer: Type.String(),
            value: Type.Optional(Type.Number()),
            systolic: Type.Optional(Type.Number()),
            diastolic: Type.Optional(Type.Number()),
          })
        ),
      })
    ),
  },
  {
    example: {
      userId: "ee957013-b02f-45b2-b837-092b490242ea",
      records: [
        {
          name: "Presión",
          type: "arterialPressure",
          unit: "mmHg",
          measurements: [
            {
              id: "813596e3-d7c6-4e75-84c2-914e6bf2cb64",
              systolic: 100,
              diastolic: 60,
              time: "2022-02-17T21:01:03Z",
              performer: "Dr. Juarez",
            },
            {
              id: "37ea1f4c-1b2f-4d07-b057-f34ad44a329f",
              systolic: 120,
              diastolic: 90,
              time: "2022-02-17T21:01:03Z",
              performer: "Dr. Juarez",
            },
          ],
        },
      ],
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
          description: "Measurement records not found",
        },
        422: {
          type: "object",
          properties: {
            statusCode: { type: "number" },
            error: { type: "string" },
            message: { type: "string" },
          },
          description: "No records found",
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
      const { userId } = request.params as RequestParamsType;
      try {
        const result = await ospiProService.getPatientMeasurement({
          userId,
        });
        reply.status(200).send(result);
      } catch (error) {
        handleExceptionReply(reply, error, "EHR_MEASUREMENTS");
      }
    },
  },
});
