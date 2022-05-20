import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Type } from "@sinclair/typebox";
import { service } from "../../modules/services/services";
import { SWAGGER_TAGS } from "../../server/tags";
import { IUserInfoParams } from "../../modules/services/types";

const RequestParamsSchema = Type.Object({
  documentType: Type.Number(),
  documentNumber: Type.String(),
  institutionId: Type.String(),
});

const ResponseSchema = Type.Object({
  result: Type.Object({
    message: Type.String(),
    paciente: Type.Object({
      name: Type.String(),
      surname: Type.String(),
      lastSurname: Type.String(),
      dateOfBirth: Type.String(),
      gender: Type.String(),
    }),
  }),
});

export default (_server: FastifyInstance): StrictResource => ({
  post: {
    schema: {
      body: RequestParamsSchema,
      tags: [SWAGGER_TAGS.USER],
      response: {
        200: {
          ...ResponseSchema,
          description: "Information",
        },
        502: {
          type: "string",
          description: "Bad gateway",
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const params = request?.body as IUserInfoParams;
        const userInfo = await service.getUserInfo(params);
        reply.status(200).send({ result: userInfo });
      } catch (error) {
        reply.status(502).send(error.message);
      }
    },
  },
});
