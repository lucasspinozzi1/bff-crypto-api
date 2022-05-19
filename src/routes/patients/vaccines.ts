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

const VaccinesSchema = {
  registeredBy: Type.String(),
  schema: Type.String(),
  vaccines: Type.Array(
    Type.Object({
      name: Type.String(),
      vaccineId: Type.String(),
      regular: Type.Array(
        Type.Object({
          dose: Type.String(),
          date: Type.String(),
          applied: Type.Boolean(),
        })
      ),
      reinforcement: Type.Array(
        Type.Object({
          dose: Type.String(),
          date: Type.String(),
          applied: Type.Boolean(),
        })
      ),
      extra: Type.Array(
        Type.Object({
          dose: Type.String(),
          date: Type.String(),
          applied: Type.Boolean(),
        })
      ),
    })
  ),
};

const ResponseSchema = Type.Object(VaccinesSchema, {
  example: {
    userId: "ee957013-b02f-45b2-b837-092b490242ea",
    registeredBy: "Dr. John Doe",
    schema: "Esquema Nacional",
    vaccines: [
      {
        name: "Covid-19",
        vaccineId: "494126ca-a613-11ec-b909-0242ac120002",
        regular: [
          {
            dose: "I",
            date: "2021-09-16T00:55:19.596Z",
            applied: true,
          },
        ],
        reinforcement: [
          {
            dose: "I",
            date: "2021-10-10T00:55:19.596Z",
            applied: true,
          },
        ],
        extra: [
          {
            dose: "I",
            date: "2021-12-15T00:55:19.596Z",
            applied: false,
          },
        ],
      },
      {
        name: "Varicela",
        vaccineId: "4941294a-a613-11ec-b909-0242ac120002",
        regular: [
          {
            dose: "I",
            date: "2021-09-16T00:55:19.596Z",
            applied: true,
          },
        ],
        reinforcement: [
          {
            dose: "I",
            date: "2021-10-10T00:55:19.596Z",
            applied: true,
          },
        ],
        extra: [
          {
            dose: "I",
            date: "2021-12-15T00:55:19.596Z",
            applied: true,
          },
        ],
      },
      {
        name: "Hepatitis B",
        vaccineId: "49412a9e-a613-11ec-b909-0242ac120002",
        regular: [
          {
            dose: "I",
            date: "2021-09-16T00:55:19.596Z",
            applied: true,
          },
        ],
        reinforcement: [
          {
            dose: "I",
            date: "2021-10-10T00:55:19.596Z",
            applied: false,
          },
        ],
        extra: [],
      },
      {
        name: "Neumococo 23 valente",
        vaccineId: "49412bf2-a613-11ec-b909-0242ac120002",
        regular: [
          {
            dose: "I",
            date: "2021-09-16T00:55:19.596Z",
            applied: true,
          },
          {
            dose: "II",
            date: "2021-10-16T00:55:19.596Z",
            applied: true,
          },
        ],
        reinforcement: [
          {
            dose: "I",
            date: "2021-11-10T00:55:19.596Z",
            applied: true,
          },
        ],
        extra: [],
      },
    ],
  },
});

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
          description: "No vaccines records found for the specified user",
        },
        422: {
          type: "object",
          properties: {
            statusCode: { type: "number" },
            error: { type: "string" },
            message: { type: "string" },
          },
          description: "No vaccines found",
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
        const result = await ospiProService.getPatientVaccines({
          userId,
        });
        reply.status(200).send(result);
      } catch (error) {
        handleExceptionReply(reply, error, "EHR_VACCINES");
      }
    },
  },
});
