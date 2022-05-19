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

const ResponseSchema = Type.Object(
  {
    userId: Type.String(),
    searches: Type.Array(
      Type.Object({
        doctorId: Type.String(),
        doctorName: Type.String(),
        medicalSpeciality: Type.String(),
        date: Type.String(),
      })
    ),
  },
  {
    example: {
      userId: "623a34d8ef9e97ce33a3",
      searches: [
        {
          doctorId: "623a34d8ef9e97ce33a3",
          doctorName: "Dr. Orlando Carazo",
          medicalSpeciality: "Medicina general",
          date: "2022-03-31T04:20:31Z",
        },
        {
          doctorId: "623a34d8ef9e97ce33a3",
          doctorName: "Dra. Andrea Duarte",
          medicalSpeciality: "Oncología",
          date: "2022-02-31T04:20:31Z",
        },
        {
          doctorId: "623a34d8ef9e97ce33a3",
          doctorName: "Dr. Gabriel Gonzáles",
          medicalSpeciality: "Clinica",
          date: "2022-01-31T04:20:31Z",
        },
      ],
    },
  }
);

type RequestParamsType = Static<typeof RequestParamsSchema>;

export default (_server: FastifyInstance): StrictResource => ({
  get: {
    schema: {
      tags: [SWAGGER_TAGS.GUIDE],
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
          description: "No searches found",
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
        const result = await ospiProService.getSearchHistory({
          userId,
        });
        reply.status(200).send(result);
      } catch (error) {
        if (Boom.isBoom(error)) {
          if (error.output.statusCode === 404) {
            reply.redirect(
              303,
              `/api/sync/start-sync?params=${encodeB64JSON({
                collection: "EHG_SEARCH_HISTORY",
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
