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
const AllergiesSchema = Type.Object({
  id: Type.String(),
  isActive: Type.Boolean(),
  time: Type.String(),
  startDate: Type.String(),
  endDate: Type.Optional(Type.String()),
  description: Type.String(),
  comments: Type.String(),
  reportedBy: Type.String(),
  performer: Type.String(),
  specialization: Type.String(),
});
const ResponseSchema = Type.Object(
  {
    allergies: Type.Array(AllergiesSchema),
  },
  {
    example: {
      userId: "ee957013-b02f-45b2-b837-092b490242ea",
      allergies: [
        {
          id: "7ebd929e-6551-41c7-a421-b8d472fc514f",
          time: "2022-02-11T04:27:21.337Z",
          startDate: "2020-10-08T04:27:21.337Z",
          endDate: null,
          isActive: true,
          description: "Penicilina",
          comments:
            "Reacción alérgica al paciente se visualiza en forma ronchas y enrojecimiento en la piel",
          reportedBy: "MEDICO DEMO",
          performer: "Dr. Lorem Ipsum",
          specialization: "Allergologist",
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
          description: "No allergies records found for the specified user",
        },
        422: {
          type: "object",
          properties: {
            statusCode: { type: "number" },
            error: { type: "string" },
            message: { type: "string" },
          },
          description: "No allergies found",
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
      try {
        const { userId } = request.params as RequestParamsType;
        const allergies = await ospiProService.getPatientAllergies({ userId });
        reply.status(200).send(allergies);
      } catch (error) {
        handleExceptionReply(reply, error, "EHR_ALLERGIES");
      }
    },
  },
});
