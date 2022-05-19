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
    smoking: Type.Object({
      id: Type.String(),
      status: Type.Boolean(),
      addictionStatus: Type.String(),
      passive: Type.Boolean(),
      quantity: Type.String(),
      frequency: Type.String(),
      period: Type.String(),
      wantsToQuit: Type.Boolean(),
    }),
    alcoholism: Type.Object({
      id: Type.String(),
      status: Type.Boolean(),
      addictionStatus: Type.String(),
      quantity: Type.String(),
      frequency: Type.String(),
      period: Type.String(),
      wantsToQuit: Type.Boolean(),
    }),
    physicalActivity: Type.Object({
      id: Type.String(),
      type: Type.String(),
      duration: Type.String(),
      frequency: Type.String(),
      details: Type.String(),
    }),
    drugs: Type.Array(
      Type.Object({
        id: Type.String(),
        name: Type.String(),
        observation: Type.String(),
      })
    ),
  },
  {
    example: {
      userId: "ee957013-b02f-45b2-b837-092b490242ea",
      smoking: {
        id: "8ff2a05e-2545-462b-a2e6-6cb1867d1164",
        status: true,
        addictionStatus: "activo",
        passive: true,
        quantity: "1 cajetilla",
        frequency: "Día",
        period: "4 años",
        wantsToQuit: true,
      },
      alcoholism: {
        id: "8824fea6-e28f-4b75-ae5a-ed8a5db6aae0",
        status: true,
        addictionStatus: "Actualmente tomador ocasional",
        quantity: "Tres 4 plumas diarios",
        frequency: "Día",
        period: "2 años",
        wantsToQuit: false,
      },
      physicalActivity: {
        id: "1d641d87-0b0d-4a8b-b743-66961a234f89",
        type: "150 min/semana actividad física aeróbica moderada",
        duration: "150 min",
        frequency: "semanal",
        details: "",
      },
      drugs: [
        {
          id: "10089323-8126-4641-96e4-9ca38a88f977",
          name: "marijuana",
          observation: "Diario",
        },
        {
          id: "bfae25f8-04cc-485a-ae88-95d9cc0ea3ad",
          name: "cocaine",
          observation: "Diario",
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
          description: "Search history records not found",
        },
        422: {
          type: "object",
          properties: {
            statusCode: { type: "number" },
            error: { type: "string" },
            message: { type: "string" },
          },
          description: "No habits found",
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
        const habits = await ospiProService.getPatientHabits({
          userId,
        });
        reply.status(200).send(habits);
      } catch (error) {
        handleExceptionReply(reply, error, "EHR_HABITS");
      }
    },
  },
});
